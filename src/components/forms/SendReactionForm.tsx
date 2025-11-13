import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ApiFormBase } from "./ApiFormBase";

interface SendReactionFormProps {
  config: { baseUrl: string; instance: string; apiKey: string };
}

export const SendReactionForm = ({ config }: SendReactionFormProps) => {
  const [remoteJid, setRemoteJid] = useState("");
  const [messageId, setMessageId] = useState("");
  const [reaction, setReaction] = useState("");

  const handleSubmit = async () => {
    const response = await fetch(
      `${config.baseUrl}/message/sendReaction/${config.instance}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: config.apiKey,
        },
        body: JSON.stringify({
          key: {
            remoteJid: `${remoteJid}@s.whatsapp.net`,
            fromMe: true,
            id: messageId,
          },
          reaction,
        }),
      }
    );
    return response.json();
  };

  return (
    <ApiFormBase
      title="Send Reaction"
      description="React to a message with an emoji"
      onSubmit={handleSubmit}
      config={config}
    >
      <div className="space-y-2">
        <Label htmlFor="remoteJid">Remote JID</Label>
        <Input
          id="remoteJid"
          placeholder="559999999999"
          value={remoteJid}
          onChange={(e) => setRemoteJid(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="messageId">Message ID</Label>
        <Input
          id="messageId"
          placeholder="BAE5A75CB0F39712"
          value={messageId}
          onChange={(e) => setMessageId(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="reaction">Reaction Emoji</Label>
        <Input
          id="reaction"
          placeholder="🚀"
          value={reaction}
          onChange={(e) => setReaction(e.target.value)}
          required
        />
      </div>
    </ApiFormBase>
  );
};
