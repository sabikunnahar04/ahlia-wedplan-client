
"use client";

import { useEffect, useState } from "react";

import { useSession } from "@/lib/auth-client";
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
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Service = {
  _id?: string;
  id?: string;
  name: string;
  category?: string;
  location?: string;
  price?: number | string;
  status?: string;
  vendorId?: string;
};

const categories = [
  "Photography & Videography",
  "Wedding Venues",
  "Decoration & Florist",
  "Catering Services",
  "Makeup & Styling",
  "Wedding Fashion",
];

const VendorServicesPage = () => {
  const { data: session } = useSession();

  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    let active = true;

    const loadServices = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await api.get<{ data: Service[] }>(
          "/api/services/my-services"
        );

        if (active) {
          setServices(data?.data ?? []);
        }
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : "Failed to load services"
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadServices();

    return () => {
      active = false;
    };
  }, []);

  const userId = session?.user?.id;

  const hasVendorIds = services.some((service) => service.vendorId);

  const visibleServices =
    userId && hasVendorIds
      ? services.filter((service) => service.vendorId === userId)
      : services;

  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await action.post("/api/services", {
        name,
        category,
        location,
        price,
        description,
      });

      const data = await api.get<{ data: Service[] }>(
        "/api/services/my-services"
      );

      setServices(data?.data ?? []);
      setOpen(false);

      setName("");
      setCategory("");
      setLocation("");
      setPrice("");
      setDescription("");
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to add service"
      );
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#245C45]">
            My Services
          </h1>

          <p className="mt-2 text-gray-600">
            Manage your wedding services.
          </p>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger render={<Button />}>
            Add Service
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Service</DialogTitle>

              <DialogDescription>
                Enter the details of your new wedding service.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleAddService} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Service Name</Label>

                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Service Category</Label>

                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border rounded-md p-3"
                  required
                >
                  <option value="">Select a category</option>

                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>

                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>

                <Input
                  id="price"
                  type="number"
                  min="0"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>

                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </div>

              <DialogFooter>
                <Button type="submit">Save</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mt-6">
        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-10 w-full" />
            ))}
          </div>
        ) : error ? (
          <p className="text-sm text-red-600">{error}</p>
        ) : visibleServices.length === 0 ? (
          <p className="text-sm text-gray-500">
            No services found.
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {visibleServices.map((service) => (
                <TableRow
                  key={service._id ?? service.id ?? service.name}
                >
                  <TableCell>{service.name}</TableCell>
                  <TableCell>{service.category ?? "-"}</TableCell>
                  <TableCell>{service.location ?? "-"}</TableCell>
                  <TableCell>
                    {typeof service.price === "number"
                      ? `$${service.price}`
                      : service.price ?? "-"}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {service.status ?? "unknown"}
                    </Badge>
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

export default VendorServicesPage;
