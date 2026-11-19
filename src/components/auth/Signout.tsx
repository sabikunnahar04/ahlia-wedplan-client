
"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export default function Signout() {
  const router = useRouter();

  const handleSignout = async () => {
    const { error } = await authClient.signOut();

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Logged out successfully!");
    router.push("/");
    router.refresh();
  };

  return (
    <DropdownMenuItem
      onClick={handleSignout}
      className="cursor-pointer text-red-600"
    >
      Sign Out
    </DropdownMenuItem>
  );
}
