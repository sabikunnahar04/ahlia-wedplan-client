
import React from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import DashboardSidebar from "@/components/dashboard/shared/DashboardSidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export const instant = false;

const DashboardLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin");
  }

  const role = session.user.role as "customer" | "vendor" | "admin";

  return (
    <SidebarProvider>
      <DashboardSidebar role={role} />

      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
