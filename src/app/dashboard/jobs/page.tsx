"use client";

import { useState, useEffect, useCallback } from "react";
import { MdEditNote, MdAddCircleOutline } from "react-icons/md";
import AssignStaffDropdown from "@/components/AssignStaffDropdown";

interface Job {
  _id: string;
  appointmentId: string;
  customerName: string;
  customerPhone: string;
  service: string;
  date: string;
  time: string;
  address: string;
  status: string;
  assignedStaffId?: string;
  assignedStaffName?: string;
  createdAt: string;
}

const statusColors: Record<string, string> = {
  Pending: "bg-yellow-100 text-yellow-800",
  Assigned: "bg-blue-100 text-blue-800",
  "In Progress": "bg-purple-100 text-purple-800",
  Completed: "bg-green-100 text-green-800",
  Cancelled: "bg-red-100 text-red-800",
};

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    appointmentId: "",
    customerName: "",
    customerPhone: "",
    service: "",
    date: "",
    time: "",
    address: "",
  });

  const fetchJobs = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/jobs");
      if (res.ok) {
        const data = await res.json();
        setJobs(data.jobs || []);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleCreateJob = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setFormData({
          appointmentId: "",
          customerName: "",
          customerPhone: "",
          service: "",
          date: "",
          time: "",
          address: "",
        });
        setShowModal(false);
        await fetchJobs();
      }
    } catch (error) {
      console.error("Error creating job:", error);
    }
  };

  const handleDeleteJob = async (id: string) => {
    if (!confirm("Are you sure you want to cancel this job?")) return;
    try {
      // Instead of deleting, set status to Cancelled
      const res = await fetch("/api/jobs", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: "Cancelled" }),
      });

      if (res.ok) {
        await fetchJobs();
      }
    } catch (error) {
      console.error("Error cancelling job:", error);
    }
  };

  const handleStatusChange = async (jobId: string, newStatus: string) => {
    try {
      const res = await fetch("/api/jobs", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: jobId, status: newStatus }),
      });

      if (res.ok) {
        await fetchJobs();
      }
    } catch (error) {
      console.error("Error updating job status:", error);
    }
  };

  const handleStaffAssignment = useCallback(() => {
    fetchJobs();
  }, [fetchJobs]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Loading jobs...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Jobs Management
          </h1>
          <p className="text-gray-600 text-xs sm:text-sm mt-1">
            Manage and assign cleaning jobs to staff
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center gap-2 bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm sm:text-base"
        >
          <MdAddCircleOutline size={18} />
          <span className="hidden sm:inline">Create Job</span>
          <span className="sm:hidden">New</span>
        </button>
      </div>

      {/* Jobs Table - Mobile Card View + Desktop Table */}
      <div>
        {jobs.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-gray-500">No jobs found. Create one to get started!</p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        Customer
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        Service
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        Date & Time
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        Assigned Staff
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {jobs.map((job) => (
                      <tr key={job._id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-900">
                          <div>
                            <p className="font-medium">{job.customerName}</p>
                            <p className="text-gray-500 text-xs">{job.customerPhone}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {job.service}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          <div>
                            <p>{job.date}</p>
                            <p className="text-gray-500 text-xs">{job.time}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <AssignStaffDropdown
                            itemId={job._id}
                            itemType="job"
                            currentStaffId={job.assignedStaffId}
                            currentStaffName={job.assignedStaffName}
                            onUpdate={handleStaffAssignment}
                          />
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <select
                            value={job.status}
                            onChange={(e) =>
                              handleStatusChange(job._id, e.target.value)
                            }
                            className={`px-2 py-1 rounded text-sm font-medium cursor-pointer ${
                              statusColors[job.status] || "bg-gray-100 text-gray-800"
                            }`}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Assigned">Assigned</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
              {jobs.map((job) => (
                <div key={job._id} className="bg-white rounded-lg shadow p-4 border border-gray-200">
                  <div className="space-y-3">
                    {/* Customer Info */}
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-sm">{job.customerName}</h3>
                        <p className="text-gray-500 text-xs">{job.customerPhone}</p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          statusColors[job.status] || "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {job.status}
                      </span>
                    </div>

                    {/* Service & Date */}
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-gray-500 text-xs font-medium">Service</p>
                        <p className="text-gray-900">{job.service}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs font-medium">Date</p>
                        <p className="text-gray-900">{job.date}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs font-medium">Time</p>
                        <p className="text-gray-900">{job.time}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs font-medium">Address</p>
                        <p className="text-gray-900 truncate text-xs">{job.address || "N/A"}</p>
                      </div>
                    </div>

                    {/* Staff Assignment and Status Control */}
                    <div className="border-t pt-3 space-y-3">
                      <div>
                        <label className="text-gray-700 text-xs font-medium block mb-2">
                          Assign Staff
                        </label>
                        <AssignStaffDropdown
                          itemId={job._id}
                          itemType="job"
                          currentStaffId={job.assignedStaffId}
                          currentStaffName={job.assignedStaffName}
                          onUpdate={handleStaffAssignment}
                        />
                      </div>
                      <div>
                        <label className="text-gray-700 text-xs font-medium block mb-2">
                          Update Status
                        </label>
                        <select
                          value={job.status}
                          onChange={(e) =>
                            handleStatusChange(job._id, e.target.value)
                          }
                          className={`w-full px-2 py-2 rounded text-xs font-medium cursor-pointer border ${
                            statusColors[job.status] || "bg-gray-100 text-gray-800"
                          }`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Assigned">Assigned</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Create Job Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
              Create New Job
            </h2>
            <form onSubmit={handleCreateJob} className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Customer Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.customerName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      customerName: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  value={formData.customerPhone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      customerPhone: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Service *
                </label>
                <select
                  required
                  value={formData.service}
                  onChange={(e) =>
                    setFormData({ ...formData, service: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                >
                  <option value="">Select a service</option>
                  <option value="Regular Cleaning">Regular Cleaning</option>
                  <option value="Deep Cleaning">Deep Cleaning</option>
                  <option value="Move-in/Move-out">Move-in/Move-out</option>
                  <option value="Post-Construction">Post-Construction</option>
                </select>
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Time
                </label>
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) =>
                    setFormData({ ...formData, time: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Appointment ID
                </label>
                <input
                  type="text"
                  value={formData.appointmentId}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      appointmentId: e.target.value,
                    })
                  }
                  placeholder="Optional"
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                />
              </div>
              <div className="sm:col-span-2 flex gap-2 sm:gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 sm:flex-none px-3 sm:px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50 text-sm sm:text-base"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm sm:text-base"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
