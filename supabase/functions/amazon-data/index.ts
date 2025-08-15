import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { createHmac } from "https://deno.land/std@0.190.0/crypto/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// AWS Signature V4 implementation
async function signRequest(method: string, url: string, headers: Record<string, string>, payload: string, accessKey: string, secretKey: string, region: string) {
  const urlObj = new URL(url);
  const host = urlObj.host;
  const path = urlObj.pathname + urlObj.search;
  
  const now = new Date();
  const dateStamp = now.toISOString().slice(0, 10).replace(/-/g, '');
  const timeStamp = now.toISOString().slice(0, 19).replace(/[-:]/g, '') + 'Z';
  
  // Create canonical request
  const canonicalHeaders = Object.entries(headers)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key.toLowerCase()}:${value}\n`)
    .join('');
  
  const signedHeaders = Object.keys(headers)
    .sort()
    .map(key => key.toLowerCase())
    .join(';');
  
  const payloadHash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(payload));
  const payloadHashHex = Array.from(new Uint8Array(payloadHash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
  
  const canonicalRequest = `${method}\n${path}\n\n${canonicalHeaders}\n${signedHeaders}\n${payloadHashHex}`;
  
  // Create string to sign
  const algorithm = 'AWS4-HMAC-SHA256';
  const credentialScope = `${dateStamp}/${region}/execute-api/aws4_request`;
  const canonicalRequestHash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(canonicalRequest));
  const canonicalRequestHashHex = Array.from(new Uint8Array(canonicalRequestHash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
  
  const stringToSign = `${algorithm}\n${timeStamp}\n${credentialScope}\n${canonicalRequestHashHex}`;
  
  // Calculate signature
  const kDate = await createHmac('sha256', new TextEncoder().encode(`AWS4${secretKey}`)).update(dateStamp).digest();
  const kRegion = await createHmac('sha256', kDate).update(region).digest();
  const kService = await createHmac('sha256', kRegion).update('execute-api').digest();
  const kSigning = await createHmac('sha256', kService).update('aws4_request').digest();
  const signature = await createHmac('sha256', kSigning).update(stringToSign).digest('hex');
  
  const authorization = `${algorithm} Credential=${accessKey}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;
  
  return {
    ...headers,
    'Authorization': authorization,
    'X-Amz-Date': timeStamp,
  };
}

async function refreshAccessToken(refreshToken: string): Promise<{ access_token: string; expires_in: number }> {
  const clientId = Deno.env.get('AMAZON_LWA_CLIENT_ID');
  const clientSecret = Deno.env.get('AMAZON_LWA_CLIENT_SECRET');
  
  const response = await fetch('https://api.amazon.com/auth/o2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: clientId || '',
      client_secret: clientSecret || '',
    }),
  });
  
  const data = await response.json();
  if (!response.ok) {
    throw new Error(`Failed to refresh token: ${data.error_description}`);
  }
  
  return data;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    );

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    const { data: { user } } = await supabaseClient.auth.getUser(authHeader.replace('Bearer ', ''));
    if (!user) {
      throw new Error('Unauthorized');
    }

    const url = new URL(req.url);
    const action = url.searchParams.get('action');

    // Get user's Amazon account
    const { data: amazonAccount, error: accountError } = await supabaseClient
      .from('amazon_accounts')
      .select('*')
      .eq('user_id', user.id)
      .eq('is_active', true)
      .single();

    if (accountError || !amazonAccount) {
      throw new Error('No active Amazon account found');
    }

    // Check if access token needs refresh
    let accessToken = amazonAccount.access_token;
    if (!accessToken || new Date(amazonAccount.access_token_expires_at) <= new Date()) {
      const tokenData = await refreshAccessToken(amazonAccount.refresh_token);
      accessToken = tokenData.access_token;
      
      // Update the access token in database
      await supabaseClient
        .from('amazon_accounts')
        .update({
          access_token: accessToken,
          access_token_expires_at: new Date(Date.now() + tokenData.expires_in * 1000).toISOString(),
        })
        .eq('id', amazonAccount.id);
    }

    if (action === 'orders') {
      // Fetch orders from Amazon SP-API
      const marketplaceIds = amazonAccount.marketplace_ids.join(',');
      const createdAfter = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(); // Last 30 days
      
      const ordersUrl = `https://sellingpartnerapi-na.amazon.com/orders/v0/orders?MarketplaceIds=${marketplaceIds}&CreatedAfter=${createdAfter}`;
      
      const headers = {
        'host': 'sellingpartnerapi-na.amazon.com',
        'x-amz-access-token': accessToken,
        'x-amz-date': new Date().toISOString().slice(0, 19).replace(/[-:]/g, '') + 'Z',
      };

      const signedHeaders = await signRequest('GET', ordersUrl, headers, '', '', '', amazonAccount.region);
      
      const ordersResponse = await fetch(ordersUrl, {
        method: 'GET',
        headers: signedHeaders,
      });

      const ordersData = await ordersResponse.json();
      
      if (!ordersResponse.ok) {
        throw new Error(`Amazon API error: ${ordersData.errors?.[0]?.message || 'Unknown error'}`);
      }

      // Store orders in database
      if (ordersData.payload?.Orders) {
        const ordersToInsert = ordersData.payload.Orders.map((order: any) => ({
          user_id: user.id,
          amazon_account_id: amazonAccount.id,
          amazon_order_id: order.AmazonOrderId,
          marketplace_id: order.MarketplaceId,
          order_status: order.OrderStatus,
          purchase_date: order.PurchaseDate,
          last_update_date: order.LastUpdateDate,
          order_type: order.OrderType,
          fulfillment_channel: order.FulfillmentChannel,
          ship_service_level: order.ShipServiceLevel,
          order_total_amount: order.OrderTotal?.Amount || 0,
          order_total_currency: order.OrderTotal?.CurrencyCode,
          number_of_items_shipped: order.NumberOfItemsShipped || 0,
          number_of_items_unshipped: order.NumberOfItemsUnshipped || 0,
          earliest_ship_date: order.EarliestShipDate,
          latest_ship_date: order.LatestShipDate,
          buyer_email: order.BuyerEmail,
        }));

        await supabaseClient
          .from('amazon_orders')
          .upsert(ordersToInsert, { onConflict: 'amazon_order_id' });
      }

      return new Response(JSON.stringify({ success: true, orders: ordersData.payload?.Orders || [] }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ error: 'Invalid action' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in amazon-data function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});