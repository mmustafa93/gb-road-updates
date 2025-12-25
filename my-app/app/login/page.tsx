"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import Logo from "@/components/Logo";
import { signInWithGoogle, signInWithFacebook } from "@/lib/auth/oauth";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.push("/");
  }

  async function handleGoogleLogin() {
    setLoading(true);
    setError(null);

    const { error } = await signInWithGoogle();

    if (error) {
      setError(error.message);
      setLoading(false);
    }
    // On success, Supabase handles redirect
  }

  async function handleFacebookLogin() {
  setLoading(true);
  setError(null);

  const { error } = await signInWithFacebook();

  if (error) {
    setError(error.message);
    setLoading(false);
  }
  // On success, Supabase handles redirect
}

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white px-4 gap-6">
      <Logo />

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

        {/* Email Login */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="
                mt-1 w-full rounded-md border px-3 py-2 text-sm
                focus:outline-none focus:ring-2 focus:ring-blue-400
              "
            />
          </div>

          {error && (
            <p className="text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="
              mt-2 w-full bg-[#4a90d9] text-white
              rounded-md py-2 text-sm font-semibold
              hover:opacity-90 transition
              disabled:opacity-60
            "
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-500">OR</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

         {/* Google Login */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="
            w-full my-3 flex items-center justify-center gap-3
            border rounded-md px-4 py-2
            text-sm font-medium text-[#1a1a1a]
            hover:bg-gray-100 transition
            disabled:opacity-60
          "
        >
          <img
            src="/icons8-google.svg"
            alt="Google logo"
            className="w-4 h-4"
          />
          Continue with Google
        </button>

        {/* Facebook Login */}
        <button
        type="button"
        onClick={handleFacebookLogin}
        disabled={loading}
        className="
            w-full flex items-center justify-center gap-3
            border rounded-md px-4 py-2
            text-sm font-medium text-[#1a1a1a]
            hover:bg-gray-100 transition
            disabled:opacity-60
        "
        >
        <img
            src="/icons8-facebook.svg"
            alt="Facebook logo"
            className="w-4 h-4"
        />
        Continue with Facebook
        </button>

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