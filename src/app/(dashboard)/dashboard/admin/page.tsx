
"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

type DashboardData = {
  totalUsers: number;
  totalVendors: number;
  totalCustomers: number;
  totalServices: number;
  pendingServices: number;
  totalTransactions: number;
};

type ApiResponse = {
  success: boolean;
  data: DashboardData;
};

const AdminDashboard = () => {
  const [dashboard, setDashboard] = useState<DashboardData>({
    totalUsers: 0,
    totalVendors: 0,
    totalCustomers: 0,
    totalServices: 0,
    pendingServices: 0,
    totalTransactions: 0,
  });

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const result = await api.get<ApiResponse>(
          "/api/dashboard/overview"
        );

        setDashboard(result.data);
      } catch (error) {
        console.log("Dashboard data loading failed", error);
      }
    };

    fetchDashboard();
  }, []);

  const items = [
    { title: "Total Registered Users", value: dashboard.totalUsers },
    { title: "Total Vendors", value: dashboard.totalVendors },
    { title: "Total Customers", value: dashboard.totalCustomers },
    { title: "Total Services", value: dashboard.totalServices },
    { title: "Pending Services", value: dashboard.pendingServices },
    { title: "Total Transactions", value: dashboard.totalTransactions },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#245C45]">
        Admin Dashboard
      </h1>

      <p className="mt-2 text-gray-600">
        Welcome to your WedPlan Admin Dashboard!
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.title}
            className="rounded-lg border bg-white p-5 shadow-sm"
          >
            <h2 className="text-gray-600">{item.title}</h2>
            <p className="mt-3 text-3xl font-bold text-[#245C45]">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
