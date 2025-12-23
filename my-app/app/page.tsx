import Link from "next/link";
import Logo from "../components/Logo";
import RoadCard from "../components/RoadCard";
import { roads } from "../data/roads";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white px-4 py-6">
      <header className="max-w-5xl mx-auto mb-6 flex items-center justify-between">
        
        {/* Left: Logo + tagline */}
        <div className="flex flex-col">
          <Logo />
          <p className="text-[12px] text-gray-600 max-w-md">
            Real-time community-led road conditions for Gilgit-Baltistan
          </p>
        </div>

        {/* Right: Auth button */}
        <Link
          href="/login"
          className="
            text-sm font-medium px-4 py-2 rounded-md
            border border-gray-300
            text-[#1a1a1a]
            hover:bg-gray-100 transition
          "
        >
          Sign in / Sign up
        </Link>

      </header>

      <section className="max-w-5xl mx-auto flex flex-col gap-4">
        {roads.map((road) => (
          <RoadCard key={road.id} road={road} />
        ))}
      </section>

      <footer className="max-w-5xl mx-auto mt-10 text-[12px] text-gray-500">
        Not an official government source. Information is community reported.
      </footer>
    </main>
  );
}