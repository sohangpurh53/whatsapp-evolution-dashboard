import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Save, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ConfigSectionProps {
  config: {
    baseUrl: string;
    instance: string;
    apiKey: string;
  };
  setConfig: (config: any) => void;
}

export const ConfigSection = ({ config, setConfig }: ConfigSectionProps) => {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Configuration saved",
      description: "Your API settings have been updated successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Configuration</h2>
        <p className="text-muted-foreground">Set up your Evolution API credentials</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            <CardTitle>API Credentials</CardTitle>
          </div>
          <CardDescription>
            Configure your Evolution API connection settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="baseUrl">Base URL</Label>
            <Input
              id="baseUrl"
              placeholder="https://api.evoapicloud.com"
              value={config.baseUrl}
              onChange={(e) => setConfig({ ...config, baseUrl: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="instance">Instance ID</Label>
            <Input
              id="instance"
              placeholder="your-instance-id"
              value={config.instance}
              onChange={(e) => setConfig({ ...config, instance: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="apiKey">API Key</Label>
            <Input
              id="apiKey"
              type="password"
              placeholder="your-api-key"
              value={config.apiKey}
              onChange={(e) => setConfig({ ...config, apiKey: e.target.value })}
            />
          </div>

          <Button onClick={handleSave} className="w-full">
            <Save className="w-4 h-4 mr-2" />
            Save Configuration
          </Button>
        </CardContent>
      </Card>

      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="text-lg">Quick Start</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">
              1
            </div>
            <div>
              <p className="font-medium">Configure credentials</p>
              <p className="text-sm text-muted-foreground">Enter your API base URL, instance ID, and API key</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">
              2
            </div>
            <div>
              <p className="font-medium">Choose an endpoint</p>
              <p className="text-sm text-muted-foreground">Navigate to Send Message, Chat, Profile, or Group sections</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">
              3
            </div>
            <div>
              <p className="font-medium">Make requests</p>
              <p className="text-sm text-muted-foreground">Fill in the required fields and send your API requests</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
