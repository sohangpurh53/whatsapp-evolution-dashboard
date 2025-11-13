import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ApiFormBase } from "./ApiFormBase";

interface UpdateProfileNameFormProps {
  config: { baseUrl: string; instance: string; apiKey: string };
}

export const UpdateProfileNameForm = ({ config }: UpdateProfileNameFormProps) => {
  const [name, setName] = useState("");

  const handleSubmit = async () => {
    const response = await fetch(
      `${config.baseUrl}/chat/updateProfileName/${config.instance}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: config.apiKey,
        },
        body: JSON.stringify({ name }),
      }
    );
    return response.json();
  };

  return (
    <ApiFormBase
      title="Update Profile Name"
      description="Change your WhatsApp profile name"
      onSubmit={handleSubmit}
      config={config}
    >
      <div className="space-y-2">
        <Label htmlFor="name">Profile Name</Label>
        <Input
          id="name"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
    </ApiFormBase>
  );
};
