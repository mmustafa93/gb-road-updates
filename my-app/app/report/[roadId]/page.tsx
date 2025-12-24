"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { roads } from "@/data/roads";
import Logo from "@/components/Logo";
import { supabase } from "@/lib/supabase/client";

export default function ReportRoadPage() {
  const { roadId } = useParams<{ roadId: string }>();
  const router = useRouter();

  const road = roads.find((r) => r.id === roadId);

  const [town, setTown] = useState("");
  const [duration, setDuration] = useState("");
  const [cause, setCause] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Redirect to homepage 10 seconds after submission
  useEffect(() => {
    if (!submitted) return;

    const timer = setTimeout(() => {
      router.push("/");
    }, 10000);

    return () => clearTimeout(timer);
  }, [submitted, router]);

  if (!road) {
    return <p className="p-6">Road not found.</p>;
  }

  if (submitted) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4 bg-white">
        <div className="max-w-md text-center">
          <h1 className="text-xl font-bold text-[#1a1a1a]">
            Report submitted
          </h1>
          <p className="mt-3 text-sm text-gray-600">
            Thank you for helping keep road information accurate. Your report
            will be reviewed before being published.
          </p>
          <p className="mt-4 text-xs text-gray-500">
            You will be redirected to the homepage shortly.
          </p>
        </div>
      </main>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("You must be logged in to submit a road report.");
      setSubmitting(false);
      return;
    }

    let photoUrl: string | null = null;

    if (photo) {
      const filePath = `${user.id}/${Date.now()}-${photo.name}`;

      const { error: uploadError } = await supabase.storage
        .from("road-reports")
        .upload(filePath, photo);

      if (uploadError) {
        console.error(uploadError);
        alert("Failed to upload photo.");
        setSubmitting(false);
        return;
      }

      photoUrl = supabase.storage
        .from("road-reports")
        .getPublicUrl(filePath).data.publicUrl;
    }

    const { error } = await supabase.from("road_reports").insert({
      road_id: road.id,
      road_name: road.name,
      user_id: user.id,
      nearest_town: town,
      blocked_duration: duration,
      cause,
      photo_url: photoUrl,
    });

    if (error) {
      console.error(error);
      alert("Failed to submit report.");
      setSubmitting(false);
      return;
    }

    setSubmitted(true);
    setSubmitting(false);
  }

  return (
    <main className="min-h-screen px-4 py-8 bg-white flex flex-col items-center justify-center gap-6">
      <Logo />

      <div className="max-w-xl mx-auto text-gray-600 w-full">
        <h1 className="text-xl font-bold text-[#1a1a1a]">
          Report Road Issue
        </h1>

        <p className="mt-1 text-sm text-gray-600">{road.name}</p>

        <form
          className="mt-6 flex flex-col gap-3"
          onSubmit={handleSubmit}
        >
          {/* Nearest town */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Nearest town or village
            </label>
            <input
              required
              type="text"
              value={town}
              onChange={(e) => setTown(e.target.value)}
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
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
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
              value={cause}
              onChange={(e) => setCause(e.target.value)}
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
              onChange={(e) => setPhoto(e.target.files?.[0] || null)}
              className="text-sm"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="
              mt-4 bg-[#D9524A] text-white
              font-bold text-sm
              px-4 py-2 rounded-md
              hover:opacity-90 transition
              disabled:opacity-50
            "
          >
            {submitting ? "Submitting..." : "Submit Report"}
          </button>
        </form>
      </div>
    </main>
  );
}