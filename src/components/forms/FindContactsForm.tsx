import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ApiFormBase } from "./ApiFormBase";

interface FindContactsFormProps {
  config: { baseUrl: string; instance: string; apiKey: string };
}

export const FindContactsForm = ({ config }: FindContactsFormProps) => {
  const [contactId, setContactId] = useState("");

  const handleSubmit = async () => {
    const body = contactId
      ? { where: { id: contactId } }
      : { where: {} };
      
    const response = await fetch(
      `${config.baseUrl}/chat/findContacts/${config.instance}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: config.apiKey,
        },
        body: JSON.stringify(body),
      }
    );
    return response.json();
  };

  return (
    <ApiFormBase
      title="Find Contacts"
      description="List all contacts or find a specific one"
      onSubmit={handleSubmit}
      config={config}
    >
      <div className="space-y-2">
        <Label htmlFor="contactId">Contact ID (Optional)</Label>
        <Input
          id="contactId"
          placeholder="Leave empty to list all contacts"
          value={contactId}
          onChange={(e) => setContactId(e.target.value)}
        />
      </div>
    </ApiFormBase>
  );
};
