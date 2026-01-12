"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase/client";

const STATUS_STYLES: Record<string, { text: string; bg: string }> = {
  open: { text: "#4a90d9", bg: "rgba(74,144,217,0.1)" },
  delays: { text: "#F8B328", bg: "rgba(248,179,40,0.15)" },
  closed: { text: "#D9524A", bg: "rgba(217,82,74,0.12)" },
};

interface RoadCardProps {
  road: {
    id: string;
    name: string;
    status: string;
    distance?: string;
  };
  user: User | null;
  disabled?: boolean;
}

interface RoadSegment {
  id: string;
  title: string;
  distance: string;
  google_eta: string;
  status: string;
  status_note: string;
  sequence_order: number;
}

export default function RoadCard({ road, user, disabled }: RoadCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [segments, setSegments] = useState<RoadSegment[]>([]);
  const [loadingSegments, setLoadingSegments] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [countdown, setCountdown] = useState(5);

  const router = useRouter();
  const style = STATUS_STYLES[road.status] ?? STATUS_STYLES.open;

  /* Fetch road segments when expanded */
  useEffect(() => {
    if (!expanded) return;

    async function fetchSegments() {
      setLoadingSegments(true);

      const { data, error } = await supabase
        .from("road_segments")
        .select("*")
        .eq("road_id", road.id)
        .order("sequence_order", { ascending: true });

      if (!error && data) {
        setSegments(data);
      }

      setLoadingSegments(false);
    }

    fetchSegments();
  }, [expanded, road.id]);

  /* Countdown redirect logic */
  useEffect(() => {
    if (!redirecting) return;

    if (countdown === 0) {
      router.push("/login");
      return;
    }

    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [redirecting, countdown, router]);

  const handleReportClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (disabled) return;

    if (user) {
      router.push(`/report/${road.id}`);
    } else {
      setRedirecting(true);
      setCountdown(5);
    }
  };

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      className={`
        border rounded-md cursor-pointer
        transition-all duration-300 ease-in-out overflow-hidden
        ${expanded ? "max-h-[600px]" : "max-h-[110px]"}
      `}
    >
      {/* HEADER */}
      <div className="p-4 flex items-center justify-between">
        <div>
          <h2 className="text-[18px] font-bold text-[#1a1a1a]">
            {road.name}
          </h2>
          {road.distance && (
            <p className="text-[12px] text-gray-500 font-medium mt-1">
              Total distance: {road.distance} km
            </p>
          )}
        </div>

        <span
          className="text-[12px] font-bold px-3 py-1 rounded-full capitalize"
          style={{ color: style.text, backgroundColor: style.bg }}
        >
          {road.status}
        </span>
      </div>

      {/* EXPANDED CONTENT */}
      {expanded && (
        <div className="px-4 pb-4">
          {loadingSegments ? (
            <p className="text-sm text-gray-500">Loading segments…</p>
          ) : (
            <div className="flex flex-col gap-3 mt-2">
              {segments.map((segment) => (
                <div
                  key={segment.id}
                  className="border rounded-md p-3 bg-gray-50"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-semibold text-[#1a1a1a]">
                      {segment.title}
                    </h3>
                    <span
                      className="text-[11px] font-bold px-2 py-0.5 rounded-full capitalize"
                      style={{
                        color:
                          STATUS_STYLES[segment.status]?.text ?? "#555",
                        backgroundColor:
                          STATUS_STYLES[segment.status]?.bg ?? "#eee",
                      }}
                    >
                      {segment.status}
                    </span>
                  </div>

                  <p className="text-[13px] text-gray-700 mt-1">
                    {segment.status_note}
                  </p>

                  <p className="text-[12px] text-gray-500 mt-1">
                    Distance: {segment.distance} km · ETA: {segment.google_eta}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* REPORT BUTTON */}
          <div className="mt-4 flex flex-col items-start gap-2">
            <button
              onClick={handleReportClick}
              disabled={disabled}
              className={`
                text-sm font-bold px-4 py-2 rounded-md
                border border-[#D9524A] text-[#D9524A]
                hover:bg-[#D9524A] hover:text-white transition
                ${disabled ? "opacity-50 cursor-not-allowed" : ""}
              `}
            >
              Report Road Issue
            </button>

            {disabled && (
              <span className="text-[10px] text-gray-600">
                You must be logged in to submit a report
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}