"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import type { User } from "@supabase/supabase-js";

type NavbarProps = {
  user: User | null;
  authLoading: boolean;
  signingOut: boolean;
  onSignOut: () => void;
};

export default function Navbar({
  user,
  authLoading,
  signingOut,
  onSignOut,
}: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="w-full border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* LEFT */}
        <div className="flex flex-col">
          <Logo />
          <p className="text-[11px] sm:text-[12px] text-gray-600 mt-0.5">
            Powered by community reports
          </p>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Loading / Signing Out states */}
          {authLoading ? (
            <p className="text-sm text-gray-500 font-medium">Loading…</p>
          ) : signingOut ? (
            <p className="text-sm text-gray-500 font-medium">Signing out…</p>
          ) : user ? (
            <>
              {/* Desktop / Tablet buttons */}
              <div className="hidden md:flex items-center gap-2 sm:gap-4">
                {/* Greeting (hide below 900px) */}
                <p className="hidden lg:block text-sm text-gray-700 font-medium">
                  Hello{" "}
                  <span className="font-semibold">
                    {user.user_metadata?.full_name || "there"}
                  </span>
                  !
                </p>

                <Link
                  href="/report"
                  className="text-sm font-medium px-3 py-1.5 sm:px-4 sm:py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                  My Reports
                </Link>

                <button
                  onClick={onSignOut}
                  className="text-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                >
                  Sign out
                </button>
              </div>

              {/* Mobile Hamburger (below 520px) */}
              <div className="md:hidden">
                <button
                  onClick={toggleMenu}
                  className="p-2 rounded-md border border-gray-300 hover:bg-gray-100 transition"
                >
                  {/* Hamburger icon */}
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>

                {/* Mobile Menu Dialog */}
                {isMenuOpen && (
                  <div className="absolute top-16 right-4 w-64 bg-white shadow-lg rounded-md border border-gray-200 p-4 z-50 flex flex-col gap-3">
                    <p className="text-sm text-gray-700 font-medium">
                      Hello{" "}
                      <span className="font-semibold">
                        {user.user_metadata?.full_name || "there"}
                      </span>
                      !
                    </p>
                    <Link
                      href="/report"
                      className="text-sm font-medium px-3 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      My Reports
                    </Link>
                    <button
                      onClick={() => {
                        onSignOut();
                        setIsMenuOpen(false);
                      }}
                      className="text-sm px-3 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            // User not logged in
            <Link
              href="/login"
              className="text-sm font-medium px-3 py-1.5 sm:px-4 sm:py-2 rounded-md border border-gray-300 text-[#1a1a1a] hover:bg-gray-100 transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}