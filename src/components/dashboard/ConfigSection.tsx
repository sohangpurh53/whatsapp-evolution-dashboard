import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Save, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

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
  const STORAGE_KEY = "evoapi_config";

  const toB64 = (bytes: Uint8Array) => btoa(String.fromCharCode(...bytes));
  const fromB64 = (b64: string) => Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
  const getKey = async () => {
    let stored = localStorage.getItem("evoapi_config_key");
    if (!stored) {
      const raw = crypto.getRandomValues(new Uint8Array(32));
      stored = toB64(raw);
      localStorage.setItem("evoapi_config_key", stored);
    }
    const keyBytes = fromB64(stored);
    return crypto.subtle.importKey("raw", keyBytes, "AES-GCM", false, ["encrypt", "decrypt"]);
  };
  const encryptText = async (text: string) => {
    const key = await getKey();
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const data = new TextEncoder().encode(text);
    const cipher = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, data);
    return { iv: toB64(iv), data: toB64(new Uint8Array(cipher)) };
  };
  const decryptText = async (payload: { iv: string; data: string }) => {
    const key = await getKey();
    const iv = fromB64(payload.iv);
    const data = fromB64(payload.data);
    const plain = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, data);
    return new TextDecoder().decode(plain);
  };

  useEffect(() => {
    const load = async () => {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          const text = await decryptText(parsed);
          const obj = JSON.parse(text);
          setConfig(obj);
        } catch {}
      }
    };
    load();
  }, [setConfig]);

  const handleSave = async () => {
    const payload = await encryptText(JSON.stringify(config));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    toast({ title: "Configuration saved", description: "Your API settings have been updated securely." });
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
              type="password"
              autoComplete="off"
              placeholder="https://api.evoapicloud.com"
              value={config.baseUrl}
              onChange={(e) => setConfig({ ...config, baseUrl: e.target.value })}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSave();
              }}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="instance">Instance ID</Label>
            <Input
              id="instance"
              type="password"
              autoComplete="off"
              placeholder="your-instance-id"
              value={config.instance}
              onChange={(e) => setConfig({ ...config, instance: e.target.value })}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSave();
              }}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="apiKey">API Key</Label>
            <Input
              id="apiKey"
              type="password"
              autoComplete="off"
              placeholder="your-api-key"
              value={config.apiKey}
              onChange={(e) => setConfig({ ...config, apiKey: e.target.value })}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSave();
              }}
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
