import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ApiFormBase } from "./ApiFormBase";

interface UpdateProfilePictureFormProps {
  config: { baseUrl: string; instance: string; apiKey: string };
}

export const UpdateProfilePictureForm = ({ config }: UpdateProfilePictureFormProps) => {
  const [pictureUrl, setPictureUrl] = useState("");

  const handleSubmit = async () => {
    const response = await fetch(
      `${config.baseUrl}/chat/updateProfilePicture/${config.instance}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: config.apiKey,
        },
        body: JSON.stringify({ picture: pictureUrl }),
      }
    );
    return response.json();
  };

  return (
    <ApiFormBase
      title="Update Profile Picture"
      description="Change your WhatsApp profile picture"
      onSubmit={handleSubmit}
      config={config}
    >
      <div className="space-y-2">
        <Label htmlFor="pictureUrl">Picture URL</Label>
        <Input
          id="pictureUrl"
          placeholder="https://example.com/avatar.jpg"
          value={pictureUrl}
          onChange={(e) => setPictureUrl(e.target.value)}
          required
        />
      </div>
    </ApiFormBase>
  );
};
