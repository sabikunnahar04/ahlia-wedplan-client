
"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

type Service = {
  _id: string;
  isActive?: boolean;
};

type Booking = {
  _id: string;
  status: string;
};

type ApiResponse<T> = {
  success: boolean;
  data: T;
};

const VendorDashboard = () => {
  const [totalServices, setTotalServices] = useState(0);
  const [activeServices, setActiveServices] = useState(0);
  const [pendingBookings, setPendingBookings] = useState(0);
  const [acceptedBookings, setAcceptedBookings] = useState(0);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [serviceResult, bookingResult] = await Promise.all([
          api.get<ApiResponse<Service[]>>("/api/services/my-services"),
          api.get<ApiResponse<Booking[]>>("/api/bookings/vendor-bookings"),
        ]);

        const services = serviceResult.data || [];
        const bookings = bookingResult.data || [];

        setTotalServices(services.length);

        setActiveServices(
          services.filter((service) => service.isActive !== false).length
        );

        setPendingBookings(
          bookings.filter((booking) => booking.status === "pending").length
        );

        setAcceptedBookings(
          bookings.filter((booking) => booking.status === "accepted").length
        );
      } catch (error) {
        console.log("Dashboard data loading failed", error);
      }
    };

    fetchDashboardData();
  }, []);

  const dashboardItems = [
    {
      title: "Total Services",
      value: totalServices,
    },
    {
      title: "Active Services",
      value: activeServices,
    },
    {
      title: "Pending Booking Requests",
      value: pendingBookings,
    },
    {
      title: "Accepted Bookings",
      value: acceptedBookings,
    },
    {
      title: "Current Subscription Plan",
      value: "Free",
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#245C45]">
        Vendor Dashboard
      </h1>

      <p className="mt-2 text-gray-600">
        Welcome to your WedPlan Vendor Dashboard!
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {dashboardItems.map((item) => (
          <div
            key={item.title}
            className="rounded-xl border bg-white p-6 shadow-sm"
          >
            <h2 className="text-sm font-medium text-gray-500">
              {item.title}
            </h2>

            <p className="mt-3 text-3xl font-bold text-[#245C45]">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VendorDashboard;
