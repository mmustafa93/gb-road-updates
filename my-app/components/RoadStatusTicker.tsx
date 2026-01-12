"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

type Road = {
  id: string;
  name: string;
  acronym: string;
  status: string;
};

export default function RoadStatusTicker() {
  const [roads, setRoads] = useState<Road[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRoads() {
      const { data, error } = await supabase
        .from("roads")
        .select("id, name, acronym, status")
        .order("sort_order", { ascending: true });

      if (!error && data) {
        setRoads(data);
      }
      setLoading(false);
    }

    fetchRoads();
  }, []);

  if (loading || roads.length === 0) return null;

  return (
    <div className="relative overflow-hidden bg-gray-100 border-y border-gray-200">
      <div className="flex w-max animate-ticker gap-8 px-4 py-2">
        {[...roads, ...roads].map((road, index) => (
          <div
            key={`${road.id}-${index}`}
            className="whitespace-nowrap text-sm font-medium text-gray-700"
          >
            {road.name} ({road.acronym}) –{" "}
            <span
              className={
                road.status === "open"
                  ? "text-green-600"
                  : road.status === "closed"
                  ? "text-red-600"
                  : "text-yellow-600"
              }
            >
              {road.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}