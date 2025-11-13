import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ApiFormBase } from "./ApiFormBase";

interface ReadMessagesFormProps {
  config: { baseUrl: string; instance: string; apiKey: string };
}

export const ReadMessagesForm = ({ config }: ReadMessagesFormProps) => {
  const [remoteJid, setRemoteJid] = useState("");
  const [messageId, setMessageId] = useState("");
  const [fromMe, setFromMe] = useState(false);

  const handleSubmit = async () => {
    const response = await fetch(
      `${config.baseUrl}/chat/markMessageAsRead/${config.instance}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: config.apiKey,
        },
        body: JSON.stringify({
          readMessages: [
            {
              remoteJid: `${remoteJid}@s.whatsapp.net`,
              fromMe,
              id: messageId,
            },
          ],
        }),
      }
    );
    return response.json();
  };

  return (
    <ApiFormBase
      title="Mark Messages as Read"
      description="Mark one or more messages as read"
      onSubmit={handleSubmit}
      config={config}
    >
      <div className="space-y-2">
        <Label htmlFor="remoteJid">Phone Number</Label>
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
          placeholder="80C4CE9B72F797DBC6ECD8D19B247FC9"
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
