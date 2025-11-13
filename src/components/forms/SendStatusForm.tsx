import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ApiFormBase } from "./ApiFormBase";

interface SendStatusFormProps {
  config: { baseUrl: string; instance: string; apiKey: string };
}

export const SendStatusForm = ({ config }: SendStatusFormProps) => {
  const [type, setType] = useState("text");
  const [content, setContent] = useState("");

  const handleSubmit = async () => {
    const response = await fetch(
      `${config.baseUrl}/message/sendStatus/${config.instance}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: config.apiKey,
        },
        body: JSON.stringify({
          type,
          content,
          allContacts: true,
        }),
      }
    );
    return response.json();
  };

  return (
    <ApiFormBase
      title="Send Status/Story"
      description="Post a status update to your WhatsApp contacts"
      onSubmit={handleSubmit}
      config={config}
    >
      <div className="space-y-2">
        <Label htmlFor="type">Status Type</Label>
        <Select value={type} onValueChange={setType}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="text">Text</SelectItem>
            <SelectItem value="image">Image</SelectItem>
            <SelectItem value="video">Video</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="content">
          {type === "text" ? "Text Content" : "Media URL"}
        </Label>
        <Textarea
          id="content"
          placeholder={
            type === "text"
              ? "Your status message..."
              : "https://example.com/media.jpg"
          }
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          required
        />
      </div>
    </ApiFormBase>
  );
};
