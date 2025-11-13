import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ApiFormBase } from "./ApiFormBase";

interface PrivacySettingsFormProps {
  config: { baseUrl: string; instance: string; apiKey: string };
}

export const PrivacySettingsForm = ({ config }: PrivacySettingsFormProps) => {
  const [readReceipts, setReadReceipts] = useState("all");
  const [profile, setProfile] = useState("all");
  const [status, setStatus] = useState("all");
  const [online, setOnline] = useState("all");
  const [lastSeen, setLastSeen] = useState("all");
  const [groupAdd, setGroupAdd] = useState("all");

  const handleSubmit = async () => {
    const response = await fetch(
      `${config.baseUrl}/chat/updatePrivacySettings/${config.instance}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: config.apiKey,
        },
        body: JSON.stringify({
          readreceipts: readReceipts,
          profile,
          status,
          online,
          last: lastSeen,
          groupadd: groupAdd,
        }),
      }
    );
    return response.json();
  };

  return (
    <ApiFormBase
      title="Privacy Settings"
      description="Configure your WhatsApp privacy preferences"
      onSubmit={handleSubmit}
      config={config}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Read Receipts</Label>
          <Select value={readReceipts} onValueChange={setReadReceipts}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Everyone</SelectItem>
              <SelectItem value="none">Nobody</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label>Profile Photo</Label>
          <Select value={profile} onValueChange={setProfile}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Everyone</SelectItem>
              <SelectItem value="contacts">My Contacts</SelectItem>
              <SelectItem value="none">Nobody</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Status</Label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Everyone</SelectItem>
              <SelectItem value="contacts">My Contacts</SelectItem>
              <SelectItem value="none">Nobody</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Last Seen</Label>
          <Select value={lastSeen} onValueChange={setLastSeen}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Everyone</SelectItem>
              <SelectItem value="contacts">My Contacts</SelectItem>
              <SelectItem value="none">Nobody</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Group Add</Label>
          <Select value={groupAdd} onValueChange={setGroupAdd}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Everyone</SelectItem>
              <SelectItem value="contacts">My Contacts</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </ApiFormBase>
  );
};
