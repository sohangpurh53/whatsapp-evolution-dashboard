import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckNumberForm } from "@/components/forms/CheckNumberForm";
import { ReadMessagesForm } from "@/components/forms/ReadMessagesForm";
import { ArchiveChatForm } from "@/components/forms/ArchiveChatForm";
import { DeleteMessageForm } from "@/components/forms/DeleteMessageForm";
import { FindContactsForm } from "@/components/forms/FindContactsForm";
import { FindMessagesForm } from "@/components/forms/FindMessagesForm";
import { SendPresenceForm } from "@/components/forms/SendPresenceForm";
import { UpdateBlockForm } from "@/components/forms/UpdateBlockForm";

interface ChatSectionProps {
  config: {
    baseUrl: string;
    instance: string;
    apiKey: string;
  };
}

export const ChatSection = ({ config }: ChatSectionProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Chat Management</h2>
        <p className="text-muted-foreground">Manage chats, messages, and contacts</p>
      </div>

      <Tabs defaultValue="check" className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
          <TabsTrigger value="check">Check Number</TabsTrigger>
          <TabsTrigger value="read">Read Messages</TabsTrigger>
          <TabsTrigger value="archive">Archive</TabsTrigger>
          <TabsTrigger value="delete">Delete</TabsTrigger>
          <TabsTrigger value="contacts">Contacts</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="presence">Presence</TabsTrigger>
          <TabsTrigger value="block">Block</TabsTrigger>
        </TabsList>

        <TabsContent value="check">
          <CheckNumberForm config={config} />
        </TabsContent>

        <TabsContent value="read">
          <ReadMessagesForm config={config} />
        </TabsContent>

        <TabsContent value="archive">
          <ArchiveChatForm config={config} />
        </TabsContent>

        <TabsContent value="delete">
          <DeleteMessageForm config={config} />
        </TabsContent>

        <TabsContent value="contacts">
          <FindContactsForm config={config} />
        </TabsContent>

        <TabsContent value="messages">
          <FindMessagesForm config={config} />
        </TabsContent>

        <TabsContent value="presence">
          <SendPresenceForm config={config} />
        </TabsContent>

        <TabsContent value="block">
          <UpdateBlockForm config={config} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
