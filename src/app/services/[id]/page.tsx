
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { api } from "@/lib/api";

type Service = {
  _id: string;
  name: string;
  category: string;
  location: string;
  price: string | number;
  description: string;
  vendor?: {
    name: string;
    email: string;
  };
};

type Booking = {
  serviceId: string;
  eventDate: string;
  status: string;
};

const ServiceDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data: session, isPending } = useSession();

  const [service, setService] = useState<Service | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [eventDate, setEventDate] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (isPending) return;

    if (!session) {
      router.push("/signin");
      return;
    }

    const getData = async () => {
      try {
        const result = await api.get<{ data: Service[] }>("/api/services");
        const foundService = result.data.find((item) => item._id === id);

        setService(foundService ?? null);

        const bookingResult = await api.get<{ data: Booking[] }>(
          "/api/bookings/my-bookings"
        );

        setBookings(bookingResult.data || []);
      } catch {
        setService(null);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [id, session, isPending, router]);

  const alreadyRequested = bookings.some(
    (booking) =>
      booking.serviceId === id &&
      booking.eventDate === eventDate &&
      ["pending", "accepted"].includes(booking.status)
  );

  const handleBooking = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);

    try {
      await api.post("/api/bookings", {
        serviceId: service?._id,
        eventDate,
        eventLocation,
        message,
      });

      setSuccess("Booking request submitted successfully!");

      setBookings((previous) => [
        ...previous,
        {
          serviceId: id,
          eventDate,
          status: "pending",
        },
      ]);

      setEventDate("");
      setEventLocation("");
      setMessage("");
      setShowForm(false);
    } catch {
      setError("You already have an active booking for this date.");
    } finally {
      setSubmitting(false);
    }
  };

  if (isPending || loading) {
    return <p className="p-6">Loading service...</p>;
  }

  if (!session) {
    return null;
  }

  if (!service) {
    return <p className="p-6">Service not found.</p>;
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-[#245C45]">
            {service.name}
          </h1>

          <div className="mt-6 space-y-4 text-gray-600">
            <p>
              <b>Category:</b> {service.category}
            </p>

            <p>
              <b>Location:</b> {service.location}
            </p>

            <p>
              <b>Price:</b> ৳{service.price}
            </p>

            <div>
              <b>Description:</b>
              <p className="mt-2">{service.description}</p>
            </div>

            <div className="border-t pt-4">
              <h2 className="font-bold text-[#245C45]">
                Vendor Information
              </h2>

              <p>
                <b>Name:</b> {service.vendor?.name}
              </p>

              <p>
                <b>Email:</b> {service.vendor?.email}
              </p>
            </div>
          </div>

          {alreadyRequested ? (
            <p className="mt-8 font-medium text-green-700">
              Already Requested
            </p>
          ) : (
            <button
              onClick={() => {
                setShowForm(!showForm);
                setError("");
              }}
              className="mt-8 rounded-md bg-[#245C45] px-6 py-3 font-medium text-white hover:bg-[#173f31]"
            >
              {showForm ? "Cancel Booking" : "Book Now"}
            </button>
          )}
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          {showForm && !alreadyRequested ? (
            <form onSubmit={handleBooking} className="space-y-5">
              <h2 className="text-xl font-bold text-[#245C45]">
                Book This Service
              </h2>

              <div>
                <label className="mb-2 block font-medium">
                  Event Date
                </label>

                <input
                  type="date"
                  required
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full rounded-md border p-3"
                />
              </div>

              {alreadyRequested && (
                <p className="text-sm text-red-500">
                  You already requested this service for this date.
                </p>
              )}

              <div>
                <label className="mb-2 block font-medium">
                  Event Location
                </label>

                <input
                  type="text"
                  required
                  placeholder="Enter event location"
                  value={eventLocation}
                  onChange={(e) => setEventLocation(e.target.value)}
                  className="w-full rounded-md border p-3"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium">
                  Additional Message
                </label>

                <textarea
                  rows={4}
                  placeholder="Write your message (optional)"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full rounded-md border p-3"
                />
              </div>

              {error && (
                <p className="text-sm text-red-500">{error}</p>
              )}

              <button
                type="submit"
                disabled={submitting || alreadyRequested}
                className="w-full rounded-md bg-[#245C45] px-5 py-3 font-medium text-white disabled:opacity-50"
              >
                {submitting ? "Submitting..." : "Submit Booking"}
              </button>
            </form>
          ) : (
            <div className="flex h-full min-h-64 flex-col items-center justify-center text-center">
              <h2 className="text-xl font-bold text-[#245C45]">
                Ready to Book?
              </h2>

              <p className="mt-3 text-gray-500">
                Click Book Now to send a booking request for this service.
              </p>
            </div>
          )}
        </div>
      </div>

      {success && (
        <p className="mt-5 text-center text-green-600">
          {success}
        </p>
      )}
    </div>
  );
};

export default ServiceDetailsPage;
