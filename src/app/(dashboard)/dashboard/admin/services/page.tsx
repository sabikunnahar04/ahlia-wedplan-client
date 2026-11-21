
"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

type Service = {
  _id: string;
  name: string;
  category?: string;
  location?: string;
  price?: number | string;
  status?: string;
  vendorId?: string;
};

const ManageServicesPage = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadServices = async () => {
      try {
        const result = await api.get<{ data: Service[] }>(
          "/api/services/admin"
        );

        setServices(result.data ?? []);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load services"
        );
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      await api.put(`/api/services/admin/${id}/status`, { status });

      setServices((previousServices) =>
        previousServices.map((service) =>
          service._id === id ? { ...service, status } : service
        )
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update status"
      );
    }
  };

  const deleteService = async (id: string) => {
    try {
      await api.delete(`/api/services/admin/${id}`);

      setServices((previousServices) =>
        previousServices.filter((service) => service._id !== id)
      );
    } catch {
      setError("Failed to delete service");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#245C45]">
        Manage Services
      </h1>

      <p className="mt-2 text-gray-600">
        Review and manage wedding services.
      </p>

      <div className="mt-6">
        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-10 w-full" />
            ))}
          </div>
        ) : error ? (
          <p className="text-sm text-red-600">{error}</p>
        ) : services.length === 0 ? (
          <p className="text-sm text-gray-500">
            No services found.
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Vendor ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {services.map((service) => (
                <TableRow key={service._id}>
                  <TableCell>{service.name}</TableCell>
                  <TableCell>{service.category ?? "-"}</TableCell>
                  <TableCell>{service.location ?? "-"}</TableCell>
                  <TableCell>{service.price ?? "-"}</TableCell>
                  <TableCell>{service.vendorId ?? "-"}</TableCell>

                  <TableCell>
                    <Badge variant="secondary">
                      {service.status ?? "pending"}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <div className="flex gap-2">
                      {service.status !== "approved" &&
                        service.status !== "rejected" && (
                          <>
                            <Button
                              size="sm"
                              onClick={() =>
                                updateStatus(service._id, "approved")
                              }
                            >
                              Approve
                            </Button>

                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() =>
                                updateStatus(service._id, "rejected")
                              }
                            >
                              Reject
                            </Button>
                          </>
                        )}

                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => deleteService(service._id)}
                      >
                        Delete
                      </Button>
                    </div>
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

export default ManageServicesPage;
