"use client";

import { useState } from "react";

// Mock appointment data for analysis
const appointmentsMockData = [
  { id: "APT-001", customer: "Rajesh Kumar", service: "Deep Home Cleaning", date: "15 Apr 2026", amount: 8999, status: "Confirmed" },
  { id: "APT-002", customer: "Priya Sharma", service: "Bathroom Deep Cleaning", date: "15 Apr 2026", amount: 2999, status: "Pending" },
  { id: "APT-003", customer: "Amit Patel", service: "Kitchen Detailing", date: "16 Apr 2026", amount: 3999, status: "Confirmed" },
  { id: "APT-004", customer: "Neha Gupta", service: "Office Cleaning", date: "16 Apr 2026", amount: 5999, status: "Completed" },
  { id: "APT-005", customer: "Vikram Singh", service: "Deep Home Cleaning", date: "17 Apr 2026", amount: 8999, status: "Confirmed" },
  { id: "APT-006", customer: "Anjali Desai", service: "Sofa & Carpet Shampooing", date: "17 Apr 2026", amount: 4999, status: "Completed" },
  { id: "APT-007", customer: "Sanjay Verma", service: "Deep Home Cleaning", date: "18 Apr 2026", amount: 8999, status: "Confirmed" },
  { id: "APT-008", customer: "Divya Nair", service: "Bathroom Deep Cleaning", date: "18 Apr 2026", amount: 2999, status: "Cancelled" },
];

const ReportsPage = () => {
  // Calculate metrics
  const totalAppointments = appointmentsMockData.length;
  const completedAppointments = appointmentsMockData.filter(a => a.status === "Completed").length;
  const confirmedAppointments = appointmentsMockData.filter(a => a.status === "Confirmed").length;
  const pendingAppointments = appointmentsMockData.filter(a => a.status === "Pending").length;
  const cancelledAppointments = appointmentsMockData.filter(a => a.status === "Cancelled").length;

  const totalRevenue = appointmentsMockData
    .filter(a => a.status === "Completed" || a.status === "Confirmed")
    .reduce((sum, a) => sum + a.amount, 0);

  const averageOrderValue = totalRevenue / totalAppointments;

  // Service breakdown
  const serviceBreakdown = appointmentsMockData.reduce((acc: Record<string, { count: number; revenue: number }>, apt) => {
    if (!acc[apt.service]) {
      acc[apt.service] = { count: 0, revenue: 0 };
    }
    acc[apt.service].count += 1;
    if (apt.status === "Completed" || apt.status === "Confirmed") {
      acc[apt.service].revenue += apt.amount;
    }
    return acc;
  }, {});

  // Conversion rate
  const conversionRate = ((completedAppointments + confirmedAppointments) / totalAppointments * 100).toFixed(1);

  // Cancellation rate
  const cancellationRate = ((cancelledAppointments / totalAppointments) * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 px-8 py-6">
        <h1 className="text-3xl font-semibold text-gray-900">Reports & Analytics</h1>
        <p className="mt-1 text-sm text-gray-600">Comprehensive business insights and performance metrics</p>
      </div>

      <div className="px-8 py-8">
        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-12">
          <div className="border border-gray-200 rounded-lg p-6">
            <p className="text-sm font-medium text-gray-600">Total Revenue</p>
            <p className="mt-2 text-2xl font-semibold text-gray-900">₹{totalRevenue.toLocaleString()}</p>
            <p className="mt-1 text-xs text-gray-500">From {completedAppointments + confirmedAppointments} bookings</p>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <p className="text-sm font-medium text-gray-600">Total Bookings</p>
            <p className="mt-2 text-2xl font-semibold text-gray-900">{totalAppointments}</p>
            <p className="mt-1 text-xs text-gray-500">{conversionRate}% conversion rate</p>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <p className="text-sm font-medium text-gray-600">Avg Order Value</p>
            <p className="mt-2 text-2xl font-semibold text-gray-900">₹{Math.round(averageOrderValue).toLocaleString()}</p>
            <p className="mt-1 text-xs text-gray-500">Per booking</p>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <p className="text-sm font-medium text-gray-600">Completion Rate</p>
            <p className="mt-2 text-2xl font-semibold text-gray-900">{((completedAppointments / totalAppointments) * 100).toFixed(0)}%</p>
            <p className="mt-1 text-xs text-gray-500">{completedAppointments} completed</p>
          </div>
        </div>

        {/* Booking Status Breakdown */}
        <div className="mb-12">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Booking Status Breakdown</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="text-xs font-medium text-gray-600 uppercase">Completed</p>
              <p className="mt-2 text-xl font-semibold text-green-600">{completedAppointments}</p>
              <p className="mt-1 text-xs text-gray-500">{((completedAppointments / totalAppointments) * 100).toFixed(0)}%</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="text-xs font-medium text-gray-600 uppercase">Confirmed</p>
              <p className="mt-2 text-xl font-semibold text-blue-600">{confirmedAppointments}</p>
              <p className="mt-1 text-xs text-gray-500">{((confirmedAppointments / totalAppointments) * 100).toFixed(0)}%</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="text-xs font-medium text-gray-600 uppercase">Pending</p>
              <p className="mt-2 text-xl font-semibold text-amber-600">{pendingAppointments}</p>
              <p className="mt-1 text-xs text-gray-500">{((pendingAppointments / totalAppointments) * 100).toFixed(0)}%</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="text-xs font-medium text-gray-600 uppercase">Cancelled</p>
              <p className="mt-2 text-xl font-semibold text-red-600">{cancelledAppointments}</p>
              <p className="mt-1 text-xs text-gray-500">{((cancelledAppointments / totalAppointments) * 100).toFixed(0)}%</p>
            </div>
          </div>
        </div>

        {/* Service Performance */}
        <div className="mb-12">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Service Performance</h2>
          <div className="overflow-x-auto border border-gray-200 rounded-lg">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Service</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Bookings</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Revenue</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Avg Value</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">% of Total</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(serviceBreakdown)
                  .sort((a, b) => b[1].count - a[1].count)
                  .map(([service, data], idx) => (
                    <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">{service}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{data.count}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">₹{data.revenue.toLocaleString()}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">₹{Math.round(data.revenue / data.count).toLocaleString()}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{((data.count / totalAppointments) * 100).toFixed(0)}%</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Appointment Timeline */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Appointments</h2>
          <div className="overflow-x-auto border border-gray-200 rounded-lg">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">ID</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Customer</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Service</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Amount</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Status</th>
                </tr>
              </thead>
              <tbody>
                {appointmentsMockData.map((apt) => (
                  <tr key={apt.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{apt.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{apt.customer}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{apt.service}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">₹{apt.amount.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-3 py-1 rounded text-xs font-medium ${
                          apt.status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : apt.status === "Confirmed"
                            ? "bg-blue-100 text-blue-700"
                            : apt.status === "Pending"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {apt.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
