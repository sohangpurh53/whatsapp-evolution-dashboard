import { ReactNode, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Send, Loader2, Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ApiFormBaseProps {
  title: string;
  description: string;
  children: ReactNode;
  onSubmit: () => Promise<any>;
  config: {
    baseUrl: string;
    instance: string;
    apiKey: string;
  };
}

export const ApiFormBase = ({ title, description, children, onSubmit, config }: ApiFormBaseProps) => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!config.instance || !config.apiKey) {
      toast({
        title: "Configuration required",
        description: "Please configure your API credentials first",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const result = await onSubmit();
      setResponse(result);
      toast({
        title: "Request successful",
        description: "API request completed successfully",
      });
    } catch (error: any) {
      toast({
        title: "Request failed",
        description: error.message || "An error occurred",
        variant: "destructive",
      });
      setResponse({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  const copyResponse = () => {
    navigator.clipboard.writeText(JSON.stringify(response, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {children}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send Request
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {response && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Response</CardTitle>
              <Button variant="ghost" size="sm" onClick={copyResponse}>
                {copied ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Alert>
              <AlertDescription>
                <pre className="text-xs overflow-x-auto">
                  {JSON.stringify(response, null, 2)}
                </pre>
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
