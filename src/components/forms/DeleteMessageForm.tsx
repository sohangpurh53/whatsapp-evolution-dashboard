import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ApiFormBase } from "./ApiFormBase";

interface DeleteMessageFormProps {
  config: { baseUrl: string; instance: string; apiKey: string };
}

export const DeleteMessageForm = ({ config }: DeleteMessageFormProps) => {
  const [remoteJid, setRemoteJid] = useState("");
  const [messageId, setMessageId] = useState("");
  const [fromMe, setFromMe] = useState(true);

  const handleSubmit = async () => {
    const response = await fetch(
      `${config.baseUrl}/chat/deleteMessageForEveryone/${config.instance}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          apikey: config.apiKey,
        },
        body: JSON.stringify({
          id: messageId,
          remoteJid,
          fromMe,
        }),
      }
    );
    return response.json();
  };

  return (
    <ApiFormBase
      title="Delete Message"
      description="Delete a message for everyone"
      onSubmit={handleSubmit}
      config={config}
    >
      <div className="space-y-2">
        <Label htmlFor="remoteJid">Remote JID</Label>
        <Input
          id="remoteJid"
          placeholder="559999999999@s.whatsapp.net"
          value={remoteJid}
          onChange={(e) => setRemoteJid(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="messageId">Message ID</Label>
        <Input
          id="messageId"
          placeholder="MESSAGE_ID"
          value={messageId}
          onChange={(e) => setMessageId(e.target.value)}
          required
        />
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="fromMe"
          checked={fromMe}
          onCheckedChange={(checked) => setFromMe(checked as boolean)}
        />
        <Label htmlFor="fromMe">From Me</Label>
      </div>
    </ApiFormBase>
  );
};
