"use client";

import { useState, useEffect } from "react";
import { MdDelete, MdEdit, MdAdd } from "react-icons/md";

type Staff = {
  _id?: string;
  id?: number;
  name: string;
  phone: string;
  specialization: string;
  hourlyRate: number;
  status: "Active" | "Inactive";
};

export default function StaffPage() {
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    specialization: "",
    hourlyRate: "",
  });

  const specializations = [
    "General Cleaning",
    "Deep Cleaning",
    "Carpet Cleaning",
    "Window Cleaning",
    "Kitchen Cleaning",
    "Bathroom Cleaning",
    "Office Cleaning",
  ];

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const response = await fetch("/api/staff");
      const data = await response.json();
      setStaffList(data.staff || []);
    } catch (error) {
      console.error("Error fetching staff:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (staffMember?: Staff) => {
    if (staffMember) {
      setFormData({
        name: staffMember.name,
        phone: staffMember.phone,
        specialization: staffMember.specialization,
        hourlyRate: staffMember.hourlyRate.toString(),
      });
      setEditingId(staffMember._id || null);
    } else {
      setFormData({
        name: "",
        phone: "",
        specialization: "",
        hourlyRate: "",
      });
      setEditingId(null);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
    setFormData({
      name: "",
      phone: "",
      specialization: "",
      hourlyRate: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const url = editingId ? "/api/staff" : "/api/staff";
      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...(editingId && { id: editingId }),
          name: formData.name,
          phone: formData.phone,
          specialization: formData.specialization,
          hourlyRate: parseFloat(formData.hourlyRate),
        }),
      });

      if (response.ok) {
        await fetchStaff();
        handleCloseModal();
      } else {
        alert("Error saving staff member");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error saving staff member");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string | number | undefined) => {
    if (!confirm("Are you sure you want to delete this staff member?")) return;

    try {
      const response = await fetch(`/api/staff?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchStaff();
      } else {
        alert("Error deleting staff member");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error deleting staff member");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Staff Management</h1>
            <p className="mt-2 text-slate-600">Manage cleaning staff members</p>
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-white hover:bg-slate-800 transition-colors"
          >
            <MdAdd size={20} />
            <span className="hidden sm:inline">Add Staff</span>
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-slate-600">Loading staff...</p>
          </div>
        ) : staffList.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-600">No staff members yet. Create your first one!</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Phone</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Specialization</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Hourly Rate</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Status</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-slate-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {staffList.map((member) => (
                  <tr key={member._id || member.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-slate-900 font-medium">{member.name}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{member.phone}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{member.specialization}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">₹{member.hourlyRate}/hr</td>
                    <td className="px-6 py-4 text-sm">
                      <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                        {member.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleOpenModal(member)}
                          className="p-2 text-slate-600 hover:bg-slate-100 rounded transition-colors"
                          title="Edit"
                        >
                          <MdEdit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(member._id || member.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Delete"
                        >
                          <MdDelete size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-lg bg-white p-6 md:p-8">
            <h2 className="text-2xl font-light text-slate-900 mb-4">
              {editingId ? "Edit Staff Member" : "Add New Staff Member"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-light text-slate-700 mb-1">Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg font-light focus:outline-none focus:border-slate-900"
                  placeholder="Staff member name"
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

              <div>
                <label className="block text-sm font-light text-slate-700 mb-1">Specialization *</label>
                <select
                  required
                  value={formData.specialization}
                  onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg font-light focus:outline-none focus:border-slate-900"
                >
                  <option value="">Select specialization</option>
                  {specializations.map((spec) => (
                    <option key={spec} value={spec}>
                      {spec}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-light text-slate-700 mb-1">Hourly Rate (₹) *</label>
                <input
                  type="number"
                  required
                  value={formData.hourlyRate}
                  onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg font-light focus:outline-none focus:border-slate-900"
                  placeholder="500"
                  min="0"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 font-light transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 font-light transition-colors disabled:opacity-50"
                >
                  {submitting ? "Saving..." : editingId ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
