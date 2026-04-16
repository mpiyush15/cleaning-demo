"use client";

import { ModernTable } from "@/components/modern-table";
import { useState, useEffect } from "react";

const mockCustomers = [
  {
    id: "C001",
    fullName: "Rajesh Kumar",
    email: "rajesh.kumar@gmail.com",
    phone: "+91 98765 43210",
    totalBookings: 5,
    totalSpent: "₹24,950",
    status: "Active",
  },
  {
    id: "C002",
    fullName: "Priya Sharma",
    email: "priya.sharma@yahoo.com",
    phone: "+91 98765 43211",
    totalBookings: 3,
    totalSpent: "₹8,997",
    status: "Active",
  },
];

export default function CustomersPage() {
  const [customers, setCustomers] = useState(mockCustomers);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch("/api/appointments");
        const data = await response.json();

        if (data.appointments && data.appointments.length > 0) {
          // Extract unique customers from appointments
          const customerMap = new Map();

          data.appointments.forEach((apt: any) => {
            if (!customerMap.has(apt.fullName)) {
              customerMap.set(apt.fullName, {
                id: `C${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
                fullName: apt.fullName,
                email: apt.email,
                phone: apt.phone,
                totalBookings: 1,
                totalSpent: apt.service === "Deep Home Cleaning" ? "₹8,999" : "₹2,999",
                status: "Active",
              });
            } else {
              const customer = customerMap.get(apt.fullName);
              customer.totalBookings += 1;
            }
          });

          const uniqueCustomers = Array.from(customerMap.values());
          setCustomers([...uniqueCustomers, ...mockCustomers]);
        }
      } catch (error) {
        console.log("Using mock customer data");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const columns = [
    { key: "id", label: "Customer ID", width: "12%" },
    { key: "fullName", label: "Name", width: "18%" },
    { key: "email", label: "Email", width: "20%" },
    { key: "phone", label: "Phone", width: "15%" },
    { key: "totalBookings", label: "Total Bookings", width: "12%" },
    { key: "totalSpent", label: "Total Spent", width: "13%" },
    { key: "status", label: "Status", width: "10%" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Customers</h1>
          <p className="mt-2 text-slate-600">Manage all cleaning service customers</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-slate-600">Loading customers...</p>
          </div>
        ) : (
          <ModernTable columns={columns} data={customers} />
        )}
      </div>
    </div>
  );
}
