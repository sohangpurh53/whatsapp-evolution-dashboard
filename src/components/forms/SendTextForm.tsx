import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ApiFormBase } from "./ApiFormBase";

interface SendTextFormProps {
  config: { baseUrl: string; instance: string; apiKey: string };
}

export const SendTextForm = ({ config }: SendTextFormProps) => {
  const [number, setNumber] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = async () => {
    const response = await fetch(
      `${config.baseUrl}/message/sendText/${config.instance}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: config.apiKey,
        },
        body: JSON.stringify({ number, text }),
      }
    );
    return response.json();
  };

  return (
    <ApiFormBase
      title="Send Text Message"
      description="Send a simple text message to a WhatsApp number"
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
        <Label htmlFor="text">Message</Label>
        <Textarea
          id="text"
          placeholder="Your message here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
          rows={4}
        />
      </div>
    </ApiFormBase>
  );
};
