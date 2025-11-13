import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { ApiFormBase } from "./ApiFormBase";

interface SendPollFormProps {
  config: { baseUrl: string; instance: string; apiKey: string };
}

export const SendPollForm = ({ config }: SendPollFormProps) => {
  const [number, setNumber] = useState("");
  const [pollName, setPollName] = useState("");
  const [options, setOptions] = useState(["", ""]);

  const addOption = () => setOptions([...options, ""]);
  const removeOption = (index: number) => setOptions(options.filter((_, i) => i !== index));
  const updateOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async () => {
    const response = await fetch(
      `${config.baseUrl}/message/sendPoll/${config.instance}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: config.apiKey,
        },
        body: JSON.stringify({
          number,
          name: pollName,
          selectableCount: 1,
          values: options.filter((o) => o.trim()),
        }),
      }
    );
    return response.json();
  };

  return (
    <ApiFormBase
      title="Send Poll"
      description="Create and send a poll with multiple options"
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
        <Label htmlFor="pollName">Poll Question</Label>
        <Input
          id="pollName"
          placeholder="What's your favorite color?"
          value={pollName}
          onChange={(e) => setPollName(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label>Options</Label>
        {options.map((option, index) => (
          <div key={index} className="flex gap-2">
            <Input
              placeholder={`Option ${index + 1}`}
              value={option}
              onChange={(e) => updateOption(index, e.target.value)}
              required
            />
            {options.length > 2 && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeOption(index)}
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        ))}
        <Button type="button" variant="outline" size="sm" onClick={addOption}>
          <Plus className="w-4 h-4 mr-2" />
          Add Option
        </Button>
      </div>
    </ApiFormBase>
  );
};
