
import React from "react";
import DashboardSidebar from "./DashboardSidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <DashboardSidebar />
      <main className="flex-1 overflow-auto p-6">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
