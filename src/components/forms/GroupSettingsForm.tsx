import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ApiFormBase } from "./ApiFormBase";

interface GroupSettingsFormProps {
  config: { baseUrl: string; instance: string; apiKey: string };
}

export const GroupSettingsForm = ({ config }: GroupSettingsFormProps) => {
  const [groupJid, setGroupJid] = useState("");
  const [action, setAction] = useState("not_announcement");

  const handleSubmit = async () => {
    const response = await fetch(
      `${config.baseUrl}/group/updateSetting/${config.instance}?groupJid=${groupJid}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: config.apiKey,
        },
        body: JSON.stringify({ action }),
      }
    );
    return response.json();
  };

  return (
    <ApiFormBase
      title="Group Settings"
      description="Configure group messaging and edit permissions"
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
        <Label htmlFor="action">Setting</Label>
        <Select value={action} onValueChange={setAction}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="announcement">Only Admins Can Send Messages</SelectItem>
            <SelectItem value="not_announcement">All Members Can Send Messages</SelectItem>
            <SelectItem value="locked">Only Admins Can Edit Info</SelectItem>
            <SelectItem value="unlocked">All Members Can Edit Info</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </ApiFormBase>
  );
};
