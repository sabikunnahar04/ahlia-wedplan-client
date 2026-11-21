
"use client";

import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import Signout from "@/components/auth/Signout";

type NavbarActionsProps = {
   session: {
     user: {
       name: string;
       email: string;
       image?: string | null;
     };
   } | null;
};

const NavbarActions = ({ session }: NavbarActionsProps) => {
  if (!session) {
    return (
      <div className="flex items-center gap-3">
        <Link
          href="/signin"
          className="hidden sm:block px-4 py-2 text-[#245C45] font-medium"
        >
          Sign In
        </Link>

        <Link
          href="/signup"
          className="rounded-lg bg-[#245C45] px-5 py-2.5 text-white hover:bg-[#173F31]"
        >
          Sign Up
        </Link>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-gray-100">
        <Avatar className="h-9 w-9">
          <AvatarImage src={session.user.image || ""} />
          <AvatarFallback>
            {session.user.name?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <span className="font-medium text-gray-700">
          {session.user.name}
        </span>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem>
          <Link href="/dashboard">Dashboard</Link>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Link href="/profile">Profile Settings</Link>
        </DropdownMenuItem>

        <Signout />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavbarActions;
