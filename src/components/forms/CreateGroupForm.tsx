import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ApiFormBase } from "./ApiFormBase";

interface CreateGroupFormProps {
  config: { baseUrl: string; instance: string; apiKey: string };
}

export const CreateGroupForm = ({ config }: CreateGroupFormProps) => {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [participants, setParticipants] = useState("");

  const handleSubmit = async () => {
    const participantArray = participants
      .split("\n")
      .map((p) => p.trim())
      .filter(Boolean);
      
    const response = await fetch(
      `${config.baseUrl}/group/create/${config.instance}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: config.apiKey,
        },
        body: JSON.stringify({
          subject,
          description,
          participants: participantArray,
        }),
      }
    );
    return response.json();
  };

  return (
    <ApiFormBase
      title="Create Group"
      description="Create a new WhatsApp group"
      onSubmit={handleSubmit}
      config={config}
    >
      <div className="space-y-2">
        <Label htmlFor="subject">Group Name</Label>
        <Input
          id="subject"
          placeholder="My Group"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Group description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="participants">Participants (one per line)</Label>
        <Textarea
          id="participants"
          placeholder="5531900000000&#10;5531911111111"
          value={participants}
          onChange={(e) => setParticipants(e.target.value)}
          rows={4}
          required
        />
      </div>
    </ApiFormBase>
  );
};
