import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ApiFormBase } from "./ApiFormBase";

interface SendMediaFormProps {
  config: { baseUrl: string; instance: string; apiKey: string };
}

export const SendMediaForm = ({ config }: SendMediaFormProps) => {
  const [number, setNumber] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [mediaType, setMediaType] = useState("image");
  const [caption, setCaption] = useState("");

  const handleSubmit = async () => {
    const response = await fetch(
      `${config.baseUrl}/message/sendMedia/${config.instance}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: config.apiKey,
        },
        body: JSON.stringify({
          number,
          media: mediaUrl,
          mediatype: mediaType,
          caption,
        }),
      }
    );
    return response.json();
  };

  return (
    <ApiFormBase
      title="Send Media Message"
      description="Send image, video, or document files"
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
        <Label htmlFor="mediaType">Media Type</Label>
        <Select value={mediaType} onValueChange={setMediaType}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="image">Image</SelectItem>
            <SelectItem value="video">Video</SelectItem>
            <SelectItem value="document">Document</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="mediaUrl">Media URL</Label>
        <Input
          id="mediaUrl"
          placeholder="https://example.com/image.jpg"
          value={mediaUrl}
          onChange={(e) => setMediaUrl(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="caption">Caption (Optional)</Label>
        <Textarea
          id="caption"
          placeholder="Media caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          rows={3}
        />
      </div>
    </ApiFormBase>
  );
};
