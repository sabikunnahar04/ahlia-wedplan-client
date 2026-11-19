
import React from "react";
import DashboardSidebar from "@/components/dashboard/shared/DashboardSidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <DashboardSidebar role="customer" />

      <SidebarInset>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
