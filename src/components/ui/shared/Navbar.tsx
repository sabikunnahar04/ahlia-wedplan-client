
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex h-20 items-center justify-between">

       
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

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
