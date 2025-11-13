import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ApiFormBase } from "./ApiFormBase";

interface ArchiveChatFormProps {
  config: { baseUrl: string; instance: string; apiKey: string };
}

export const ArchiveChatForm = ({ config }: ArchiveChatFormProps) => {
  const [chat, setChat] = useState("");
  const [archive, setArchive] = useState(true);

  const handleSubmit = async () => {
    const response = await fetch(
      `${config.baseUrl}/chat/archiveChat/${config.instance}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: config.apiKey,
        },
        body: JSON.stringify({
          chat: `${chat}@s.whatsapp.net`,
          archive,
          lastMessage: {
            key: {
              remoteJid: `${chat}@s.whatsapp.net`,
              fromMe: false,
              id: "DUMMY_ID",
            },
          },
        }),
      }
    );
    return response.json();
  };

  return (
    <ApiFormBase
      title="Archive Chat"
      description="Archive or unarchive a chat"
      onSubmit={handleSubmit}
      config={config}
    >
      <div className="space-y-2">
        <Label htmlFor="chat">Phone Number</Label>
        <Input
          id="chat"
          placeholder="559999999999"
          value={chat}
          onChange={(e) => setChat(e.target.value)}
          required
        />
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="archive"
          checked={archive}
          onCheckedChange={(checked) => setArchive(checked as boolean)}
        />
        <Label htmlFor="archive">Archive (uncheck to unarchive)</Label>
      </div>
    </ApiFormBase>
  );
};
