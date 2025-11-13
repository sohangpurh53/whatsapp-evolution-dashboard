import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ApiFormBase } from "./ApiFormBase";

interface FetchProfileFormProps {
  config: { baseUrl: string; instance: string; apiKey: string };
}

export const FetchProfileForm = ({ config }: FetchProfileFormProps) => {
  const [number, setNumber] = useState("");

  const handleSubmit = async () => {
    const response = await fetch(
      `${config.baseUrl}/chat/fetchProfile/${config.instance}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: config.apiKey,
        },
        body: JSON.stringify({ number }),
      }
    );
    return response.json();
  };

  return (
    <ApiFormBase
      title="Fetch Profile"
      description="Get profile information of a WhatsApp user"
      onSubmit={handleSubmit}
      config={config}
    >
      <div className="space-y-2">
        <Label htmlFor="number">Phone Number</Label>
        <Input
          id="number"
          placeholder="559999999999"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          required
        />
      </div>
    </ApiFormBase>
  );
};
