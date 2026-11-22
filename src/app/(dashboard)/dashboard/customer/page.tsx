
"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

type Booking = {
  _id: string;
  status: string;
};

type ApiResponse = {
  success: boolean;
  data: Booking[];
};

const CustomerDashboard = () => {
  const [totalBookings, setTotalBookings] = useState(0);
  const [pendingBookings, setPendingBookings] = useState(0);
  const [acceptedBookings, setAcceptedBookings] = useState(0);
  const [rejectedBookings, setRejectedBookings] = useState(0);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const result = await api.get<ApiResponse>(
          "/api/bookings/my-bookings"
        );

        const bookings = result.data || [];

        setTotalBookings(bookings.length);

        setPendingBookings(
          bookings.filter(
            (booking) => booking.status === "pending"
          ).length
        );

        setAcceptedBookings(
          bookings.filter(
            (booking) => booking.status === "accepted"
          ).length
        );

        setRejectedBookings(
          bookings.filter(
            (booking) => booking.status === "rejected"
          ).length
        );
      } catch (error) {
        console.log("Dashboard data loading failed", error);
      }
    };

    fetchDashboardData();
  }, []);

  const dashboardItems = [
    {
      title: "Total Booking Requests",
      value: totalBookings,
    },
    {
      title: "Pending Bookings",
      value: pendingBookings,
    },
    {
      title: "Accepted Bookings",
      value: acceptedBookings,
    },
    {
      title: "Rejected Bookings",
      value: rejectedBookings,
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#245C45]">
        Customer Dashboard
      </h1>

      <p className="mt-2 text-gray-600">
        Welcome to your WedPlan Customer Dashboard!
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {dashboardItems.map((item) => (
          <div
            key={item.title}
            className="rounded-lg border bg-white p-5 shadow-sm"
          >
            <h2 className="text-gray-600">
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

export default CustomerDashboard;
