
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api } from "@/lib/api";

type Service = {
  _id: string;
  name: string;
  category: string;
  location: string;
  price: number;
  description: string;
};

const ServiceDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getService = async () => {
      try {
        const result = await api.get<{ data: Service[] }>("/api/services");

        const foundService = result.data.find(
          (item) => item._id === id
        );

        setService(foundService ?? null);
      } catch {
        setService(null);
      } finally {
        setLoading(false);
      }
    };

    getService();
  }, [id]);

  if (loading) {
    return <p className="p-6">Loading service...</p>;
  }

  if (!service) {
    return <p className="p-6">Service not found.</p>;
  }

  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="text-2xl font-bold text-[#245C45]">
        {service.name}
      </h1>

      <div className="mt-5 space-y-3">
        <p>Category: {service.category}</p>
        <p>Location: {service.location}</p>
        <p>Price: {service.price}</p>
        <p>Description: {service.description}</p>
      </div>
    </div>
  );
};

export default ServiceDetailsPage;
