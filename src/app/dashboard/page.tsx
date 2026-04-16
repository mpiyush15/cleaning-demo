"use client";

import { useState, useEffect } from "react";
import { MdAdd, MdSchedule, MdCheckCircle } from "react-icons/md";
import { useSession, signOut } from "next-auth/react";
import { redirect } from "next/navigation";

type Appointment = {
  _id: string;
  fullName: string;
  phone: string;
  email: string;
  service: string;
  date: string;
  time: string;
  address: string;
  notes: string;
  createdAt: string;
  status?: string;
};

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    service: "",
    date: "",
    time: "",
    address: "",
    notes: "",
  });

  const serviceOptions = [
    "Deep Home Cleaning",
    "Bathroom Deep Cleaning",
    "Kitchen Deep Cleaning",
    "Sofa & Carpet Shampooing",
    "Office Cleaning",
  ];

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch("/api/appointments");
        const data = await response.json();

        const apiAppointments = data.appointments || [];
        const sorted = [...apiAppointments]
          .sort((a: any, b: any) => {
            const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            return dateB - dateA;
          })
          .slice(0, 10);

        setAppointments(sorted);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleCreateAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Refresh appointments list
        const data = await response.json();
        setAppointments([data.appointment, ...appointments].slice(0, 10));

        // Reset form
        setFormData({
          fullName: "",
          phone: "",
          email: "",
          service: "",
          date: "",
          time: "",
          address: "",
          notes: "",
        });

        setShowModal(false);
      } else {
        alert("Error creating appointment");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error creating appointment");
    } finally {
      setSubmitting(false);
    }
  };

  if (status === "loading") {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!session) {
    redirect("/login");
  }

  const completedSessions = appointments.filter((apt) => apt.status === "Completed");

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="mb-8 md:mb-12 flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-light text-slate-900">Welcome to Dashboard</h1>
          <p className="mt-2 text-sm md:text-base text-slate-600 font-light">
            Hello, {session.user?.name || "Admin"}. Manage your cleaning services from here.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors font-light text-sm md:text-base"
        >
          <MdAdd size={20} />
          <span>Create Appointment</span>
        </button>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
        {/* Recent 10 Appointments */}
        <div className="rounded-lg border border-slate-200 bg-white overflow-hidden">
          <div className="border-b border-slate-200 bg-slate-50 px-4 md:px-6 py-4">
            <h2 className="text-base md:text-lg font-light text-slate-900 flex items-center gap-2">
              <MdSchedule size={20} />
              <span className="truncate">Recent 10 Appointments</span>
            </h2>
          </div>
          <div>
            {loading ? (
              <div className="p-6 text-center text-slate-500 font-light">Loading...</div>
            ) : appointments.length === 0 ? (
              <div className="p-6 text-center text-slate-500 font-light">No appointments yet</div>
            ) : (
              <div className="divide-y divide-slate-200">
                {appointments.map((apt) => (
                  <div key={apt._id} className="p-4 md:p-6 hover:bg-slate-50 transition-colors">
                    <p className="font-medium text-slate-900 text-sm md:text-base">{apt.fullName}</p>
                    <p className="text-xs md:text-sm text-slate-600 mt-1">{apt.service}</p>
                    <p className="text-xs md:text-sm text-slate-500 mt-1">
                      {apt.date} at {apt.time}
                    </p>
                    <div className="mt-2">
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                          apt.status === "Completed"
                            ? "bg-slate-100 text-slate-700"
                            : apt.status === "Confirmed"
                            ? "bg-emerald-100 text-emerald-700"
                            : apt.status === "Pending"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {apt.status || "Pending"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Completed Sessions */}
        <div className="rounded-lg border border-slate-200 bg-white overflow-hidden">
          <div className="border-b border-slate-200 bg-slate-50 px-4 md:px-6 py-4">
            <h2 className="text-base md:text-lg font-light text-slate-900 flex items-center gap-2">
              <MdCheckCircle size={20} />
              <span className="truncate">Completed Sessions</span>
            </h2>
          </div>
          <div>
            {completedSessions.length === 0 ? (
              <div className="p-6 text-center text-slate-500 font-light">No completed sessions</div>
            ) : (
              <div className="divide-y divide-slate-200">
                {completedSessions.map((apt) => (
                  <div key={apt._id} className="p-4 md:p-6 hover:bg-slate-50 transition-colors">
                    <p className="font-medium text-slate-900 text-sm md:text-base">{apt.fullName}</p>
                    <p className="text-xs md:text-sm text-slate-600 mt-1">{apt.service}</p>
                    <p className="text-xs md:text-sm text-slate-500 mt-1">{apt.date}</p>
                    <div className="mt-2">
                      <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                        Completed
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-lg bg-white p-6 md:p-8 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-light text-slate-900 mb-4">Create New Appointment</h2>

            <form onSubmit={handleCreateAppointment} className="space-y-4">
              <div>
                <label className="block text-sm font-light text-slate-700 mb-1">Customer Name *</label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg font-light focus:outline-none focus:border-slate-900"
                  placeholder="John Doe"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-light text-slate-700 mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg font-light focus:outline-none focus:border-slate-900"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-light text-slate-700 mb-1">Phone *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg font-light focus:outline-none focus:border-slate-900"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-light text-slate-700 mb-1">Service *</label>
                <select
                  required
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg font-light focus:outline-none focus:border-slate-900"
                >
                  <option value="">Select a service</option>
                  {serviceOptions.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-light text-slate-700 mb-1">Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg font-light focus:outline-none focus:border-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-light text-slate-700 mb-1">Time *</label>
                  <input
                    type="time"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg font-light focus:outline-none focus:border-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-light text-slate-700 mb-1">Address *</label>
                <textarea
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg font-light focus:outline-none focus:border-slate-900"
                  placeholder="Full address"
                  rows={2}
                />
              </div>

              <div>
                <label className="block text-sm font-light text-slate-700 mb-1">Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg font-light focus:outline-none focus:border-slate-900"
                  placeholder="Additional notes (optional)"
                  rows={2}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 font-light transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 font-light transition-colors disabled:opacity-50"
                >
                  {submitting ? "Creating..." : "Create Appointment"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
