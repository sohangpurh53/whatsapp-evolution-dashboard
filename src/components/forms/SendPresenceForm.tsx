import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ApiFormBase } from "./ApiFormBase";

interface SendPresenceFormProps {
  config: { baseUrl: string; instance: string; apiKey: string };
}

export const SendPresenceForm = ({ config }: SendPresenceFormProps) => {
  const [number, setNumber] = useState("");
  const [presence, setPresence] = useState("composing");
  const [delay, setDelay] = useState("1200");

  const handleSubmit = async () => {
    const response = await fetch(
      `${config.baseUrl}/chat/sendPresence/${config.instance}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: config.apiKey,
        },
        body: JSON.stringify({
          number,
          presence,
          delay: parseInt(delay),
        }),
      }
    );
    return response.json();
  };

  return (
    <ApiFormBase
      title="Send Presence"
      description="Update your typing or recording status"
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
        <Label htmlFor="presence">Presence Type</Label>
        <Select value={presence} onValueChange={setPresence}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="composing">Typing...</SelectItem>
            <SelectItem value="recording">Recording...</SelectItem>
            <SelectItem value="paused">Available</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="delay">Delay (ms)</Label>
        <Input
          id="delay"
          type="number"
          value={delay}
          onChange={(e) => setDelay(e.target.value)}
        />
      </div>
    </ApiFormBase>
  );
};
