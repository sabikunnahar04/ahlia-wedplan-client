
"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8F7F2] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        <div className="text-center mb-8">
          <div className="text-4xl mb-3">💍</div>
          <h1 className="text-3xl font-bold text-[#245C45]">
            Create Account
          </h1>
          <p className="text-gray-500 mt-2">
            Start planning your dream wedding with WedPlan.
          </p>
        </div>

        <form className="space-y-4">

          <div>
            <label className="block text-sm font-medium mb-2">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#245C45]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#245C45]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                className="w-full border rounded-lg px-4 py-3 pr-12 outline-none focus:ring-2 focus:ring-[#245C45]"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <p className="text-xs text-gray-400 mt-2">
              Minimum 6 characters, one uppercase and one lowercase letter.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Account Role
            </label>

            <select
              className="w-full border rounded-lg px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-[#245C45]"
              required
              defaultValue=""
            >
              <option value="" disabled>
                Select your role
              </option>
              <option value="customer">Customer</option>
              <option value="vendor">Vendor</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-[#245C45] text-white py-3 rounded-lg font-semibold hover:bg-[#173F31] transition"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-7">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="text-[#245C45] font-semibold hover:underline"
          >
            Sign In
          </Link>
        </p>

      </div>
    </div>
  );
}
