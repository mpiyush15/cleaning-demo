"use client";

import { useState, useEffect } from "react";
import { ModernTable } from "@/components/modern-table";
import { FiPlus, FiX, FiEdit2, FiTrash2 } from "react-icons/fi";

type Service = {
  id: number;
  title: string;
  description: string;
  price: number;
  duration: string;
  image: string;
  popular: boolean;
};

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    duration: "",
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch("/api/services");
      const data = await response.json();
      setServices(data.services || []);
    } catch (error) {
      console.error("Failed to fetch services:", error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (service?: Service) => {
    if (service) {
      setEditingId(service.id);
      setFormData({
        title: service.title,
        description: service.description,
        price: service.price.toString(),
        duration: service.duration,
      });
    } else {
      setEditingId(null);
      setFormData({ title: "", description: "", price: "", duration: "" });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({ title: "", description: "", price: "", duration: "" });
  };

  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.price) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const method = editingId ? "PUT" : "POST";
      const endpoint = editingId ? `/api/services` : "/api/services";
      const body = editingId
        ? { id: editingId, ...formData, price: parseInt(formData.price), image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=500&q=60", popular: false }
        : { ...formData, price: parseInt(formData.price), image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=500&q=60", popular: false };

      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        await fetchServices();
        closeModal();
      } else {
        alert("Failed to save service");
      }
    } catch (error) {
      console.error("Failed to save service:", error);
      alert("Failed to save service");
    }
  };

  const handleDeleteService = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;

    try {
      const response = await fetch(`/api/services?id=${id}`, { method: "DELETE" });
      if (response.ok) {
        await fetchServices();
      } else {
        alert("Failed to delete service");
      }
    } catch (error) {
      console.error("Failed to delete service:", error);
      alert("Failed to delete service");
    }
  };

  const columns = [
    { key: "id", label: "ID", width: "8%" },
    { key: "title", label: "Service Name", width: "20%" },
    { key: "description", label: "Description", width: "30%" },
    { key: "price", label: "Price", width: "12%", render: (value: unknown) => `₹${value}` },
    { key: "duration", label: "Duration", width: "15%" },
    {
      key: "actions",
      label: "Actions",
      width: "15%",
      render: (_: unknown, item: any) => (
        <div className="flex gap-2">
          <button
            onClick={() => openModal(item)}
            className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 hover:text-slate-900"
            title="Edit"
          >
            <FiEdit2 size={16} />
          </button>
          <button
            onClick={() => handleDeleteService(item.id)}
            className="p-2 hover:bg-red-100 rounded-lg text-red-600"
            title="Delete"
          >
            <FiTrash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Services</h1>
            <p className="mt-2 text-slate-600">Manage all cleaning services - changes update the public website</p>
          </div>
          <button
            onClick={() => openModal()}
            className="inline-flex items-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition font-medium"
          >
            <FiPlus size={20} />
            Add Service
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-slate-600">Loading services...</p>
          </div>
        ) : (
          <ModernTable columns={columns} data={services} />
        )}

        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900">
                  {editingId ? "Edit Service" : "Add New Service"}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-slate-500 hover:text-slate-700"
                >
                  <FiX size={24} />
                </button>
              </div>

              <form onSubmit={handleSaveService} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Service Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="e.g., Deep Home Cleaning"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Service description"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Price (₹) *
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Duration
                    </label>
                    <input
                      type="text"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="e.g., 4-5 hours"
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 font-medium"
                  >
                    {editingId ? "Update" : "Add"} Service
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
