
"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

type Booking = {
  _id: string;
  serviceName: string;
  eventDate: string;
  eventLocation: string;
  status: string;
};

const CustomerBookingsPage = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getBookings = async () => {
      try {
        const result = await api.get<{ data: Booking[] }>(
          "/api/bookings/my-bookings"
        );

        setBookings(result.data);
      } catch {
        setError("Could not load bookings");
      } finally {
        setLoading(false);
      }
    };

    getBookings();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#245C45]">
        My Bookings
      </h1>

      <p className="mt-2 text-gray-600">
        View and manage your wedding service bookings.
      </p>

      {loading && <p className="mt-5">Loading bookings...</p>}

      {error && <p className="mt-5 text-red-500">{error}</p>}

      {!loading && !error && bookings.length === 0 && (
        <p className="mt-5 text-gray-500">No bookings found.</p>
      )}

      {bookings.length > 0 && (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full border text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">Service</th>
                <th className="p-3">Event Date</th>
                <th className="p-3">Location</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id} className="border-t">
                  <td className="p-3">{booking.serviceName}</td>
                  <td className="p-3">{booking.eventDate}</td>
                  <td className="p-3">{booking.eventLocation}</td>
                  <td className="p-3">{booking.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CustomerBookingsPage;
