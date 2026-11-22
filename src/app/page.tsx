
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";

type Service = {
  _id: string;
  name: string;
  category: string;
  location: string;
  price: string;
  description: string;
  status: string;
};

export default function Home() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const result = await api.get<{ data: Service[] }>("/api/services");

        const approvedServices = (result.data || []).filter(
          (service) => service.status === "approved"
        );

        setServices(approvedServices.slice(0, 6));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <main>
      {/* Hero Section */}
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

      {/* Featured Services */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#245C45]">
            Featured Services
          </h2>

          <p className="mt-3 text-gray-600">
            Explore our popular wedding services.
          </p>
        </div>

        {loading ? (
          <p className="text-center mt-10">Loading services...</p>
        ) : services.length === 0 ? (
          <p className="text-center mt-10 text-gray-500">
            No services available yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {services.map((service) => (
              <div
                key={service._id}
                className="border rounded-lg p-6 shadow-sm hover:shadow-md transition"
              >
                <h3 className="text-xl font-semibold text-[#245C45]">
                  {service.name}
                </h3>

                <p className="mt-3 text-gray-600">
                  Category: {service.category}
                </p>

                <p className="text-gray-600">
                  Location: {service.location}
                </p>

                <p className="mt-2 font-semibold">
                  Price: {service.price}
                </p>

                <Link
                  href={`/services/${service._id}`}
                  className="inline-block mt-5 bg-[#245C45] text-white px-4 py-2 rounded-md hover:bg-[#173F31]"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Link
            href="/services"
            className="inline-block border border-[#245C45] text-[#245C45] px-6 py-3 rounded-md hover:bg-[#245C45] hover:text-white transition"
          >
            View All Services
          </Link>
        </div>
      </section>
    </main>
  );
}
