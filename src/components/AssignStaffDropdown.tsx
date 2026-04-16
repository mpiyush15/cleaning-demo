"use client";

import { useState, useEffect } from "react";

type StaffMember = {
  _id?: string;
  name: string;
  phone: string;
  specialization: string;
  hourlyRate: number;
  status?: string;
};

interface AssignStaffDropdownProps {
  itemId: string;
  itemType: "appointment" | "job";
  currentStaffId?: string;
  currentStaffName?: string;
  onUpdate?: () => void;
}

export default function AssignStaffDropdown({
  itemId,
  itemType,
  currentStaffId,
  currentStaffName,
  onUpdate,
}: AssignStaffDropdownProps) {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedStaffId, setSelectedStaffId] = useState<string | undefined>(
    currentStaffId
  );

  useEffect(() => {
    setSelectedStaffId(currentStaffId);
  }, [currentStaffId]);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const res = await fetch("/api/staff");
        if (res.ok) {
          const data = await res.json();
          setStaff(data.staff || []);
        }
      } catch (error) {
        console.error("Error fetching staff:", error);
      }
    };
    fetchStaff();
  }, []);

  const handleStaffChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const staffId = value || undefined;

    const selectedStaff = staff.find((s) => s._id === staffId);

    setSelectedStaffId(staffId);
    setLoading(true);

    try {
      const apiEndpoint = itemType === "appointment" ? "/api/appointments" : "/api/jobs";
      const res = await fetch(apiEndpoint, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: itemId,
          assignedStaffId: staffId || null,
          assignedStaffName: selectedStaff?.name || null,
        }),
      });

      if (res.ok) {
        if (onUpdate) onUpdate();
      } else {
        setSelectedStaffId(currentStaffId);
      }
    } catch (error) {
      console.error("Error:", error);
      setSelectedStaffId(currentStaffId);
    } finally {
      setLoading(false);
    }
  };

  return (
    <select
      value={selectedStaffId || ""}
      onChange={handleStaffChange}
      disabled={loading}
      className={`px-2 py-1 rounded text-sm border border-gray-300 cursor-pointer ${loading ? "opacity-50" : ""}`}
    >
      <option value="">Unassigned</option>
      {staff.map((member) => (
        <option key={member._id} value={member._id}>
          {member.name}
        </option>
      ))}
    </select>
  );
}
