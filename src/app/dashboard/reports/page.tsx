"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { MdAnalytics } from "react-icons/md";

export default function ReportsPage() {
  const { data: session, status } = useSession();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch("/api/appointments");
        const data = await response.json();
        setAppointments(data.appointments || []);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (status === "loading") {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!session) {
    redirect("/login");
  }

  const totalAppointments = appointments.length;
  const completedAppointments = appointments.filter((a) => a.status === "Completed").length;
  const confirmedAppointments = appointments.filter((a) => a.status === "Confirmed").length;
  const pendingAppointments = appointments.filter((a) => a.status === "Pending").length;
  const cancelledAppointments = appointments.filter((a) => a.status === "Cancelled").length;

  const completionRate = totalAppointments > 0 ? ((completedAppointments / totalAppointments) * 100).toFixed(1) : "0";
  const cancellationRate = totalAppointments > 0 ? ((cancelledAppointments / totalAppointments) * 100).toFixed(1) : "0";

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center gap-3">
          <MdAnalytics size={28} className="text-slate-900" />
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Reports</h1>
            <p className="mt-2 text-slate-600">Analyze your business performance</p>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-slate-600">Loading reports...</p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <p className="text-sm font-light text-slate-600">Total Appointments</p>
                <p className="mt-2 text-3xl font-bold text-slate-900">{totalAppointments}</p>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <p className="text-sm font-light text-slate-600">Completed</p>
                <p className="mt-2 text-3xl font-bold text-emerald-600">{completedAppointments}</p>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <p className="text-sm font-light text-slate-600">Confirmed</p>
                <p className="mt-2 text-3xl font-bold text-blue-600">{confirmedAppointments}</p>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <p className="text-sm font-light text-slate-600">Pending</p>
                <p className="mt-2 text-3xl font-bold text-amber-600">{pendingAppointments}</p>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <p className="text-sm font-light text-slate-600">Cancelled</p>
                <p className="mt-2 text-3xl font-bold text-red-600">{cancelledAppointments}</p>
              </div>
            </div>

            {/* Rates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <p className="text-sm font-light text-slate-600">Completion Rate</p>
                <p className="mt-2 text-3xl font-bold text-slate-900">{completionRate}%</p>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <p className="text-sm font-light text-slate-600">Cancellation Rate</p>
                <p className="mt-2 text-3xl font-bold text-slate-900">{cancellationRate}%</p>
              </div>
            </div>

            {/* Recent Appointments */}
            {appointments.length > 0 && (
              <div className="rounded-lg border border-slate-200 bg-white overflow-hidden">
                <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
                  <h2 className="text-lg font-semibold text-slate-900">Recent Appointments</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Customer</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Service</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Date</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {appointments.slice(0, 10).map((apt) => (
                        <tr key={apt._id} className="hover:bg-slate-50">
                          <td className="px-6 py-4 text-sm text-slate-900">{apt.fullName}</td>
                          <td className="px-6 py-4 text-sm text-slate-600">{apt.service}</td>
                          <td className="px-6 py-4 text-sm text-slate-600">{apt.date}</td>
                          <td className="px-6 py-4 text-sm">
                            <span
                              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                                apt.status === "Completed"
                                  ? "bg-emerald-100 text-emerald-700"
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
            )}
          </div>
        )}
      </div>
    </div>
  );
}
