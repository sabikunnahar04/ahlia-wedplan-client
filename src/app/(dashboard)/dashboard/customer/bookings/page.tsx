"use client";

import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import { api } from "@/lib/api";

type Booking = {
  _id: string;
  serviceName: string;
  serviceImage: string;
  vendorName: string;
  vendorEmail: string;
  eventDate: string;
  eventLocation: string;
  message: string;
  status: string;
  createdAt: string;
};

const CustomerBookingsPage = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<string | null>(null);

  useEffect(() => {
    const getBookings = async () => {
      try {
        const result = await api.get<{ data: Booking[] }>(
          "/api/bookings/my-bookings"
        );

        setBookings(result.data || []);
      } catch {
        setError("Could not load bookings");
      } finally {
        setLoading(false);
      }
    };

    getBookings();
  }, []);

  const cancelBooking = async (id: string) => {
    try {
      await api.put(`/api/bookings/${id}/cancel`, {});

      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === id
            ? { ...booking, status: "cancelled" }
            : booking
        )
      );
    } catch {
      setError("Could not cancel booking");
    }
  };

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

      {!loading && bookings.length === 0 && (
        <p className="mt-5 text-gray-500">No bookings found.</p>
      )}

      {!loading && bookings.length > 0 && (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full border text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">Service</th>
                <th className="p-3">Vendor</th>
                <th className="p-3">Event Date</th>
                <th className="p-3">Location</th>
                <th className="p-3">Request Date</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((booking) => (
                <Fragment key={booking._id}>
                  <tr className="border-t">
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        {booking.serviceImage ? (
                          <Image
                            src={booking.serviceImage}
                            alt={booking.serviceName}
                            width={60}
                            height={60}
                            className="h-14 w-14 rounded-md object-cover"
                          />
                        ) : (
                          <div className="flex h-14 w-14 items-center justify-center rounded-md bg-gray-200 text-xs">
                            No Image
                          </div>
                        )}

                        <span className="font-medium">
                          {booking.serviceName}
                        </span>
                      </div>
                    </td>

                    <td className="p-3">
                      {booking.vendorName}
                    </td>

                    <td className="p-3">
                      {booking.eventDate}
                    </td>

                    <td className="p-3">
                      {booking.eventLocation}
                    </td>

                    <td className="p-3">
                      {new Date(booking.createdAt).toLocaleDateString()}
                    </td>

                    <td className="p-3 capitalize">
                      {booking.status}
                    </td>

                    <td className="p-3">
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() =>
                            setSelectedBooking(
                              selectedBooking === booking._id
                                ? null
                                : booking._id
                            )
                          }
                          className="rounded-md bg-[#245C45] px-3 py-1 text-white"
                        >
                          {selectedBooking === booking._id
                            ? "Hide Details"
                            : "View Details"}
                        </button>

                        {booking.status === "pending" && (
                          <button
                            onClick={() => cancelBooking(booking._id)}
                            className="rounded-md bg-red-500 px-3 py-1 text-white"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>

                  {selectedBooking === booking._id && (
                    <tr className="border-t bg-gray-50">
                      <td colSpan={7} className="p-4">
                        <h3 className="font-semibold text-[#245C45]">
                          Booking Details
                        </h3>

                        <p className="mt-2">
                          Vendor Name: {booking.vendorName}
                        </p>

                        <p>
                          Vendor Email: {booking.vendorEmail}
                        </p>

                        <p>
                          Event Date: {booking.eventDate}
                        </p>

                        <p>
                          Event Location: {booking.eventLocation}
                        </p>

                        <p>
                          Message: {booking.message || "No message"}
                        </p>

                        <p className="capitalize">
                          Booking Status: {booking.status}
                        </p>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CustomerBookingsPage;