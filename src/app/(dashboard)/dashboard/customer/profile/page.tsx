
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import ProfileForm from "@/components/dashboard/shared/profile-form";

export const instant = false;

const CustomerProfilePage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin");
  }

  if (session.user.role !== "customer") {
    redirect(`/dashboard/${session.user.role}`);
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#245C45]">
        Profile Settings
      </h1>

      <p className="mt-2 text-gray-600">
        Update your profile information.
      </p>

      <div className="mt-8">
        <ProfileForm
          user={{
            name: session.user.name || "",
            email: session.user.email,
            image: session.user.image,
            role: session.user.role,
          }}
        />
      </div>
    </div>
  );
};

export default CustomerProfilePage;
