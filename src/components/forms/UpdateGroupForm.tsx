import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ApiFormBase } from "./ApiFormBase";

interface UpdateGroupFormProps {
  config: { baseUrl: string; instance: string; apiKey: string };
}

export const UpdateGroupForm = ({ config }: UpdateGroupFormProps) => {
  const [groupJid, setGroupJid] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");
  const [activeTab, setActiveTab] = useState("subject");

  const handleSubmit = async () => {
    let endpoint = "";
    let body: any = {};

    if (activeTab === "subject") {
      endpoint = "updateGroupSubject";
      body = { subject };
    } else if (activeTab === "description") {
      endpoint = "updateGroupDescription";
      body = { description };
    } else {
      endpoint = "updateGroupPicture";
      body = { image: pictureUrl };
    }

    const response = await fetch(
      `${config.baseUrl}/group/${endpoint}/${config.instance}?groupJid=${groupJid}`,
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
    <div className="space-y-4">
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

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="subject">Name</TabsTrigger>
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="picture">Picture</TabsTrigger>
        </TabsList>

        <TabsContent value="subject">
          <ApiFormBase
            title="Update Group Name"
            description="Change the group's subject/name"
            onSubmit={handleSubmit}
            config={config}
          >
            <div className="space-y-2">
              <Label htmlFor="subject">New Group Name</Label>
              <Input
                id="subject"
                placeholder="Updated Group Name"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>
          </ApiFormBase>
        </TabsContent>

        <TabsContent value="description">
          <ApiFormBase
            title="Update Group Description"
            description="Change the group's description"
            onSubmit={handleSubmit}
            config={config}
          >
            <div className="space-y-2">
              <Label htmlFor="description">New Description</Label>
              <Textarea
                id="description"
                placeholder="Updated group description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                required
              />
            </div>
          </ApiFormBase>
        </TabsContent>

        <TabsContent value="picture">
          <ApiFormBase
            title="Update Group Picture"
            description="Change the group's profile picture"
            onSubmit={handleSubmit}
            config={config}
          >
            <div className="space-y-2">
              <Label htmlFor="pictureUrl">Picture URL</Label>
              <Input
                id="pictureUrl"
                placeholder="https://example.com/image.jpg"
                value={pictureUrl}
                onChange={(e) => setPictureUrl(e.target.value)}
                required
              />
            </div>
          </ApiFormBase>
        </TabsContent>
      </Tabs>
    </div>
  );
};
