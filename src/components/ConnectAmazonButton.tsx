import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ShoppingCart, Loader2 } from "lucide-react";

export function ConnectAmazonButton() {
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();

  const handleConnectAmazon = async () => {
    try {
      setIsConnecting(true);
      
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Authentication required",
          description: "Please sign in to connect your Amazon account.",
          variant: "destructive",
        });
        return;
      }

      // Start Amazon OAuth flow
      const { data, error } = await supabase.functions.invoke('amazon-auth', {
        body: {},
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data?.authUrl) {
        // Redirect to Amazon authorization page
        window.location.href = data.authUrl;
      }
    } catch (error) {
      console.error('Error connecting to Amazon:', error);
      toast({
        title: "Connection failed",
        description: "Failed to connect to Amazon. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <Button 
      onClick={handleConnectAmazon} 
      disabled={isConnecting}
      className="flex items-center gap-2"
    >
      {isConnecting ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Connecting...
        </>
      ) : (
        <>
          <ShoppingCart className="h-4 w-4" />
          Connect Amazon
        </>
      )}
    </Button>
  );
}