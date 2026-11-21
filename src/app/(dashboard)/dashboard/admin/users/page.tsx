
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

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

  const updateUserStatus = async (id: string, isBlocked: boolean) => {
    try {
      await api.put(`/api/users/${id}/status`, { isBlocked });

      setUsers((previousUsers) =>
        previousUsers.map((user) =>
          user._id === id ? { ...user, isBlocked } : user
        )
      );
    } catch {
      setError("Failed to update user status");
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());

    const matchesRole =
      roleFilter === "all" || user.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#245C45]">
        Manage Users
      </h1>

      <p className="mt-2 text-gray-600">
        Manage customers and vendors.
      </p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Input
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="h-10 rounded-md border px-3"
        >
          <option value="all">All Roles</option>
          <option value="customer">Customer</option>
          <option value="vendor">Vendor</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <div className="mt-6">
        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-10 w-full" />
            ))}
          </div>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : filteredUsers.length === 0 ? (
          <p className="text-gray-500">No users found.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>

                  <TableCell>
                    <Badge variant="secondary">
                      {user.isBlocked ? "Blocked" : "Active"}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <Button
                      size="sm"
                      variant={user.isBlocked ? "default" : "destructive"}
                      onClick={() =>
                        updateUserStatus(user._id, !user.isBlocked)
                      }
                    >
                      {user.isBlocked ? "Unblock" : "Block"}
                    </Button>
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
