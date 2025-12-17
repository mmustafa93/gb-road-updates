import { roads } from "../data/roads";
import RoadCard from "../components/RoadCard";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50 p-4 text-black">
      <header className="max-w-5xl mx-auto mb-6">
        <h1 className="text-3xl font-bold mb-1">GB Road Updates</h1>
        <p className="text-gray-600">
          Real-time community-led road conditions for Gilgit–Baltistan
        </p>
      </header>

      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
        {roads.map((road) => (
          <RoadCard key={road.id} road={road} />
        ))}
      </div>

      <footer className="max-w-5xl mx-auto mt-12 text-sm text-gray-500 text-center">
        Not an official government source — Powered by community contributions
      </footer>
    </main>
  );
}