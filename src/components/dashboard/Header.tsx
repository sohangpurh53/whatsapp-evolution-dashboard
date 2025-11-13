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
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full"></span>
        </Button>
        <Button variant="ghost" size="icon">
          <Github className="w-5 h-5" />
        </Button>
      </div>
    </header>
  );
};
