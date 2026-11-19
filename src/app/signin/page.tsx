
"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff, Heart } from "lucide-react";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8F7F2] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        <div className="text-center mb-8">
          <div className="text-4xl mb-3">💍</div>
          <h1 className="text-3xl font-bold text-[#245C45]">
            Welcome Back!
          </h1>
          <p className="text-gray-500 mt-2">
            Sign in to continue planning your special day.
          </p>
        </div>

        <form className="space-y-5">
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
                placeholder="Enter your password"
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
          </div>

          <button
            type="submit"
            className="w-full bg-[#245C45] text-white py-3 rounded-lg font-semibold hover:bg-[#173F31] transition"
          >
            Sign In
          </button>
        </form>

        <div className="relative my-6">
          <div className="border-t" />
          <span className="absolute left-1/2 -translate-x-1/2 -top-3 bg-white px-3 text-sm text-gray-400">
            OR
          </span>
        </div>

        <button
          type="button"
          className="w-full border py-3 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-50 transition"
        >
          <span className="font-bold text-lg">G</span>
          Continue with Google
        </button>

        <p className="text-center text-sm text-gray-600 mt-7">
          Dont have an account?{" "}
          <Link
            href="/signup"
            className="text-[#245C45] font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>

      </div>
    </div>
  );
}
