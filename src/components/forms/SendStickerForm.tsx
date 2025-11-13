import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ApiFormBase } from "./ApiFormBase";

interface SendStickerFormProps {
  config: { baseUrl: string; instance: string; apiKey: string };
}

export const SendStickerForm = ({ config }: SendStickerFormProps) => {
  const [number, setNumber] = useState("");
  const [stickerUrl, setStickerUrl] = useState("");

  const handleSubmit = async () => {
    const response = await fetch(
      `${config.baseUrl}/message/sendSticker/${config.instance}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: config.apiKey,
        },
        body: JSON.stringify({
          number,
          sticker: stickerUrl,
        }),
      }
    );
    return response.json();
  };

  return (
    <ApiFormBase
      title="Send Sticker"
      description="Send a sticker from URL or base64"
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
      <div className="space-y-2">
        <Label htmlFor="stickerUrl">Sticker URL</Label>
        <Input
          id="stickerUrl"
          placeholder="https://example.com/sticker.png"
          value={stickerUrl}
          onChange={(e) => setStickerUrl(e.target.value)}
          required
        />
      </div>
    </ApiFormBase>
  );
};
