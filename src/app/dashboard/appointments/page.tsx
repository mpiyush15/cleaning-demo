"use client";

import { useState, useEffect } from "react";
import { MdEventNote, MdAdd, MdSchedule, MdCheckCircle } from "react-icons/md";
import { useSession, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import AssignStaffDropdown from "@/components/AssignStaffDropdown";

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
  assignedStaffId?: string;
  assignedStaffName?: string;
};

const columns = [
  { key: "id", label: "Appointment ID", width: "12%" },
  { key: "fullName", label: "Customer Name", width: "18%" },
  { key: "service", label: "Service", width: "18%" },
  { key: "date", label: "Date", width: "12%" },
  { key: "time", label: "Time", width: "12%" },
  { key: "phone", label: "Phone", width: "15%" },
  { key: "status", label: "Status", width: "13%" },
];

type StaffMember = {
  id: number;
  name: string;
  phone: string;
  specialization: string;
  hourlyRate: number;
};

function StatusDropdown({
  initialStatus,
  appointmentId,
  appointment,
  onStatusChange,
  onJobCreated,
}: {
  initialStatus: string;
  appointmentId: string;
  appointment?: any;
  onStatusChange: (id: string, newStatus: string) => void;
  onJobCreated?: () => void;
}) {
  const [status, setStatus] = useState(initialStatus);
  const [saving, setSaving] = useState(false);
  const [showJobModal, setShowJobModal] = useState(false);
  const [newJobId, setNewJobId] = useState<string | null>(null);

  const statusOptions = ["Pending", "Confirmed", "Completed", "Cancelled"];

  const statusColorMap: Record<string, string> = {
    Confirmed: "bg-emerald-100 text-emerald-700",
    Pending: "bg-amber-100 text-amber-700",
    Completed: "bg-slate-100 text-slate-700",
    Cancelled: "bg-red-100 text-red-700",
  };

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    setSaving(true);

    try {
      const response = await fetch("/api/appointments", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: appointmentId,
          status: newStatus,
        }),
      });

      if (response.ok) {
        onStatusChange(appointmentId, newStatus);
        
        // If status changed to "Confirmed", show job creation modal
        if (newStatus === "Confirmed" && appointment) {
          setShowJobModal(true);
        }
      } else {
        console.error("Failed to update status");
        setStatus(initialStatus);
      }
    } catch (error) {
      console.error("Error updating status:", error);
      setStatus(initialStatus);
    } finally {
      setSaving(false);
    }
  };

  const handleCreateJob = async () => {
    try {
      const jobRes = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          appointmentId: appointmentId,
          customerName: appointment.fullName,
          customerPhone: appointment.phone,
          customerEmail: appointment.email,
          service: appointment.service,
          date: appointment.date,
          time: appointment.time,
          address: appointment.address,
        }),
      });

      if (jobRes.ok) {
        const jobData = await jobRes.json();
        setNewJobId(jobData.job._id);
        setShowJobModal(false);
        onJobCreated?.();
      }
    } catch (error) {
      console.error("Error creating job:", error);
      alert("Failed to create job");
    }
  };

  return (
    <>
      <select
        value={status}
        onChange={handleStatusChange}
        disabled={saving}
        className={`px-3 py-1 rounded-full text-xs font-semibold border-0 cursor-pointer ${
          statusColorMap[status] || "bg-slate-100 text-slate-700"
        } ${saving ? "opacity-50" : ""}`}
      >
        {statusOptions.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>

      {/* Job Creation Modal */}
      {showJobModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Create Job?</h2>
            <p className="text-gray-600 mb-6">
              Create a job for <strong>{appointment?.fullName}</strong> ({appointment?.service}) on <strong>{appointment?.date}</strong>?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowJobModal(false)}
                className="flex-1 px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateJob}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Create Job
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Staff Assignment Modal */}
      {newJobId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Assign Staff to Job</h2>
            <p className="text-gray-600 mb-4">Select a staff member to assign to this job:</p>
            <div className="mb-6">
              <AssignStaffDropdown
                itemId={newJobId}
                itemType="job"
                onUpdate={() => {
                  setNewJobId(null);
                }}
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setNewJobId(null)}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function AppointmentsPage() {
  const { data: session, status } = useSession();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [staffList, setStaffList] = useState<StaffMember[]>([]);

  const fetchAppointments = async () => {
    try {
      const [appointmentsResponse, staffResponse] = await Promise.all([
        fetch("/api/appointments"),
        fetch("/api/staff"),
      ]);

      const appointmentsData = await appointmentsResponse.json();
      const staffData = await staffResponse.json();
      setStaffList(staffData.staff || []);

      if (appointmentsData.appointments && appointmentsData.appointments.length > 0) {
        const formattedAppointments = appointmentsData.appointments.map((apt: any) => ({
          id: apt._id?.substring(0, 8) || apt.id,
          fullName: apt.fullName,
          service: apt.service,
          date: apt.date,
          time: apt.time,
          phone: apt.phone,
          status: apt.status || "Pending",
          assignedStaffId: apt.assignedStaffId,
          assignedStaffName: apt.assignedStaffName,
          _id: apt._id || apt.id,
        }));
        setAppointments(formattedAppointments);
      }
    } catch (error) {
      console.log("Error fetching appointments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleStatusChange = (id: string, newStatus: string) => {
    setAppointments((prevAppointments) =>
      prevAppointments.map((apt) => (apt.id === id ? { ...apt, status: newStatus } : apt))
    );
  };

  const handleJobCreated = () => {
    // Refresh appointments after job creation
    fetchAppointments();
  };

  if (status === "loading") {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Appointments</h1>
          <p className="mt-2 text-slate-600">Manage all cleaning service appointments</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-slate-600">Loading appointments...</p>
          </div>
        ) : appointments.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-600">No appointments yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  {columns.map((col) => (
                    <th key={col.key} className="px-6 py-3 text-left text-sm font-semibold text-slate-700">
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {appointments.map((apt) => (
                  <tr key={apt._id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 text-sm text-slate-900 font-medium">{apt.id}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{apt.fullName}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{apt.service}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{apt.date}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{apt.time}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{apt.phone}</td>
                    <td className="px-6 py-4 text-sm">
                      <StatusDropdown
                        initialStatus={apt.status}
                        appointmentId={apt._id}
                        appointment={apt}
                        onStatusChange={handleStatusChange}
                        onJobCreated={handleJobCreated}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
