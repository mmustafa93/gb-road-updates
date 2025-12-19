import Logo from "../components/Logo";
import RoadCard from "../components/RoadCard";
import { roads } from "../data/roads";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white px-4 py-6">
      <header className="max-w-5xl mx-auto mb-6 gap-2 flex items-center justify-between">
        <div className="flex flex-col">
          <Logo />
          <p className="text-[12px] text-gray-600 max-w-md">
            Real-time community-led road conditions for Gilgit-Baltistan
          </p>
        </div>
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