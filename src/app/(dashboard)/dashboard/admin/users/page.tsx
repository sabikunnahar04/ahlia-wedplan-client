
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

import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
  isBlocked?: boolean;
};

const ManageUsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const result = await api.get<{ data: User[] }>("/api/users");

        setUsers(result.data ?? []);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load users"
        );
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#245C45]">
        Manage Users
      </h1>

      <p className="mt-2 text-gray-600">
        Manage customers and vendors.
      </p>

      <div className="mt-6">
        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-10 w-full" />
            ))}
          </div>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : users.length === 0 ? (
          <p className="text-gray-500">No users found.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {user.isBlocked ? "Blocked" : "Active"}
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

export default ManageUsersPage;
