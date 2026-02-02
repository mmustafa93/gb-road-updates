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
  status: "pending" | "verified" | "incorrect";
};

export default function MyReportsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState<RoadReport[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [signingOut, setSigningOut] = useState(false);

  // Placeholder for admin check
  const isAdmin = user?.email?.endsWith("@admin.com");

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

      const query = supabase.from("road_reports").select("*");

      if (!isAdmin) {
        query.eq("user_id", user.id);
      }

      const { data, error } = await query.order("created_at", {
        ascending: false,
      });

      if (!error && data) {
        setReports(data as RoadReport[]);
      }

      setLoading(false);
    }

    loadReports();
  }, [router, isAdmin]);

  async function handleSignOut() {
    setSigningOut(true);
    await supabase.auth.signOut();
    setUser(null);
    setSigningOut(false);
    router.push("/");
  }

  async function handleUpdateStatus(
    reportId: string,
    newStatus: "verified" | "incorrect"
  ) {
    const { error } = await supabase
      .from("road_reports")
      .update({ status: newStatus })
      .eq("id", reportId);

    if (!error) {
      setReports((prevReports) =>
        prevReports.map((report) =>
          report.id === reportId ? { ...report, status: newStatus } : report
        )
      );
    } else {
      console.error("Error updating report status:", error);
    }
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
                {isAdmin ? "All Road Reports" : "My Road Reports"}
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
                      <div className="flex justify-between items-start">
                        <p className="font-semibold text-[#1a1a1a]">
                          {report.road_name}
                        </p>
                        <span
                          className={`text-xs font-bold px-2 py-1 rounded-full ${
                            report.status === "pending"
                              ? "bg-yellow-200 text-yellow-800"
                              : report.status === "verified"
                              ? "bg-green-200 text-green-800"
                              : "bg-red-200 text-red-800"
                          }`}
                        >
                          {report.status}
                        </span>
                      </div>

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
                      {isAdmin && report.status === "pending" && (
                        <div className="flex gap-2 mt-4">
                          <button
                            onClick={() =>
                              handleUpdateStatus(report.id, "verified")
                            }
                            className="text-sm bg-green-500 text-white px-3 py-1 rounded-md"
                          >
                            Verify
                          </button>
                          <button
                            onClick={() =>
                              handleUpdateStatus(report.id, "incorrect")
                            }
                            className="text-sm bg-red-500 text-white px-3 py-1 rounded-md"
                          >
                            Incorrect
                          </button>
                        </div>
                      )}
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