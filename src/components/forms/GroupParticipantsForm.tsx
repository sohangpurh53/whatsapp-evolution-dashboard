import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ApiFormBase } from "./ApiFormBase";

interface GroupParticipantsFormProps {
  config: { baseUrl: string; instance: string; apiKey: string };
}

export const GroupParticipantsForm = ({ config }: GroupParticipantsFormProps) => {
  const [groupJid, setGroupJid] = useState("");
  const [action, setAction] = useState("add");
  const [participants, setParticipants] = useState("");

  const handleSubmit = async () => {
    const participantArray = participants
      .split("\n")
      .map((p) => p.trim())
      .filter(Boolean);
      
    const response = await fetch(
      `${config.baseUrl}/group/updateParticipant/${config.instance}?groupJid=${groupJid}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: config.apiKey,
        },
        body: JSON.stringify({
          action,
          participants: participantArray,
        }),
      }
    );
    return response.json();
  };

  return (
    <ApiFormBase
      title="Manage Participants"
      description="Add, remove, promote, or demote group members"
      onSubmit={handleSubmit}
      config={config}
    >
      <div className="space-y-2">
        <Label htmlFor="groupJid">Group JID</Label>
        <Input
          id="groupJid"
          placeholder="999999999999999999@g.us"
          value={groupJid}
          onChange={(e) => setGroupJid(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="action">Action</Label>
        <Select value={action} onValueChange={setAction}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="add">Add Members</SelectItem>
            <SelectItem value="remove">Remove Members</SelectItem>
            <SelectItem value="promote">Promote to Admin</SelectItem>
            <SelectItem value="demote">Demote to Member</SelectItem>
          </SelectContent>
        </Select>
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
