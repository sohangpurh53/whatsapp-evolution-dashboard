import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateGroupForm } from "@/components/forms/CreateGroupForm";
import { UpdateGroupForm } from "@/components/forms/UpdateGroupForm";
import { FetchGroupsForm } from "@/components/forms/FetchGroupsForm";
import { GroupParticipantsForm } from "@/components/forms/GroupParticipantsForm";
import { GroupSettingsForm } from "@/components/forms/GroupSettingsForm";

interface GroupSectionProps {
  config: {
    baseUrl: string;
    instance: string;
    apiKey: string;
  };
}

export const GroupSection = ({ config }: GroupSectionProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Group Management</h2>
        <p className="text-muted-foreground">Create and manage WhatsApp groups</p>
      </div>

      <Tabs defaultValue="create" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="create">Create</TabsTrigger>
          <TabsTrigger value="update">Update</TabsTrigger>
          <TabsTrigger value="fetch">Fetch Groups</TabsTrigger>
          <TabsTrigger value="participants">Participants</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="create">
          <CreateGroupForm config={config} />
        </TabsContent>

        <TabsContent value="update">
          <UpdateGroupForm config={config} />
        </TabsContent>

        <TabsContent value="fetch">
          <FetchGroupsForm config={config} />
        </TabsContent>

        <TabsContent value="participants">
          <GroupParticipantsForm config={config} />
        </TabsContent>

        <TabsContent value="settings">
          <GroupSettingsForm config={config} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
