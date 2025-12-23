"use client";

import { useState } from "react";
import { useRouter  } from "next/navigation";
import { Road } from "../data/roads";

const STATUS_STYLES = {
  Open: {
    text: "#4a90d9",
    bg: "rgba(74,144,217,0.1)",
  },
  Delays: {
    text: "#F8B328",
    bg: "rgba(248,179,40,0.15)",
  },
  Closed: {
    text: "#D9524A",
    bg: "rgba(217,82,74,0.12)",
  },
};

export default function RoadCard({ road }: { road: Road }) {
  const [expanded, setExpanded] = useState(false);
  const style = STATUS_STYLES[road.status];
  const router = useRouter();

  const handleReportClick = (e: React.MouseEvent) => {
  e.stopPropagation(); // prevent collapsing the card
  router.push(`/report/${road.id}`);
};

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      className={`
        border rounded-md cursor-pointer bg-white
        transition-all duration-300 ease-in-out
        overflow-hidden
        ${expanded ? "max-h-[650px]" : "max-h-[110px]"}
      `}
    >
      {/* HEADER */}
      <div className="p-4 flex items-stretch justify-between">
        
        {/* Left content */}
        <div className="flex flex-col justify-center">
          <h2 className="text-[18px] font-bold text-[#1a1a1a] leading-tight">
            {road.name}
          </h2>
          <p className="text-[12px] text-gray-500 font-medium mt-1">
            Last updated: {road.lastUpdated}
          </p>
        </div>

        {/* Right status */}
        <div className="flex items-center">
          <span
            className="text-[12px] font-bold px-3 py-1 rounded-full"
            style={{ color: style.text, backgroundColor: style.bg }}
          >
            {road.status}
          </span>
        </div>
      </div>

      {/* EXPANDED CONTENT */}
      {expanded && (
        <div className="px-4 pb-4">
          <p className="mt-4 text-[14px] text-[#1a1a1a]">
            <strong>Road Report:</strong> {road.roadReport}
          </p>

          <p className="mt-3 text-[14px] text-[#1a1a1a]">
            <strong>Distance:</strong> {road.distance}
          </p>

          <p className="mt-3 text-[14px] text-[#1a1a1a]">
            <strong>Average Travel Time by Car:</strong> {road.travelTimeCar}
          </p>

          <p className="mt-3 text-[14px] text-[#1a1a1a]">
            <strong>Average Travel Time by Bus:</strong> {road.travelTimeBus}
          </p>

          <p className="mt-3 text-[14px] text-[#1a1a1a]">
            <strong>Description:</strong> {road.description}
          </p>

          {/* REPORT BUTTON */}
          <div className="mt-6">
            <button
              onClick={handleReportClick}
              className="
                text-sm font-bold
                px-4 py-2 rounded-md
                border border-[#D9524A]
                text-[#D9524A]
                hover:bg-[#D9524A] hover:text-white
                transition
              "
            >
              Report Road Closure
            </button>
          </div>
        </div>
      )}
    </div>
  );
}