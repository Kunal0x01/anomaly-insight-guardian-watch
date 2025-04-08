
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  BarChart2, 
  Shield, 
  Users, 
  AlertTriangle, 
  Settings, 
  Home,
  FileText,
  Database,
  Search,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  to: string;
  isActive: boolean;
}

const SidebarItem = ({ icon: Icon, label, to, isActive }: SidebarItemProps) => (
  <Link to={to} className="w-full">
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start gap-3 font-normal h-10 px-4",
        isActive 
          ? "bg-sidebar-accent text-sidebar-accent-foreground" 
          : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
      )}
    >
      <Icon size={18} />
      <span>{label}</span>
    </Button>
  </Link>
);

const DashboardSidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const mainNavItems = [
    { icon: Home, label: "Dashboard", to: "/" },
    { icon: Users, label: "Users & Entities", to: "/users" },
    { icon: AlertTriangle, label: "Alerts", to: "/alerts" },
    { icon: BarChart2, label: "Analytics", to: "/analytics" },
    { icon: Shield, label: "Investigation", to: "/investigation" },
  ];

  const secondaryNavItems = [
    { icon: FileText, label: "Reports", to: "/reports" },
    { icon: Database, label: "Data Management", to: "/data" },
    { icon: Search, label: "Search", to: "/search" },
    { icon: Settings, label: "Settings", to: "/settings" },
  ];

  return (
    <div className="w-64 h-screen bg-sidebar flex flex-col border-r border-sidebar-border">
      <div className="p-4 flex items-center gap-3">
        <img 
          src="/lovable-uploads/6e782c53-fa7e-4c3f-aead-07f8c92884a5.png" 
          alt="Open UEBA Logo" 
          className="h-10 w-auto" 
        />
        <h1 className="text-xl font-semibold text-sidebar-foreground">Open<span className="text-primary">UEBA</span></h1>
      </div>

      <div className="flex flex-col flex-1 px-2 py-4 gap-1 overflow-auto">
        <div className="mb-2">
          <p className="px-4 text-xs font-semibold text-sidebar-foreground/50 mb-2 uppercase tracking-wider">
            Main
          </p>
          {mainNavItems.map((item) => (
            <SidebarItem
              key={item.to}
              icon={item.icon}
              label={item.label}
              to={item.to}
              isActive={currentPath === item.to}
            />
          ))}
        </div>

        <div className="mb-2">
          <p className="px-4 text-xs font-semibold text-sidebar-foreground/50 mb-2 uppercase tracking-wider">
            Tools
          </p>
          {secondaryNavItems.map((item) => (
            <SidebarItem
              key={item.to}
              icon={item.icon}
              label={item.label}
              to={item.to}
              isActive={currentPath === item.to}
            />
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-sidebar-border mt-auto">
        <Button variant="ghost" className="w-full justify-start gap-3 text-sidebar-foreground/70 hover:text-sidebar-foreground">
          <LogOut size={18} />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  );
};

export default DashboardSidebar;
