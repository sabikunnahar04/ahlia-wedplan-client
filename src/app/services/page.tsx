
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";

type Service = {
  _id: string;
  name: string;
  category: string;
  location: string;
  price: string;
  description: string;
  status: string;
  isActive: boolean;
};

export default function BrowseServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const result = await api.get<{ data: Service[] }>("/api/services");

        setServices(
          (result.data || []).filter(
           (service) => service.status === "approved"
          )
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-[#245C45]">
        Browse Services
      </h1>

      <p className="mt-2 text-gray-600">
        Find the perfect services for your wedding.
      </p>

      {loading ? (
        <p className="mt-8">Loading services...</p>
      ) : services.length === 0 ? (
        <p className="mt-8 text-gray-500">No services found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {services.map((service) => (
            <div
              key={service._id}
              className="border rounded-lg p-5 shadow-sm"
            >
              <h2 className="text-xl font-semibold text-[#245C45]">
                {service.name}
              </h2>

              <p className="mt-2 text-gray-600">
                Category: {service.category}
              </p>

              <p className="text-gray-600">
                Location: {service.location}
              </p>

              <p className="mt-2 font-semibold">
                Price: {service.price}
              </p>

              <p className="mt-2 text-gray-600">
                {service.description}
              </p>

              <Link
                href={`/services/${service._id}`}
                className="inline-block mt-4 bg-[#245C45] text-white px-4 py-2 rounded-md"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
