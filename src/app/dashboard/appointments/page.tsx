"use client";

import { useState, useEffect } from "react";
import { ModernTable } from "@/components/modern-table";

// Default mock data for fallback
const appointmentsMockData = [
  {
    id: "APT-001",
    customer: "Rajesh Kumar",
    service: "Deep Home Cleaning",
    date: "15 Apr 2026",
    time: "10:00 AM",
    status: "Confirmed",
    phone: "+91 98765 43210",
    assignedStaffId: null as any,
    assignedStaffName: "",
  },
  {
    id: "APT-002",
    customer: "Priya Sharma",
    service: "Bathroom Deep Cleaning",
    date: "15 Apr 2026",
    time: "2:00 PM",
    status: "Pending",
    phone: "+91 99876 54321",
    assignedStaffId: null as any,
    assignedStaffName: "",
  },
  {
    id: "APT-003",
    customer: "Amit Patel",
    service: "Kitchen Detailing",
    date: "16 Apr 2026",
    time: "11:00 AM",
    status: "Confirmed",
    phone: "+91 97654 32109",
    assignedStaffId: null as any,
    assignedStaffName: "",
  },
  {
    id: "APT-004",
    customer: "Neha Gupta",
    service: "Office Cleaning",
    date: "16 Apr 2026",
    time: "3:00 PM",
    status: "Completed",
    phone: "+91 96543 21098",
    assignedStaffId: null as any,
    assignedStaffName: "",
  },
  {
    id: "APT-005",
    customer: "Vikram Singh",
    service: "Deep Home Cleaning",
    date: "17 Apr 2026",
    time: "9:00 AM",
    status: "Confirmed",
    phone: "+91 95432 10987",
    assignedStaffId: null as any,
    assignedStaffName: "",
  },
  {
    id: "APT-006",
    customer: "Ananya Desai",
    service: "Sofa & Carpet Shampooing",
    date: "17 Apr 2026",
    time: "1:00 PM",
    status: "Pending",
    phone: "+91 94321 09876",
    assignedStaffId: null as any,
    assignedStaffName: "",
  },
  {
    id: "APT-007",
    customer: "Rohan Verma",
    service: "Deep Home Cleaning",
    date: "18 Apr 2026",
    time: "10:30 AM",
    status: "Confirmed",
    phone: "+91 93210 98765",
    assignedStaffId: null as any,
    assignedStaffName: "",
  },
  {
    id: "APT-008",
    customer: "Divya Nair",
    service: "Bathroom Deep Cleaning",
    date: "18 Apr 2026",
    time: "4:00 PM",
    status: "Completed",
    phone: "+91 92109 87654",
    assignedStaffId: null as any,
    assignedStaffName: "",
  },
];

const columns = [
  { key: "id", label: "Appointment ID", width: "10%" },
  { key: "fullName", label: "Customer Name", width: "15%" },
  { key: "service", label: "Service", width: "15%" },
  { key: "date", label: "Date", width: "10%" },
  { key: "time", label: "Time", width: "10%" },
  { key: "phone", label: "Phone", width: "12%" },
  { key: "status", label: "Status", width: "11%" },
  { key: "assignedStaff", label: "Assigned Staff", width: "17%" },
];

