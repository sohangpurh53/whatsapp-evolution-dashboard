import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ApiFormBase } from "./ApiFormBase";

interface SendListFormProps {
  config: { baseUrl: string; instance: string; apiKey: string };
}

export const SendListForm = ({ config }: SendListFormProps) => {
  const [number, setNumber] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [buttonText, setButtonText] = useState("");

  const handleSubmit = async () => {
    const response = await fetch(
      `${config.baseUrl}/message/sendList/${config.instance}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: config.apiKey,
        },
        body: JSON.stringify({
          number,
          title,
          description,
          buttonText,
          sections: [
            {
              title: "Section 1",
              rows: [
                {
                  title: "Option 1",
                  description: "Description for option 1",
                  rowId: "row1",
                },
              ],
            },
          ],
        }),
      }
    );
    return response.json();
  };

  return (
    <ApiFormBase
      title="Send List Message"
      description="Send an interactive list of options"
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
        <Label htmlFor="title">List Title</Label>
        <Input
          id="title"
          placeholder="Choose an option"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Select from the options below"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="buttonText">Button Text</Label>
        <Input
          id="buttonText"
          placeholder="View Options"
          value={buttonText}
          onChange={(e) => setButtonText(e.target.value)}
          required
        />
      </div>
    </ApiFormBase>
  );
};
