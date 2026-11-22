
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

export const instant = false;

const ProfilePage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin");
  }

  if (session.user.role === "vendor") {
    redirect("/dashboard/vendor/profile");
  }

  if (session.user.role === "customer") {
    redirect("/dashboard/customer/profile");
  }

  redirect("/dashboard/admin");
};

export default ProfilePage;
