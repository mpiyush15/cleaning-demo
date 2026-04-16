"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import { MdCheckCircle, MdSchedule, MdAdd } from "react-icons/md";

type Appointment = {
  id: string;
  fullName?: string;
  customer?: string;
  phone?: string;
  email?: string;
  service?: string;
  date: string;
  time?: string;
  address?: string;
  notes?: string;
  createdAt?: string;
  status?: string;
};

// Mock data matching appointments page
const appointmentsMockData: Appointment[] = [
  {
    id: "APT-001",
    customer: "Rajesh Kumar",
    fullName: "Rajesh Kumar",
    service: "Deep Home Cleaning",
    date: "15 Apr 2026",
    time: "10:00 AM",
    status: "Confirmed",
    phone: "+91 98765 43210",
    createdAt: new Date(2026, 3, 10).toISOString(),
  },
  {
    id: "APT-002",
    customer: "Priya Sharma",
    fullName: "Priya Sharma",
    service: "Bathroom Deep Cleaning",
    date: "15 Apr 2026",
    time: "2:00 PM",
    status: "Pending",
    phone: "+91 99876 54321",
    createdAt: new Date(2026, 3, 11).toISOString(),
  },
  {
    id: "APT-003",
    customer: "Amit Patel",
    fullName: "Amit Patel",
    service: "Kitchen Detailing",
    date: "16 Apr 2026",
    time: "11:00 AM",
    status: "Confirmed",
    phone: "+91 97654 32109",
    createdAt: new Date(2026, 3, 12).toISOString(),
  },
  {
    id: "APT-004",
    customer: "Neha Gupta",
    fullName: "Neha Gupta",
    service: "Office Cleaning",
    date: "16 Apr 2026",
    time: "3:00 PM",
    status: "Completed",
    phone: "+91 96543 21098",
    createdAt: new Date(2026, 3, 13).toISOString(),
  },
  {
    id: "APT-005",
    customer: "Vikram Singh",
    fullName: "Vikram Singh",
    service: "Deep Home Cleaning",
    date: "17 Apr 2026",
    time: "9:00 AM",
    status: "Confirmed",
    phone: "+91 95432 10987",
    createdAt: new Date(2026, 3, 14).toISOString(),
  },
  {
    id: "APT-006",
    customer: "Ananya Desai",
    fullName: "Ananya Desai",
    service: "Sofa & Carpet Shampooing",
    date: "17 Apr 2026",
    time: "1:00 PM",
    status: "Pending",
    phone: "+91 94321 09876",
    createdAt: new Date(2026, 3, 15).toISOString(),
  },
  {
    id: "APT-007",
    customer: "Rohan Verma",
    fullName: "Rohan Verma",
    service: "Deep Home Cleaning",
    date: "18 Apr 2026",
    time: "10:30 AM",
    status: "Confirmed",
    phone: "+91 93210 98765",
    createdAt: new Date(2026, 3, 16).toISOString(),
  },
  {
    id: "APT-008",
    customer: "Divya Nair",
    fullName: "Divya Nair",
    service: "Bathroom Deep Cleaning",
    date: "18 Apr 2026",
    time: "4:00 PM",
    status: "Completed",
    phone: "+91 92109 87654",
    createdAt: new Date(2026, 3, 17).toISOString(),
  },
];

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    service: "Deep Home Cleaning",
    date: "",
    time: "",
    address: "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);

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
        
        // If API returns appointments, use them; otherwise use mock data
        setAppointments(apiAppointments.length > 0 ? apiAppointments : appointmentsMockData);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        // Use mock data as fallback
        setAppointments(appointmentsMockData);
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

      if (!response.ok) throw new Error("Failed to create appointment");

      // Refresh appointments
      const updatedResponse = await fetch("/api/appointments");
      const updatedData = await updatedResponse.json();
      setAppointments(updatedData.appointments || appointmentsMockData);

      // Reset form and close modal
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        service: "Deep Home Cleaning",
        date: "",
        time: "",
        address: "",
        notes: "",
      });
      setShowModal(false);
      alert("Appointment created successfully!");
    } catch (error) {
      alert("Error creating appointment: " + (error instanceof Error ? error.message : "Unknown error"));
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

  // Get recent 5 appointments (sorted by createdAt, newest first)
  const recentAppointments = [...appointments]
    .sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA;
    })
    .slice(0, 5);

  // Get last 5 completed cleaning sessions
  const completedSessions = [...appointments]
    .filter((apt: Appointment & { status: string }) => apt.status === "Completed")
    .sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA;
    })
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="mb-8 md:mb-12 flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-light text-slate-900">Welcome to Dashboard</h1>
          <p className="mt-2 text-sm md:text-base text-slate-600 font-light">Hello, {session.user?.name || "Admin"}. Manage your cleaning services from here.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors font-light text-sm md:text-base"
        >
          <MdAdd size={20} />
          <span>Create Appointment</span>
        </button>
      </div>

      {/* Two Column Layout - Responsive */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
        {/* Recent 5 Appointments */}
        <div className="rounded-lg border border-slate-200 bg-white overflow-hidden">
          <div className="border-b border-slate-200 bg-slate-50 px-4 md:px-6 py-4">
            <h2 className="text-base md:text-lg font-light text-slate-900 flex items-center gap-2">
              <MdSchedule size={20} />
              <span className="truncate">Recent 5 Appointments</span>
            </h2>
          </div>
          <div>
            {recentAppointments.length === 0 ? (
              <div className="p-6 text-center text-slate-500 font-light">
                No appointments yet
              </div>
            ) : (
              <div className="divide-y divide-slate-200">
                {recentAppointments.map((apt) => (
                  <div key={apt.id} className="p-4 md:p-6 hover:bg-slate-50 transition-colors">
                    <div className="flex items-start justify-between mb-2 gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="font-light text-slate-900 truncate text-sm md:text-base">{apt.fullName || apt.customer}</p>
                        <p className="text-xs md:text-sm font-light text-slate-600 mt-1 truncate">{apt.service}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full font-light flex-shrink-0 ${
                        apt.status === "Completed" ? "bg-green-50 text-green-700" :
                        apt.status === "Confirmed" ? "bg-blue-50 text-blue-700" :
                        "bg-amber-50 text-amber-700"
                      }`}>
                        {apt.status || "Pending"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-3 text-xs font-light text-slate-500">
                      <span>📅 {apt.date}</span>
                      <span>{apt.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Last 5 Completed Cleaning Sessions */}
        <div className="rounded-lg border border-slate-200 bg-white overflow-hidden">
          <div className="border-b border-slate-200 bg-slate-50 px-4 md:px-6 py-4">
            <h2 className="text-base md:text-lg font-light text-slate-900 flex items-center gap-2">
              <MdCheckCircle size={20} />
              <span className="truncate">Last 5 Cleaning Sessions Done</span>
            </h2>
          </div>
          <div>
            {completedSessions.length === 0 ? (
              <div className="p-6 text-center text-slate-500 font-light">
                No completed sessions yet
              </div>
            ) : (
              <div className="divide-y divide-slate-200">
                {completedSessions.map((apt) => (
                  <div key={apt.id} className="p-4 md:p-6 hover:bg-slate-50 transition-colors">
                    <div className="flex items-start justify-between mb-2 gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="font-light text-slate-900 truncate text-sm md:text-base">{apt.fullName || apt.customer}</p>
                        <p className="text-xs md:text-sm font-light text-slate-600 mt-1 truncate">{apt.service}</p>
                      </div>
                      <span className="px-2 py-1 text-xs rounded-full font-light bg-green-50 text-green-700 flex-shrink-0">
                        Completed
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-3 text-xs font-light text-slate-500">
                      <span>📅 {apt.date}</span>
                      <span>✅ {apt.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Create Appointment Modal */}
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
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
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
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
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
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
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
                  onChange={(e) => setFormData({...formData, service: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg font-light focus:outline-none focus:border-slate-900"
                >
                  {serviceOptions.map((s) => (
                    <option key={s} value={s}>{s}</option>
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
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg font-light focus:outline-none focus:border-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-light text-slate-700 mb-1">Time *</label>
                  <input
                    type="time"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg font-light focus:outline-none focus:border-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-light text-slate-700 mb-1">Address *</label>
                <textarea
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg font-light focus:outline-none focus:border-slate-900"
                  placeholder="Full address"
                  rows={2}
                />
              </div>

              <div>
                <label className="block text-sm font-light text-slate-700 mb-1">Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
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
