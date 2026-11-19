"use client";

import { useState } from "react";
import { authClient, signUp } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";

export default function SignupForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"customer" | "vendor">("customer");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

  const { data, error } = await signUp.email({
  name,
  email,
  password,
  role,
  callbackURL: "/",
});

console.log({data,error});

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }
    toast.success("Account created successfully!");

   router.push("/");
router.refresh();
    setLoading(false);
  };

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

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#245C45]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#245C45]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              className="w-full border rounded-lg px-4 py-3"
              required
            />
            <p className="text-xs text-gray-400 mt-2">
              Minimum 6 characters, one uppercase and one lowercase letter.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Account Role</label>
            <select
              value={role}
             onChange={(e) =>
  setRole(e.target.value as "customer" | "vendor")
}
              className="w-full border rounded-lg px-4 py-3 bg-white"
            >
              <option value="customer">Customer</option>
              <option value="vendor">Vendor</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#245C45] text-white py-3 rounded-lg font-semibold hover:bg-[#173F31] transition disabled:opacity-60"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-7">
          Already have an account?{" "}
          <Link href="/signin" className="text-[#245C45] font-semibold">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}