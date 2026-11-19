
import Link from "next/link";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import NavbarActions from "./NavbarActions";


const Navbar = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <nav className="sticky top-0 z-50 border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex h-20 items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-3xl">💍</span>
            <span className="text-2xl font-bold text-[#245C45]">
              WedPlan
            </span>
          </Link>

          
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-[#245C45]"
            >
              Home
            </Link>

            <Link
              href="/services"
              className="text-gray-700 hover:text-[#245C45]"
            >
              Browse Services
            </Link>
          </div>

          
          <NavbarActions session={session} />

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
