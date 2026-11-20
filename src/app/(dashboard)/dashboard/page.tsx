
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import type { TUserRole } from "@/types";

const DashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin");
  }

  const role = session.user.role as TUserRole;

  if (role === "customer") {
    redirect("/dashboard/customer");
  }

  if (role === "vendor") {
    redirect("/dashboard/vendor");
  }

  if (role === "admin") {
    redirect("/dashboard/admin");
  }
};

export default DashboardPage;
