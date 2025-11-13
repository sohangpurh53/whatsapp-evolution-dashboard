import { MessageSquare, Send, Settings, User, Users } from "lucide-react";
import { ActiveSection } from "@/pages/Index";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeSection: ActiveSection;
  onSectionChange: (section: ActiveSection) => void;
}

export const Sidebar = ({ activeSection, onSectionChange }: SidebarProps) => {
  const menuItems = [
    { id: "config" as ActiveSection, label: "Configuration", icon: Settings },
    { id: "send-message" as ActiveSection, label: "Send Message", icon: Send },
    { id: "chat" as ActiveSection, label: "Chat", icon: MessageSquare },
    { id: "profile" as ActiveSection, label: "Profile", icon: User },
    { id: "group" as ActiveSection, label: "Group", icon: Users },
  ];

  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col">
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-bold text-lg">WhatsApp API</h1>
            <p className="text-xs text-muted-foreground">Evolution Cloud</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onSectionChange(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
                    activeSection === item.id
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-foreground hover:bg-accent"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-border">
        <div className="px-4 py-3 bg-accent rounded-lg">
          <p className="text-xs font-medium text-accent-foreground">Evolution API v2.0</p>
          <p className="text-xs text-muted-foreground mt-1">Full WhatsApp Integration</p>
        </div>
      </div>
    </aside>
  );
};
