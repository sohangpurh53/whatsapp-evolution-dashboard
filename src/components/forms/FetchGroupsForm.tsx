import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ApiFormBase } from "./ApiFormBase";

interface FetchGroupsFormProps {
  config: { baseUrl: string; instance: string; apiKey: string };
}

export const FetchGroupsForm = ({ config }: FetchGroupsFormProps) => {
  const [getParticipants, setGetParticipants] = useState(false);

  const handleSubmit = async () => {
    const response = await fetch(
      `${config.baseUrl}/group/fetchAllGroups/${config.instance}?getParticipants=${getParticipants}`,
      {
        method: "GET",
        headers: {
          apikey: config.apiKey,
        },
      }
    );
    return response.json();
  };

  return (
    <ApiFormBase
      title="Fetch All Groups"
      description="Get a list of all groups you're part of"
      onSubmit={handleSubmit}
      config={config}
    >
      <div className="flex items-center space-x-2">
        <Checkbox
          id="getParticipants"
          checked={getParticipants}
          onCheckedChange={(checked) => setGetParticipants(checked as boolean)}
        />
        <Label htmlFor="getParticipants">Include participants</Label>
      </div>
    </ApiFormBase>
  );
};
