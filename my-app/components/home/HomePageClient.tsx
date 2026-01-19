"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/navbar/Navbar";
import RoadCard from "@/components/RoadCard";
import RoadStatusTicker from "../RoadStatusTicker";
import { supabase } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

interface Road {
  id: string;
  name: string;
  acronym: string;
  status: string;
  distance: string;
  sort_order: number;
}

export default function HomePageClient() {
  const [user, setUser] = useState<User | null>(null);
  const [roads, setRoads] = useState<Road[]>([]);
  const [loadingRoads, setLoadingRoads] = useState(true);
  const [authLoading, setAuthLoading] = useState(true);
  const [signingOut, setSigningOut] = useState(false);

  /* Auth handling */
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

  /* Fetch roads */
  useEffect(() => {
    async function fetchRoads() {
      setLoadingRoads(true);

      const { data, error } = await supabase
        .from("roads")
        .select("id, name, acronym, status, distance, sort_order")
        .order("sort_order", { ascending: true });

      if (!error && data) {
        setRoads(data);
      }

      setLoadingRoads(false);
    }

    fetchRoads();
  }, []);

  async function handleSignOut() {
    setSigningOut(true);
    await supabase.auth.signOut();
    setUser(null);
    setSigningOut(false);
  }

  return (
    <main className="min-h-screen bg-white px-4 py-6">
      {/* HEADER */}
      
        <Navbar
            user={user}
            authLoading={authLoading}
            signingOut={signingOut}
            onSignOut={handleSignOut}
            />
        

      {/* STATUS TICKER */}
      <section className="max-w-5xl mx-auto mb-6">
        <RoadStatusTicker />
      </section>

      {/* ROAD LIST */}
      <section className="min-h-screen max-w-5xl mx-auto flex flex-col gap-4">
        {loadingRoads ? (
          <p className="text-sm text-gray-500">Loading roads…</p>
        ) : (
          roads.map((road) => (
            <RoadCard
              key={road.id}
              road={road}
              user={user}
              disabled={signingOut || !user}
            />
          ))
        )}
      </section>

      {/* FOOTER */}
      <footer className="max-w-5xl mx-auto mt-10 text-[12px] text-gray-500">
        Not an official government source. Information is community reported.
      </footer>
    </main>
  );
}