"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export default function SignupPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    // Redirect to login after successful signup
    router.push("/login");
  };

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md border rounded-md p-6 bg-white">
        <h1 className="text-xl font-bold text-[#1a1a1a]">
          Create an account
        </h1>

        <p className="mt-1 text-sm text-gray-600">
          Join to help report and verify road conditions.
        </p>

        <form
          className="mt-6 flex flex-col gap-4"
          onSubmit={handleSignup}
        >
          {/* Full name */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Full name
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Your name"
              className="w-full border rounded-md px-3 py-2 text-sm"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full border rounded-md px-3 py-2 text-sm"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              className="w-full border rounded-md px-3 py-2 text-sm"
            />
          </div>

          {/* Confirm password */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Confirm password
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              className="w-full border rounded-md px-3 py-2 text-sm"
            />
          </div>

          {/* Error message */}
          {error && (
            <p className="text-sm text-[#D9524A]">
              {error}
            </p>
          )}

          {/* Sign up button */}
          <button
            type="submit"
            disabled={loading}
            className="
              mt-2 bg-[#4a90d9] text-white
              font-bold text-sm
              px-4 py-2 rounded-md
              hover:opacity-90 transition
              disabled:opacity-60
            "
          >
            {loading ? "Creating account..." : "Sign up"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px bg-gray-200 flex-1" />
          <span className="text-xs text-gray-400">OR</span>
          <div className="h-px bg-gray-200 flex-1" />
        </div>

        {/* Google signup (wire later) */}
        <button
          className="
            w-full border border-gray-300
            text-sm font-medium
            px-4 py-2 rounded-md
            hover:bg-gray-100 transition
          "
        >
          Continue with Google
        </button>

        {/* Login link */}
        <p className="mt-6 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-[#4a90d9] hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}