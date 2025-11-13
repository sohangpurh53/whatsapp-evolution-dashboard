import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { ConfigSection } from "@/components/dashboard/ConfigSection";
import { SendMessageSection } from "@/components/dashboard/SendMessageSection";
import { ChatSection } from "@/components/dashboard/ChatSection";
import { ProfileSection } from "@/components/dashboard/ProfileSection";
import { GroupSection } from "@/components/dashboard/GroupSection";

export type ActiveSection = "config" | "send-message" | "chat" | "profile" | "group";

const Index = () => {
  const [activeSection, setActiveSection] = useState<ActiveSection>("config");
  const [config, setConfig] = useState({
    baseUrl: "https://api.evoapicloud.com",
    instance: "",
    apiKey: "",
  });

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      
      <div className="flex-1 flex flex-col">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {activeSection === "config" && (
              <ConfigSection config={config} setConfig={setConfig} />
            )}
            {activeSection === "send-message" && (
              <SendMessageSection config={config} />
            )}
            {activeSection === "chat" && (
              <ChatSection config={config} />
            )}
            {activeSection === "profile" && (
              <ProfileSection config={config} />
            )}
            {activeSection === "group" && (
              <GroupSection config={config} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