function StatusDropdown({ initialStatus, appointmentId, onStatusChange }: { initialStatus: string; appointmentId: string; onStatusChange: (id: string, newStatus: string) => void }) {
  const [status, setStatus] = useState(initialStatus);
  const [saving, setSaving] = useState(false);

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
      // Send update to API
      const response = await fetch("/api/appointments", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: appointmentId,
          status: newStatus,
        }),
      });

      if (!response.ok) {
        console.error("Failed to update status");
        setStatus(initialStatus); // Revert on error
      } else {
        // Notify parent component of status change
        onStatusChange(appointmentId, newStatus);
      }
    } catch (error) {
      console.error("Error updating status:", error);
      setStatus(initialStatus); // Revert on error
    } finally {
      setSaving(false);
    }
  };

  return (
    <select
      value={status}
      onChange={handleStatusChange}
      disabled={saving}
      className={`px-3 py-1 rounded-full text-xs font-semibold border-0 cursor-pointer ${statusColorMap[status] || "bg-slate-100 text-slate-700"} ${saving ? "opacity-50" : ""}`}
    >
      {statusOptions.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}

type StaffMember = {
  id: number;
  name: string;
  phone: string;
  specialization: string;
  hourlyRate: number;
};

function AssignStaffDropdown({ appointmentId, initialStaffId, initialStaffName, staffList, onStaffChange }: { appointmentId: string; initialStaffId?: number; initialStaffName?: string; staffList: StaffMember[]; onStaffChange: (id: string, staffId?: number, staffName?: string) => void }) {
  const [staffId, setStaffId] = useState(initialStaffId?.toString() || "");
  const [saving, setSaving] = useState(false);

  const handleStaffChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStaffId = e.target.value;
    const selectedStaff = staffList.find((s) => s.id.toString() === newStaffId);
    
    setStaffId(newStaffId);
    setSaving(true);

    try {
      const response = await fetch("/api/appointments", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: appointmentId,
          assignedStaffId: newStaffId ? parseInt(newStaffId) : undefined,
          assignedStaffName: selectedStaff?.name || undefined,
        }),
      });

      if (response.ok) {
        onStaffChange(appointmentId, newStaffId ? parseInt(newStaffId) : undefined, selectedStaff?.name);
      } else {
        console.error("Failed to update staff");
        setStaffId(initialStaffId?.toString() || "");
      }
    } catch (error) {
      console.error("Error updating staff:", error);
      setStaffId(initialStaffId?.toString() || "");
    } finally {
      setSaving(false);
    }
  };

  return (
    <select
      value={staffId}
      onChange={handleStaffChange}
      disabled={saving}
      className={`px-3 py-1 rounded-lg text-xs border border-slate-300 cursor-pointer focus:outline-none focus:border-slate-900 ${saving ? "opacity-50" : ""}`}
    >
      <option value="">Unassigned</option>
      {staffList.map((staff) => (
        <option key={staff.id} value={staff.id}>
          {staff.name}
        </option>
      ))}
    </select>
  );
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState(appointmentsMockData);
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
        // Convert API data to table format
        const formattedAppointments = appointmentsData.appointments.map((apt: any) => ({
          id: apt.id.substring(0, 8),
          fullName: apt.fullName,
          service: apt.service,
          date: new Date(apt.date).toLocaleDateString("en-IN"),
          time: apt.time,
          phone: apt.phone,
          status: apt.status || "Pending",
          assignedStaffId: apt.assignedStaffId,
          assignedStaffName: apt.assignedStaffName,
        }));
        setAppointments([...formattedAppointments, ...appointmentsMockData]);
      }
    } catch (error) {
      console.log("Using mock data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleStatusChange = (id: string, newStatus: string) => {
    // Update local state immediately
    setAppointments((prevAppointments) =>
      prevAppointments.map((apt) =>
        apt.id === id ? { ...apt, status: newStatus } : apt
      )
    );
  };

  const handleStaffChange = (id: string, staffId?: number, staffName?: string) => {
    // Update local state immediately
    setAppointments((prevAppointments) =>
      prevAppointments.map((apt) =>
        apt.id === id ? { ...apt, assignedStaffId: staffId || null, assignedStaffName: staffName || "" } : apt
      )
    );
  };

  const tableData = appointments.map((apt) => ({
    ...apt,
    status: (
      <StatusDropdown 
        initialStatus={apt.status} 
        appointmentId={apt.id}
        onStatusChange={handleStatusChange}
      />
    ),
    assignedStaff: (
      <AssignStaffDropdown
        appointmentId={apt.id}
        initialStaffId={apt.assignedStaffId}
        initialStaffName={apt.assignedStaffName}
        staffList={staffList}
        onStaffChange={handleStaffChange}
      />
    ),
  }));

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
        ) : (
          <ModernTable columns={columns} data={tableData} />
        )}
      </div>
    </div>
  );
}
