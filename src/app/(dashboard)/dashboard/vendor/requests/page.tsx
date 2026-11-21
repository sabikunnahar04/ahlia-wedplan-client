
"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Booking = {
  _id: string;
  serviceName: string;
  customerEmail: string;
  eventDate: string;
  eventLocation: string;
  message: string;
  status: string;
};

const BookingRequestsPage = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const result = await api.get<{ data: Booking[] }>(
          "/api/bookings/vendor-bookings"
        );

        setBookings(result.data ?? []);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load bookings"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      await api.put(`/api/bookings/${id}/status`, { status });

      setBookings((previous) =>
        previous.map((booking) =>
          booking._id === id ? { ...booking, status } : booking
        )
      );
    } catch {
      setError("Failed to update booking status");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#245C45]">
        Booking Requests
      </h1>

      <p className="mt-2 text-gray-600">
        Manage your customer booking requests.
      </p>

      <div className="mt-6">
        {loading ? (
          <p>Loading bookings...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : bookings.length === 0 ? (
          <p className="text-gray-500">No booking requests found.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Event Date</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="w-62.5">Message</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking._id}>
                  <TableCell>{booking.serviceName}</TableCell>
                  <TableCell>{booking.customerEmail}</TableCell>
                  <TableCell>{booking.eventDate}</TableCell>
                  <TableCell>{booking.eventLocation}</TableCell>

                  <TableCell className="max-w-62.5 whitespace-normal wrap-break-word">
                    {booking.message || "—"}
                  </TableCell>

                  <TableCell>
                    <Badge variant="secondary">
                      {booking.status}
                    </Badge>
                  </TableCell>

                  <TableCell className="whitespace-nowrap">
                    {booking.status === "pending" ? (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() =>
                            updateStatus(booking._id, "accepted")
                          }
                        >
                          Accept
                        </Button>

                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() =>
                            updateStatus(booking._id, "rejected")
                          }
                        >
                          Reject
                        </Button>
                      </div>
                    ) : (
                      <span className="text-gray-500">Completed</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default BookingRequestsPage;
