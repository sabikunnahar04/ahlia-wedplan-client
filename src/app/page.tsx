
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <section className="relative min-h-[550px] flex items-center">
        <Image
          src="/wedding-hero.png"
          alt="Beautiful outdoor wedding decoration"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/45"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-white">
          <p className="text-[#E8C58A] font-semibold uppercase tracking-widest">
            Welcome to WedPlan
          </p>

          <h1 className="text-4xl md:text-6xl font-bold max-w-2xl mt-4 leading-tight">
            Plan Your Dream Wedding With Us
          </h1>

          <p className="max-w-xl mt-5 text-lg text-gray-100">
            Discover trusted wedding vendors and find everything
            you need to make your special day unforgettable.
          </p>

          <Link
            href="/services"
            className="inline-block mt-8 bg-[#245C45] hover:bg-[#173F31] text-white px-7 py-3 rounded-md font-semibold transition"
          >
            Explore Services
          </Link>
        </div>
      </section>
    </main>
  );
}
