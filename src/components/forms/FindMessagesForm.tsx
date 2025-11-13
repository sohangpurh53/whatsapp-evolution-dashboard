import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ApiFormBase } from "./ApiFormBase";

interface FindMessagesFormProps {
  config: { baseUrl: string; instance: string; apiKey: string };
}

export const FindMessagesForm = ({ config }: FindMessagesFormProps) => {
  const [remoteJid, setRemoteJid] = useState("");
  const [page, setPage] = useState("1");
  const [offset, setOffset] = useState("10");

  const handleSubmit = async () => {
    const response = await fetch(
      `${config.baseUrl}/chat/findMessages/${config.instance}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: config.apiKey,
        },
        body: JSON.stringify({
          where: {
            key: {
              remoteJid: `${remoteJid}@s.whatsapp.net`,
            },
          },
          page: parseInt(page),
          offset: parseInt(offset),
        }),
      }
    );
    return response.json();
  };

  return (
    <ApiFormBase
      title="Find Messages"
      description="Search for messages in a chat"
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
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="page">Page</Label>
          <Input
            id="page"
            type="number"
            value={page}
            onChange={(e) => setPage(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="offset">Offset</Label>
          <Input
            id="offset"
            type="number"
            value={offset}
            onChange={(e) => setOffset(e.target.value)}
          />
        </div>
      </div>
    </ApiFormBase>
  );
};
