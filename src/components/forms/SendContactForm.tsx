import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ApiFormBase } from "./ApiFormBase";

interface SendContactFormProps {
  config: { baseUrl: string; instance: string; apiKey: string };
}

export const SendContactForm = ({ config }: SendContactFormProps) => {
  const [number, setNumber] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactWuid, setContactWuid] = useState("");

  const handleSubmit = async () => {
    const response = await fetch(
      `${config.baseUrl}/message/sendContact/${config.instance}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: config.apiKey,
        },
        body: JSON.stringify({
          number,
          contact: [
            {
              fullName: contactName,
              wuid: contactWuid,
              phoneNumber: contactPhone,
            },
          ],
        }),
      }
    );
    return response.json();
  };

  return (
    <ApiFormBase
      title="Send Contact"
      description="Share a contact card"
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
        <Label htmlFor="contactName">Contact Name</Label>
        <Input
          id="contactName"
          placeholder="John Doe"
          value={contactName}
          onChange={(e) => setContactName(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="contactWuid">Contact WUID</Label>
        <Input
          id="contactWuid"
          placeholder="559999999999"
          value={contactWuid}
          onChange={(e) => setContactWuid(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="contactPhone">Contact Phone</Label>
        <Input
          id="contactPhone"
          placeholder="+55 99 9 9999-9999"
          value={contactPhone}
          onChange={(e) => setContactPhone(e.target.value)}
          required
        />
      </div>
    </ApiFormBase>
  );
};
