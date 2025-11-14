import { Bell, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Header = () => {
  return (
    <header className="h-16 border-b border-border bg-card px-6 flex items-center justify-between">
      <div>
        <h2 className="text-xl font-bold">API Dashboard</h2>
        <p className="text-sm text-muted-foreground">Manage your WhatsApp integrations</p>
      </div>

      <div className="flex items-center gap-3">
      
      </div>
    </header>
  );
};
