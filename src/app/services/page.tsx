
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
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
    const searchParams = useSearchParams();

    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState(
        searchParams.get("category") || "all"
    );
    const [location, setLocation] = useState("all");

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

    const categories = [...new Set(services.map((service) => service.category))];

    const locations = [...new Set(services.map((service) => service.location))];

    const filteredServices = services.filter(
        (service) =>
            service.name.toLowerCase().includes(search.toLowerCase()) &&
            (category === "all" || service.category === category) &&
            (location === "all" || service.location === location)
    );

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold text-[#245C45]">
                Browse Services
            </h1>

            <p className="mt-2 text-gray-600">
                Find the perfect services for your wedding.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <input
                    type="text"
                    placeholder="Search by service name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full border rounded-md p-3 mt-6"
                />

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="border rounded-md p-3"
                >
                    <option value="all">All Categories</option>

                    {categories.map((item) => (
                        <option key={item} value={item}>
                            {item}
                        </option>
                    ))}
                </select>

                <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="border rounded-md p-3"
                >
                    <option value="all">All Locations</option>

                    {locations.map((item) => (
                        <option key={item} value={item}>
                            {item}
                        </option>
                    ))}
                </select>
            </div>

            {loading ? (
                <p className="mt-8">Loading services...</p>
            ) : filteredServices.length === 0 ? (
                <p className="mt-8 text-gray-500">No services found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    {filteredServices.map((service) => (
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
