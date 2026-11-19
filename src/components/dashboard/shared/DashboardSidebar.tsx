
import Link from "next/link";
import {
  LayoutDashboard,
  CalendarCheck,
  BriefcaseBusiness,
  PlusCircle,
  ClipboardList,
  Crown,
  Users,
  ClipboardCheck,
  CreditCard,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import type { TUserRole } from "@/types";

type DashboardSidebarProps = {
  role: TUserRole;
};

const DashboardSidebar = ({ role }: DashboardSidebarProps) => {
  const customerLinks = [
    { title: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { title: "My Bookings", href: "/dashboard/bookings", icon: CalendarCheck },
  ];

  const vendorLinks = [
    { title: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { title: "My Services", href: "/dashboard/services", icon: BriefcaseBusiness },
    { title: "Add Service", href: "/dashboard/services/add", icon: PlusCircle },
    { title: "Booking Requests", href: "/dashboard/requests", icon: ClipboardList },
    { title: "Subscription", href: "/dashboard/subscription", icon: Crown },
  ];

  const adminLinks = [
    { title: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { title: "Manage Users", href: "/dashboard/users", icon: Users },
    { title: "Manage Services", href: "/dashboard/services", icon: ClipboardCheck },
    { title: "Transactions", href: "/dashboard/transactions", icon: CreditCard },
  ];

  const links =
    role === "customer"
      ? customerLinks
      : role === "vendor"
        ? vendorLinks
        : adminLinks;

  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/" className="flex items-center gap-2 px-2 py-3">
          <span className="text-3xl">💍</span>
          <span className="text-2xl font-bold text-[#245C45]">
            WedPlan
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            {role} Dashboard
          </SidebarGroupLabel>

          <SidebarMenu>
            {links.map((item) => {
              const Icon = item.icon;

              return (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    render={<Link href={item.href} />}
                  >
                    <Icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default DashboardSidebar;
