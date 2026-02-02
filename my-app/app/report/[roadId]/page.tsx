"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/navbar/Navbar";
import RoadStatusTicker from "@/components/RoadStatusTicker";
import { supabase } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

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

  // Auth state for Navbar & access control
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [signingOut, setSigningOut] = useState(false);

  // Placeholder for admin check
  const isAdmin = user?.email?.endsWith("@admin.com");

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
    const timer = setTimeout(() => router.push("/"), 3000);
    return () => clearTimeout(timer);
  }, [submitted, router]);

  // Load current user and subscribe to auth changes so Navbar reflects state
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

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push(`/login?next=/report/${roadId}`);
    }
  }, [authLoading, user, router, roadId]);

  async function handleSignOut() {
    setSigningOut(true);
    await supabase.auth.signOut();
    setUser(null);
    setSigningOut(false);
    router.push("/");
  }

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

    if (!road) {
      alert("Road data not loaded. Please refresh the page.");
      setSubmitting(false);
      return;
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
    {/* NAVBAR */}
    <Navbar
      user={user}
      authLoading={authLoading}
      signingOut={signingOut}
      onSignOut={handleSignOut}
    />

    {/* STATUS STRIP */}
    <section className="max-w-5xl mx-auto">
      <RoadStatusTicker />
    </section>

    {/* CONTENT */}
    <section className="max-w-5xl mx-auto px-4 mt-6">
      <div className="max-w-xl mx-auto">
        {/* FORM CARD */}
        <div className="border rounded-md bg-white overflow-hidden">
          {/* CARD HEADER */}
          <div className="px-5 py-4 border-b bg-gray-50">
            <h1 className="text-[18px] font-bold text-[#1a1a1a]">
              Report Road Issue
            </h1>
            <p className="mt-1 text-[13px] text-gray-600">
              Road: <span className="font-semibold">{road.name}</span>
            </p>
          </div>

          {/* CARD BODY */}
          <form
            onSubmit={handleSubmit}
            className="px-5 py-5 flex flex-col gap-4"
          >
            {/* Subdivision */}
            <div>
              <label className="block text-[13px] font-medium text-gray-700 mb-1">
                Affected subdivision
              </label>
              <select
                required
                value={subdivision}
                onChange={(e) => setSubdivision(e.target.value)}
                className="
                  w-full rounded-md border border-gray-300
                  px-3 py-2 text-sm text-gray-900
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                  placeholder:text-gray-700
                "
              >
                <option value="">Select a subdivision</option>
                {segments.map((s) => (
                  <option key={s.id} value={s.title}>
                    {s.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Duration */}
            <div>
              <label className="block text-[13px] font-medium text-gray-700 mb-1">
                How long has it been blocked?
              </label>
              <input
                required
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g. 3 hours, since morning"
                className="
                  w-full rounded-md border border-gray-300
                  px-3 py-2 text-sm text-gray-900
                  focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-700
                "
              />
            </div>

            {/* Cause */}
            <div>
              <label className="block text-[13px] font-medium text-gray-700 mb-1">
                Cause of blockage
              </label>
              <select
                required
                value={cause}
                onChange={(e) => setCause(e.target.value)}
                className="
                  w-full rounded-md border border-gray-300
                  px-3 py-2 text-sm text-gray-900 placeholder:text-gray-700
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                "
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
              <label className="block text-[13px] font-medium text-gray-700 mb-1">
                Upload photo (optional)
              </label>
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files?.[0] || null)}
                className="hidden"
              />
              <div className="flex items-center gap-2">
                <label
                  htmlFor="photo-upload"
                  className="
                    text-white
                    font-medium text-sm
                    px-4 py-2 rounded-md
                    cursor-pointer transition
                  "
                  style={{ backgroundColor: '#4a90d9' }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#3A7BBF'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4a90d9'}
                >
                  Choose File
                </label>
                {photo && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-800">{photo.name}</span>
                    <button
                      type="button"
                      onClick={() => setPhoto(null)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* ACTION */}
            <div className="pt-2">
              <button
                disabled={submitting}
                className="
                  w-full
                  bg-[#D9524A] text-white
                  font-bold text-sm
                  px-4 py-2 rounded-md
                  hover:opacity-90 transition
                  disabled:opacity-50
                "
              >
                {submitting ? "Submitting…" : "Submit Report"}
              </button>
            </div>
            {submitted && (
              <p className="text-center text-green-600 text-sm mt-4">
                Report Submitted! Redirecting to homepage...
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  </main>
);
}