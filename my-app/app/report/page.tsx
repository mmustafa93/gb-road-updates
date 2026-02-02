"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import Navbar from "@/components/navbar/Navbar";
import RoadStatusTicker from "@/components/RoadStatusTicker";

type RoadReport = {
  id: string;
  road_name: string;
  nearest_town: string;
  blocked_duration: string;
  cause: string;
  created_at: string;
};

export default function MyReportsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState<RoadReport[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    async function loadReports() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login?next=/report");
        return;
      }

      setUser(user);
      setAuthLoading(false);

      const { data, error } = await supabase
        .from("road_reports")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (!error && data) {
        setReports(data);
      }

      setLoading(false);
    }

    loadReports();
  }, [router]);

  async function handleSignOut() {
    setSigningOut(true);
    await supabase.auth.signOut();
    setUser(null);
    setSigningOut(false);
    router.push("/");
  }

  return (
    <main className="min-h-screen bg-white px-4 py-6">
      <Navbar
        user={user}
        authLoading={authLoading}
        signingOut={signingOut}
        onSignOut={handleSignOut}
      />

      <section className="max-w-5xl mx-auto mb-6">
        <RoadStatusTicker />
      </section>

      <section className="max-w-5xl mx-auto flex flex-col gap-4">
        <div className="max-w-xl mx-auto w-full">
          <div className="border rounded-md bg-white overflow-hidden">
            <div className="px-5 py-4 border-b bg-gray-50">
              <h1 className="text-[18px] font-bold text-[#1a1a1a]">
                My Road Reports
              </h1>
            </div>

            <div className="px-5 py-5">
              {loading ? (
                <p className="text-sm text-gray-500">Loading your reports…</p>
              ) : reports.length === 0 ? (
                <p className="text-sm text-gray-500">
                  You haven’t submitted any reports yet.
                </p>
              ) : (
                <div className="space-y-4">
                  {reports.map((report) => (
                    <div
                      key={report.id}
                      className="border rounded-md p-4 bg-white"
                    >
                      <p className="font-semibold text-[#1a1a1a]">
                        {report.road_name}
                      </p>

                      <p className="text-sm text-gray-600 mt-1">
                        Near: {report.nearest_town}
                      </p>

                      <p className="text-sm text-gray-600">
                        Blocked: {report.blocked_duration}
                      </p>

                      <p className="text-sm text-gray-600">
                        Cause: {report.cause}
                      </p>

                      <p className="text-xs text-gray-400 mt-2">
                        Submitted on{" "}
                        {new Date(report.created_at).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}