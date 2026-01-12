"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import RoadCard from "@/components/RoadCard";
import RoadStatusTicker from "../RoadStatusTicker";
import { roads } from "@/data/roads";
import { supabase } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

export default function HomePageClient() {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ?? null);
      setAuthLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  async function handleSignOut() {
    setSigningOut(true);
    await supabase.auth.signOut();
    setUser(null);
    setSigningOut(false);
  }

  return (
    <main className="min-h-screen bg-white px-4 py-6">
      <header className="max-w-5xl mx-auto mb-6 flex items-center justify-between">
        <div className="flex flex-col">
          <Logo />
          <p className="text-[12px] text-gray-600 max-w-md">
            Real-time community-led road conditions for Gilgit-Baltistan
          </p>
        </div>

        {authLoading ? (
          <p className="text-sm text-gray-500 font-medium">Loading details…</p>
        ) : signingOut ? (
          <p className="text-sm text-gray-500 font-medium">Signing out…</p>
        ) : user ? (
          <div className="flex items-center gap-4">
            <p className="text-sm text-gray-700 font-medium">
              Hello{" "}
              <span className="font-semibold">
                {user.user_metadata?.full_name || "there"}
              </span>
              !
            </p>

            <Link
              href="/report"
              className="
                text-sm font-medium px-4 py-2 rounded-md
                bg-blue-600 text-white
                hover:bg-blue-700 transition
              "
            >
              My Reports
            </Link>

            <button
              onClick={handleSignOut}
              className="
                text-sm px-3 py-1.5 rounded-md
                border border-gray-300
                text-gray-700
                hover:bg-gray-100 transition
              "
            >
              Sign out
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            className="
              text-sm font-medium px-4 py-2 rounded-md
              border border-gray-300
              text-[#1a1a1a]
              hover:bg-gray-100 transition
            "
          >
            Sign in / Sign up
          </Link>
        )}
      </header>
      <section className="max-w-5xl mx-auto mb-6">
        <RoadStatusTicker />
      </section>
      <section className="max-w-5xl mx-auto flex flex-col gap-4">
        {roads.map((road) => (
          <RoadCard
            key={road.id}
            road={road}
            user={user}
            disabled={signingOut || !user}
          />
        ))}
      </section>

      <footer className="max-w-5xl mx-auto mt-10 text-[12px] text-gray-500">
        Not an official government source. Information is community reported.
      </footer>
    </main>
  );
}