"use client";

import React, { useState } from "react";
import { Road } from "../data/roads";

type Props = {
  road: Road;
};

const statusColors = {
  Open: "bg-green-100 text-green-800",
  Delays: "bg-yellow-100 text-yellow-800",
  Closed: "bg-red-100 text-red-800",
};

export default function RoadCard({ road }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="p-4 bg-white rounded shadow flex flex-col cursor-pointer hover:shadow-md transition"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex justify-between items-center">
        <h2 className="font-semibold">{road.name}</h2>
        <div
          className={`px-2 py-1 rounded text-sm font-medium ${statusColors[road.status]}`}
        >
          {road.status}
        </div>
      </div>
      <p className="text-sm text-gray-500 mt-1">Last updated: {road.lastUpdated}</p>
      {expanded && (
        <div className="mt-2 text-gray-700">
          {/* Placeholder for future details like photos, notes */}
          More details here...
        </div>
      )}
    </div>
  );
}