import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SendTextForm } from "@/components/forms/SendTextForm";
import { SendMediaForm } from "@/components/forms/SendMediaForm";
import { SendLocationForm } from "@/components/forms/SendLocationForm";
import { SendContactForm } from "@/components/forms/SendContactForm";
import { SendPollForm } from "@/components/forms/SendPollForm";
import { SendListForm } from "@/components/forms/SendListForm";
import { SendButtonForm } from "@/components/forms/SendButtonForm";
import { SendStickerForm } from "@/components/forms/SendStickerForm";
import { SendReactionForm } from "@/components/forms/SendReactionForm";
import { SendStatusForm } from "@/components/forms/SendStatusForm";

interface SendMessageSectionProps {
  config: {
    baseUrl: string;
    instance: string;
    apiKey: string;
  };
}

export const SendMessageSection = ({ config }: SendMessageSectionProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Send Message</h2>
        <p className="text-muted-foreground">Send different types of messages via WhatsApp</p>
      </div>

      <Tabs defaultValue="text" className="w-full">
        <TabsList className="grid w-full grid-cols-5 lg:grid-cols-10">
          <TabsTrigger value="text">Text</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
          <TabsTrigger value="location">Location</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="poll">Poll</TabsTrigger>
          <TabsTrigger value="list">List</TabsTrigger>
          <TabsTrigger value="button">Button</TabsTrigger>
          <TabsTrigger value="sticker">Sticker</TabsTrigger>
          <TabsTrigger value="reaction">Reaction</TabsTrigger>
          <TabsTrigger value="status">Status</TabsTrigger>
        </TabsList>

        <TabsContent value="text">
          <SendTextForm config={config} />
        </TabsContent>

        <TabsContent value="media">
          <SendMediaForm config={config} />
        </TabsContent>

        <TabsContent value="location">
          <SendLocationForm config={config} />
        </TabsContent>

        <TabsContent value="contact">
          <SendContactForm config={config} />
        </TabsContent>

        <TabsContent value="poll">
          <SendPollForm config={config} />
        </TabsContent>

        <TabsContent value="list">
          <SendListForm config={config} />
        </TabsContent>

        <TabsContent value="button">
          <SendButtonForm config={config} />
        </TabsContent>

        <TabsContent value="sticker">
          <SendStickerForm config={config} />
        </TabsContent>

        <TabsContent value="reaction">
          <SendReactionForm config={config} />
        </TabsContent>

        <TabsContent value="status">
          <SendStatusForm config={config} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
