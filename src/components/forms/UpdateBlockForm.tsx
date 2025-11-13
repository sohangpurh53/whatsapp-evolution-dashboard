import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ApiFormBase } from "./ApiFormBase";

interface UpdateBlockFormProps {
  config: { baseUrl: string; instance: string; apiKey: string };
}

export const UpdateBlockForm = ({ config }: UpdateBlockFormProps) => {
  const [number, setNumber] = useState("");
  const [status, setStatus] = useState("block");

  const handleSubmit = async () => {
    const response = await fetch(
      `${config.baseUrl}/message/updateBlockStatus/${config.instance}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: config.apiKey,
        },
        body: JSON.stringify({ number, status }),
      }
    );
    return response.json();
  };

  return (
    <ApiFormBase
      title="Update Block Status"
      description="Block or unblock a contact"
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
        <Label htmlFor="status">Action</Label>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="block">Block</SelectItem>
            <SelectItem value="unblock">Unblock</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </ApiFormBase>
  );
};
