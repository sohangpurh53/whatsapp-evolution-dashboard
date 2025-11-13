import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ApiFormBase } from "./ApiFormBase";

interface UpdateProfileStatusFormProps {
  config: { baseUrl: string; instance: string; apiKey: string };
}

export const UpdateProfileStatusForm = ({ config }: UpdateProfileStatusFormProps) => {
  const [status, setStatus] = useState("");

  const handleSubmit = async () => {
    const response = await fetch(
      `${config.baseUrl}/chat/updateProfileStatus/${config.instance}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: config.apiKey,
        },
        body: JSON.stringify({ status }),
      }
    );
    return response.json();
  };

  return (
    <ApiFormBase
      title="Update Profile Status"
      description="Change your WhatsApp about/status text"
      onSubmit={handleSubmit}
      config={config}
    >
      <div className="space-y-2">
        <Label htmlFor="status">Status Text</Label>
        <Textarea
          id="status"
          placeholder="Your status message..."
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          rows={3}
          required
        />
      </div>
    </ApiFormBase>
  );
};
