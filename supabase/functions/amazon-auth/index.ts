import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

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

    if (action === 'start') {
      // Start Amazon OAuth flow
      const clientId = Deno.env.get('AMAZON_LWA_CLIENT_ID');
      const redirectUri = `${url.origin}/auth/amazon/callback`;
      
      const authUrl = new URL('https://sellercentral.amazon.com/apps/authorize/consent');
      authUrl.searchParams.set('application_id', clientId || '');
      authUrl.searchParams.set('redirect_uri', redirectUri);
      authUrl.searchParams.set('state', user.id); // Use user ID as state for security
      authUrl.searchParams.set('version', 'beta');

      return new Response(JSON.stringify({ authUrl: authUrl.toString() }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (action === 'callback') {
      // Handle Amazon OAuth callback
      const code = url.searchParams.get('spapi_oauth_code');
      const state = url.searchParams.get('state');
      const sellingPartnerId = url.searchParams.get('selling_partner_id');

      if (state !== user.id) {
        throw new Error('Invalid state parameter');
      }

      if (!code || !sellingPartnerId) {
        throw new Error('Missing authorization code or seller ID');
      }

      // Exchange code for tokens
      const clientId = Deno.env.get('AMAZON_LWA_CLIENT_ID');
      const clientSecret = Deno.env.get('AMAZON_LWA_CLIENT_SECRET');
      const redirectUri = `${url.origin}/auth/amazon/callback`;

      const tokenResponse = await fetch('https://api.amazon.com/auth/o2/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code: code,
          client_id: clientId || '',
          client_secret: clientSecret || '',
          redirect_uri: redirectUri,
        }),
      });

      const tokenData = await tokenResponse.json();
      
      if (!tokenResponse.ok) {
        console.error('Token exchange failed:', tokenData);
        throw new Error('Failed to exchange authorization code for tokens');
      }

      // Store account information in database
      const { error } = await supabaseClient
        .from('amazon_accounts')
        .upsert({
          user_id: user.id,
          seller_id: sellingPartnerId,
          refresh_token: tokenData.refresh_token,
          access_token: tokenData.access_token,
          access_token_expires_at: new Date(Date.now() + tokenData.expires_in * 1000).toISOString(),
          region: 'us-east-1', // Default to North America
          marketplace_ids: ['ATVPDKIKX0DER'], // Default to US marketplace
          is_active: true,
        });

      if (error) {
        console.error('Database error:', error);
        throw new Error('Failed to save Amazon account');
      }

      return new Response(JSON.stringify({ success: true, seller_id: sellingPartnerId }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ error: 'Invalid action' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in amazon-auth function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});