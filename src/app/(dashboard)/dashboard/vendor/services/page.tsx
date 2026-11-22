
"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { action } from "@/lib/action";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import Image from "next/image";

type Service = {
  _id: string;
  name: string;
  category: string;
  location: string;
  price: string | number;
  description: string;
  image: string;
  status: string;
  isActive?: boolean;
};

const categories = [
  "Photography & Videography",
  "Wedding Venues",
  "Decoration & Florist",
  "Catering Services",
  "Makeup & Styling",
  "Wedding Fashion",
];

export default function VendorServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [viewService, setViewService] = useState<Service | null>(null);
  const [editService, setEditService] = useState<Service | null>(null);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const [updating, setUpdating] = useState(false);

  const loadServices = async () => {
    const data = await api.get<{ data: Service[] }>(
      "/api/services/my-services"
    );

    setServices(data?.data ?? []);
  };

  useEffect(() => {
    const load = async () => {
      try {
        await loadServices();
      } catch {
        setError("Failed to load services");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const handleEdit = (service: Service) => {
    setEditService(service);
    setName(service.name);
    setCategory(service.category);
    setLocation(service.location);
    setPrice(String(service.price));
    setDescription(service.description);
    setImage(null);
    setError("");
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editService) return;

    setUpdating(true);
    setError("");

    try {
      let imageUrl = editService.image;

      // Upload new image only if selected
      if (image) {
        const formData = new FormData();
        formData.append("image", image);

        const uploadResult = await fetch(
          `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
          {
            method: "POST",
            body: formData,
          }
        );

        const uploadData = await uploadResult.json();

        if (!uploadData.success) {
          throw new Error("Image upload failed");
        }

        imageUrl = uploadData.data.url;
      }

      await action.put(`/api/services/${editService._id}`, {
        name,
        category,
        location,
        price,
        description,
        image: imageUrl,
      });

      await loadServices();
      setEditService(null);
      setImage(null);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to update service"
      );
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Do you want to delete this service?")) {
      return;
    }

    try {
      await action.delete(`/api/services/${id}`);
      await loadServices();
    } catch {
      setError("Failed to delete service");
    }
  };

  const handleAvailability = async (service: Service) => {
    try {
      await action.patch(
        `/api/services/${service._id}/availability`,
        {
          isActive: service.isActive === false,
        }
      );

      await loadServices();
    } catch {
      setError("Failed to update availability");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#245C45]">
        My Services
      </h1>

      <p className="mt-2 text-gray-600">
        Manage your wedding services.
      </p>

      {error && (
        <p className="mt-4 text-sm text-red-600">{error}</p>
      )}

      <div className="mt-6">
        {loading ? (
          <p>Loading services...</p>
        ) : services.length === 0 ? (
          <p>No services found.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Approval Status</TableHead>
                <TableHead>Availability</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {services.map((service) => (
                <TableRow key={service._id}>
                  <TableCell>
                    {service.image ? (
                      <Image
                        src={service.image}
                        alt={service.name}
                        width={48}
                        height={48}
                        className="h-12 w-12 rounded object-cover"
                      />
                    ) : (
                      "-"
                    )}
                  </TableCell>

                  <TableCell>{service.name}</TableCell>
                  <TableCell>{service.category}</TableCell>
                  <TableCell>{service.price}</TableCell>

                  <TableCell>
                    <Badge variant="secondary">
                      {service.status}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    {service.isActive === false
                      ? "Inactive"
                      : "Active"}
                  </TableCell>

                  <TableCell>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setViewService(service)}
                      >
                        View
                      </Button>

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(service)}
                      >
                        Edit
                      </Button>

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleAvailability(service)}
                      >
                        {service.isActive === false
                          ? "Activate"
                          : "Deactivate"}
                      </Button>

                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(service._id)}
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

      {/* View Service Dialog */}
      <Dialog
        open={!!viewService}
        onOpenChange={(open) => {
          if (!open) setViewService(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Service Details</DialogTitle>
          </DialogHeader>

          {viewService && (
            <div className="space-y-3">
              {viewService.image && (
                <Image
                  src={viewService.image}
                  alt={viewService.name}
                  width={500}
                  height={300}
                  className="h-48 w-full rounded object-cover"
                />
              )}

              <p><strong>Name:</strong> {viewService.name}</p>
              <p><strong>Category:</strong> {viewService.category}</p>
              <p><strong>Location:</strong> {viewService.location}</p>
              <p><strong>Price:</strong> {viewService.price}</p>
              <p><strong>Description:</strong> {viewService.description}</p>
              <p><strong>Status:</strong> {viewService.status}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Service Dialog */}
      <Dialog
        open={!!editService}
        onOpenChange={(open) => {
          if (!open) {
            setEditService(null);
            setImage(null);
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Service</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <Label>Service Name</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <Label>Category</Label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-md border p-3"
                required
              >
                <option value="">Select category</option>
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label>Description</Label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div>
              <Label>Price</Label>
              <Input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>

            <div>
              <Label>Location</Label>
              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Current Service Image</Label>

              {editService?.image ? (
                <Image
                  src={editService.image}
                  alt={editService.name}
                  width={200}
                  height={120}
                  className="h-28 w-48 rounded object-cover"
                />
              ) : (
                <p className="text-sm text-gray-500">
                  No image uploaded
                </p>
              )}

              <Label htmlFor="edit-image">
                Upload New Image (Optional)
              </Label>

              <Input
                id="edit-image"
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setImage(e.target.files?.[0] || null)
                }
              />
            </div>

            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}

            <Button
              type="submit"
              disabled={updating}
              className="bg-[#245C45]"
            >
              {updating ? "Updating..." : "Update Service"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
