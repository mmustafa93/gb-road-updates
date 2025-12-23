"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { roads } from "@/data/roads";

export default function ReportRoadPage() {
  const { roadId } = useParams();
  const road = roads.find((r) => r.id === roadId);

  const [submitted, setSubmitted] = useState(false);

  if (!road) {
    return <p className="p-6">Road not found.</p>;
  }

  if (submitted) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <h1 className="text-xl font-bold text-[#1a1a1a]">
            Report submitted
          </h1>
          <p className="mt-3 text-sm text-gray-600">
            Thank you for helping keep road information accurate. Your report
            will be reviewed before being published.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 py-8">
      <div className="max-w-xl mx-auto">
        <h1 className="text-xl font-bold text-[#1a1a1a]">
          Report Road Issue
        </h1>

        <p className="mt-1 text-sm text-gray-600">
          {road.name}
        </p>

        <form
          className="mt-6 flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
        >
          {/* Nearest town */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Nearest town or village
            </label>
            <input
              required
              type="text"
              placeholder="e.g. Aliabad, Gahkuch"
              className="w-full border rounded-md px-3 py-2 text-sm"
            />
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium mb-1">
              How long has the road been blocked?
            </label>
            <input
              required
              type="text"
              placeholder="e.g. 2 hours, since last night"
              className="w-full border rounded-md px-3 py-2 text-sm"
            />
          </div>

          {/* Cause */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Cause of blockage
            </label>
            <select
              required
              className="w-full border rounded-md px-3 py-2 text-sm"
            >
              <option value="">Select a cause</option>
              <option>Landslide</option>
              <option>Snowfall</option>
              <option>Flooding</option>
              <option>Accident</option>
              <option>Road work</option>
              <option>Other</option>
            </select>
          </div>

          {/* Photo */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Upload photo (optional)
            </label>
            <input
              type="file"
              accept="image/*"
              className="text-sm"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="
              mt-4 bg-[#D9524A] text-white
              font-bold text-sm
              px-4 py-2 rounded-md
              hover:opacity-90 transition
            "
          >
            Submit Report
          </button>
        </form>
      </div>
    </main>
  );
}