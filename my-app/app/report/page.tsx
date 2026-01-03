"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import Logo from "@/components/Logo";

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

  useEffect(() => {
    async function loadReports() {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const { data, error } = await supabase
        .from("road_reports")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setReports(data);
      }

      setLoading(false);
    }

    loadReports();
  }, [router]);

  return (
    <main className="min-h-screen bg-white px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Logo />

        <h1 className="text-xl font-bold mt-6 mb-4">
          My Road Reports
        </h1>

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
    </main>
  );
}