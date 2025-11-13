import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FetchProfileForm } from "@/components/forms/FetchProfileForm";
import { UpdateProfileNameForm } from "@/components/forms/UpdateProfileNameForm";
import { UpdateProfileStatusForm } from "@/components/forms/UpdateProfileStatusForm";
import { UpdateProfilePictureForm } from "@/components/forms/UpdateProfilePictureForm";
import { PrivacySettingsForm } from "@/components/forms/PrivacySettingsForm";

interface ProfileSectionProps {
  config: {
    baseUrl: string;
    instance: string;
    apiKey: string;
  };
}

export const ProfileSection = ({ config }: ProfileSectionProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Profile Settings</h2>
        <p className="text-muted-foreground">Manage profile information and privacy settings</p>
      </div>

      <Tabs defaultValue="fetch" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="fetch">Fetch Profile</TabsTrigger>
          <TabsTrigger value="name">Update Name</TabsTrigger>
          <TabsTrigger value="status">Update Status</TabsTrigger>
          <TabsTrigger value="picture">Update Picture</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
        </TabsList>

        <TabsContent value="fetch">
          <FetchProfileForm config={config} />
        </TabsContent>

        <TabsContent value="name">
          <UpdateProfileNameForm config={config} />
        </TabsContent>

        <TabsContent value="status">
          <UpdateProfileStatusForm config={config} />
        </TabsContent>

        <TabsContent value="picture">
          <UpdateProfilePictureForm config={config} />
        </TabsContent>

        <TabsContent value="privacy">
          <PrivacySettingsForm config={config} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
