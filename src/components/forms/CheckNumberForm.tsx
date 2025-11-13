import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ApiFormBase } from "./ApiFormBase";

interface CheckNumberFormProps {
  config: { baseUrl: string; instance: string; apiKey: string };
}

export const CheckNumberForm = ({ config }: CheckNumberFormProps) => {
  const [numbers, setNumbers] = useState("");

  const handleSubmit = async () => {
    const numberArray = numbers
      .split("\n")
      .map((n) => n.trim())
      .filter(Boolean);
    const response = await fetch(
      `${config.baseUrl}/chat/whatsappNumbers/${config.instance}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: config.apiKey,
        },
        body: JSON.stringify({ numbers: numberArray }),
      }
    );
    return response.json();
  };

  return (
    <ApiFormBase
      title="Check WhatsApp Numbers"
      description="Verify if phone numbers are registered on WhatsApp"
      onSubmit={handleSubmit}
      config={config}
    >
      <div className="space-y-2">
        <Label htmlFor="numbers">Phone Numbers (one per line)</Label>
        <Textarea
          id="numbers"
          placeholder="55999999999&#10;55988888888&#10;55977777777"
          value={numbers}
          onChange={(e) => setNumbers(e.target.value)}
          rows={6}
          required
        />
      </div>
    </ApiFormBase>
  );
};
