import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AmazonCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          throw new Error('Not authenticated');
        }

        // Extract parameters from URL
        const code = searchParams.get('spapi_oauth_code');
        const state = searchParams.get('state');
        const sellingPartnerId = searchParams.get('selling_partner_id');

        if (!code) {
          throw new Error('No authorization code received');
        }

        // Send callback to backend
        const { data, error } = await supabase.functions.invoke('amazon-auth', {
          body: {
            action: 'callback',
            code,
            state,
            selling_partner_id: sellingPartnerId,
          },
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        });

        if (error) {
          throw new Error(error.message);
        }

        if (data?.success) {
          setStatus('success');
          toast({
            title: "Amazon account connected!",
            description: "Your Amazon Seller Central account has been successfully connected.",
          });
          
          // Redirect to dashboard after 2 seconds
          setTimeout(() => {
            navigate('/dashboard');
          }, 2000);
        } else {
          throw new Error('Failed to connect Amazon account');
        }
      } catch (error) {
        console.error('Amazon callback error:', error);
        setStatus('error');
        toast({
          title: "Connection failed",
          description: error instanceof Error ? error.message : "Failed to connect Amazon account",
          variant: "destructive",
        });
      }
    };

    handleCallback();
  }, [searchParams, navigate, toast]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            {status === 'loading' && <Loader2 className="h-6 w-6 animate-spin" />}
            {status === 'success' && <CheckCircle className="h-6 w-6 text-green-500" />}
            {status === 'error' && <XCircle className="h-6 w-6 text-destructive" />}
            Amazon Connection
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          {status === 'loading' && (
            <p className="text-muted-foreground">
              Processing your Amazon connection...
            </p>
          )}
          {status === 'success' && (
            <>
              <p className="text-green-600">
                Successfully connected to Amazon!
              </p>
              <p className="text-sm text-muted-foreground">
                Redirecting to dashboard...
              </p>
            </>
          )}
          {status === 'error' && (
            <>
              <p className="text-destructive">
                Failed to connect to Amazon
              </p>
              <Button onClick={() => navigate('/dashboard')} variant="outline">
                Return to Dashboard
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}