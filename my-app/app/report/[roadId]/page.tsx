"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Logo from "@/components/Logo";
import Navbar from "@/components/navbar/Navbar";
import RoadStatusTicker from "@/components/RoadStatusTicker";
import { supabase } from "@/lib/supabase/client";

interface Road {
  id: string;
  name: string;
}

interface RoadSegment {
  id: string;
  title: string;
}

export default function ReportRoadPage() {
  const { roadId } = useParams<{ roadId: string }>();
  const router = useRouter();

  const [road, setRoad] = useState<Road | null>(null);
  const [segments, setSegments] = useState<RoadSegment[]>([]);
  const [loading, setLoading] = useState(true);

  const [subdivision, setSubdivision] = useState("");
  const [duration, setDuration] = useState("");
  const [cause, setCause] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const { data: roadData } = await supabase
        .from("roads")
        .select("id, name")
        .eq("id", roadId)
        .single();

      const { data: segmentData } = await supabase
        .from("road_segments")
        .select("id, title")
        .eq("road_id", roadId)
        .order("sequence_order");

      setRoad(roadData);
      setSegments(segmentData || []);
      setLoading(false);
    }

    fetchData();
  }, [roadId]);

  useEffect(() => {
    if (!submitted) return;
    const timer = setTimeout(() => router.push("/"), 8000);
    return () => clearTimeout(timer);
  }, [submitted, router]);

  if (loading) {
    return <p className="p-6 text-sm text-gray-500">Loading…</p>;
  }

  if (!road) {
    return <p className="p-6">Road not found.</p>;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("You must be logged in to submit a report.");
      setSubmitting(false);
      return;
    }

    let photoUrl: string | null = null;

    if (photo) {
      const path = `${user.id}/${Date.now()}-${photo.name}`;
      await supabase.storage.from("road-reports").upload(path, photo);
      photoUrl = supabase.storage.from("road-reports").getPublicUrl(path)
        .data.publicUrl;
    }

    await supabase.from("road_reports").insert({
      road_id: road.id,
      road_name: road.name,
      user_id: user.id,
      nearest_town: subdivision,
      blocked_duration: duration,
      cause,
      photo_url: photoUrl,
    });

    setSubmitted(true);
    setSubmitting(false);
  }

  return (
    <main className="min-h-screen bg-white px-4 py-6">
      {/* HEADER STRIP */}
      <Navbar />
      
      {/* STATUS TICKER */}
            <section className="max-w-5xl mx-auto mb-6">
              <RoadStatusTicker />
            </section>

      {/* FORM CARD */}
      <section className="max-w-xl mx-auto border rounded-md p-5">
        <h1 className="text-[18px] font-bold text-[#1a1a1a]">
          Report Road Issue
        </h1>

        <p className="mt-1 text-[13px] text-gray-600">
          Road: <span className="font-semibold">{road.name}</span>
        </p>

        <form className="mt-5 flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* Subdivision */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Affected subdivision
            </label>
            <select
              required
              value={subdivision}
              onChange={(e) => setSubdivision(e.target.value)}
              className="w-full border rounded-md px-3 py-2 text-sm"
            >
              <option value="">Select a section</option>
              {segments.map((s) => (
                <option key={s.id} value={s.title}>
                  {s.title}
                </option>
              ))}
            </select>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Blockage duration
            </label>
            <input
              required
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="e.g. 3 hours, since morning"
              className="w-full border rounded-md px-3 py-2 text-sm"
            />
          </div>

          {/* Cause */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Cause
            </label>
            <select
              required
              value={cause}
              onChange={(e) => setCause(e.target.value)}
              className="w-full border rounded-md px-3 py-2 text-sm"
            >
              <option value="">Select cause</option>
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
              Photo (optional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files?.[0] || null)}
              className="text-sm"
            />
          </div>

          <button
            disabled={submitting}
            className="
              mt-2 bg-[#D9524A] text-white
              font-bold text-sm px-4 py-2 rounded-md
              hover:opacity-90 transition
              disabled:opacity-50
            "
          >
            {submitting ? "Submitting…" : "Submit Report"}
          </button>
        </form>
      </section>
    </main>
  );
}