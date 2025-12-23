"use client";

import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-sm border p-6">
        
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-[#1a1a1a]">
            Welcome back
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Sign in to report road conditions
          </p>
        </div>

        {/* Google Login */}
        <button
          className="
            w-full flex items-center justify-center gap-3
            border rounded-md px-4 py-2
            text-sm font-medium text-[#1a1a1a]
            hover:bg-gray-100 transition
          "
        >
          <span className="text-lg">🔵</span>
          Continue with Google
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-500">OR</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Email Login */}
        <form className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="
                mt-1 w-full rounded-md border px-3 py-2 text-sm
                focus:outline-none focus:ring-2 focus:ring-blue-400
              "
            />
          </div>

          <div>
            <label className="text-xs font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="
                mt-1 w-full rounded-md border px-3 py-2 text-sm
                focus:outline-none focus:ring-2 focus:ring-blue-400
              "
            />
          </div>

          <button
            type="submit"
            className="
              mt-2 w-full bg-[#4a90d9] text-white
              rounded-md py-2 text-sm font-semibold
              hover:opacity-90 transition
            "
          >
            Sign in
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link
            href="/signup"
            className="text-[#4a90d9] font-medium hover:underline"
          >
            Create one
          </Link>
        </div>

        <div className="mt-4 text-center">
          <Link
            href="/"
            className="text-xs text-gray-500 hover:underline"
          >
            ← Back to road updates
          </Link>
        </div>
      </div>
    </main>
  );
}