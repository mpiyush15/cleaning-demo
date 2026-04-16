"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Edit2, Trash2, Download, Mail } from "lucide-react";
import Link from "next/link";
// import { downloadBillingPDF } from "@/utils/pdf-generator";

type Billing = {
  _id: string;
  jobId: string;
  serviceName: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  assignedStaffName?: string;
  amount: number;
  serviceDate: string;
  completionDate?: string;
  paymentStatus: "pending" | "paid" | "refunded";
  paymentMethod?: string;
  notes?: string;
  createdAt: string;
};

export default function BillingPage() {
  const [billings, setBillings] = useState<Billing[]>([]);
  const [totals, setTotals] = useState({ pending: 0, paid: 0, refunded: 0, total: 0 });
  const [filter, setFilter] = useState<"all" | "pending" | "paid" | "refunded">("all");
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPaymentStatus, setEditPaymentStatus] = useState<"pending" | "paid" | "refunded">("pending");

  useEffect(() => {
    fetchBillings();
  }, [filter]);

  const fetchBillings = async () => {
    try {
      setLoading(true);
      const url = filter === "all" ? "/api/billing" : `/api/billing?status=${filter}`;
      const response = await fetch(url);
      const data = await response.json();
      setBillings(data.billings || []);
      setTotals(data.totals || {});
    } catch (error) {
      console.error("Error fetching billings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePaymentStatus = async (billingId: string, status: "pending" | "paid" | "refunded") => {
    try {
      const response = await fetch("/api/billing", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: billingId,
          paymentStatus: status,
        }),
      });

      if (response.ok) {
        setEditingId(null);
        fetchBillings();
      }
    } catch (error) {
      console.error("Error updating billing:", error);
    }
  };

  const handleDelete = async (billingId: string) => {
    if (!window.confirm("Are you sure you want to delete this billing record?")) return;

    try {
      const response = await fetch("/api/billing", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: billingId }),
      });

      if (response.ok) {
        fetchBillings();
      }
    } catch (error) {
      console.error("Error deleting billing:", error);
    }
  };

  const handleDownloadPDF = (billing: Billing) => {
    // For now, create a simple text file as PDF substitute
    const content = `
CLEANING SERVICES INVOICE
Invoice #: ${billing._id.slice(-8).toUpperCase()}
Date: ${new Date(billing.createdAt).toLocaleDateString("en-IN")}
Service Date: ${new Date(billing.serviceDate).toLocaleDateString("en-IN")}

Status: ${billing.paymentStatus.toUpperCase()}

CUSTOMER DETAILS
Name: ${billing.customerName}
Phone: ${billing.customerPhone}
Email: ${billing.customerEmail}

SERVICE DETAILS
Service: ${billing.serviceName}
Assigned Staff: ${billing.assignedStaffName || "Not assigned"}
Payment Method: ${billing.paymentMethod || "Not specified"}

AMOUNT: ₹${billing.amount.toLocaleString("en-IN")}

Thank you for your business!
Generated on: ${new Date().toLocaleString("en-IN")}
    `.trim();
    
    const element = document.createElement("a");
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(content));
    element.setAttribute("download", `Invoice-${billing._id.slice(-8)}-${billing.customerName}.txt`);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleSendEmail = async (billing: Billing) => {
    try {
      const response = await fetch("/api/send-bill-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          billingId: billing._id,
          customerEmail: billing.customerEmail,
          customerName: billing.customerName,
          amount: billing.amount,
          serviceName: billing.serviceName,
          serviceDate: billing.serviceDate,
          paymentStatus: billing.paymentStatus,
        }),
      });

      if (response.ok) {
        alert(`Invoice sent to ${billing.customerEmail}`);
      } else {
        alert("Failed to send email");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Error sending email");
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "paid":
        return "bg-green-100 text-green-800";
      case "refunded":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="flex items-center justify-between bg-white px-6 py-4 shadow-sm">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="text-slate-600 hover:text-slate-900">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold text-slate-900">Billing & Payments</h1>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 bg-white p-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg bg-blue-50 p-4">
          <p className="text-sm text-slate-600">Total Revenue</p>
          <p className="mt-2 text-2xl font-bold text-blue-600">₹{totals.total.toLocaleString()}</p>
        </div>
        <div className="rounded-lg bg-yellow-50 p-4">
          <p className="text-sm text-slate-600">Pending</p>
          <p className="mt-2 text-2xl font-bold text-yellow-600">₹{totals.pending.toLocaleString()}</p>
        </div>
        <div className="rounded-lg bg-green-50 p-4">
          <p className="text-sm text-slate-600">Paid</p>
          <p className="mt-2 text-2xl font-bold text-green-600">₹{totals.paid.toLocaleString()}</p>
        </div>
        <div className="rounded-lg bg-red-50 p-4">
          <p className="text-sm text-slate-600">Refunded</p>
          <p className="mt-2 text-2xl font-bold text-red-600">₹{totals.refunded.toLocaleString()}</p>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 bg-white px-6 py-4 sm:gap-3">
        {(["all", "pending", "paid", "refunded"] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              filter === status
                ? "bg-emerald-500 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Customer</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Service</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Amount</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Service Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-slate-500">
                    Loading...
                  </td>
                </tr>
              ) : billings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-slate-500">
                    No billing records found
                  </td>
                </tr>
              ) : (
                billings.map((billing) => (
                  <tr key={billing._id} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold text-slate-900">{billing.customerName}</p>
                      <p className="text-xs text-slate-600">{billing.customerEmail}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700">{billing.serviceName}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-slate-900">₹{billing.amount.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{formatDate(billing.serviceDate)}</td>
                    <td className="px-6 py-4">
                      {editingId === billing._id ? (
                        <select
                          value={editPaymentStatus}
                          onChange={(e) => setEditPaymentStatus(e.target.value as any)}
                          onBlur={() => handleUpdatePaymentStatus(billing._id, editPaymentStatus)}
                          className="rounded border border-slate-300 px-2 py-1 text-sm"
                          autoFocus
                        >
                          <option value="pending">Pending</option>
                          <option value="paid">Paid</option>
                          <option value="refunded">Refunded</option>
                        </select>
                      ) : (
                        <span
                          onClick={() => {
                            setEditingId(billing._id);
                            setEditPaymentStatus(billing.paymentStatus);
                          }}
                          className={`inline-flex cursor-pointer rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(billing.paymentStatus)}`}
                        >
                          {billing.paymentStatus.charAt(0).toUpperCase() + billing.paymentStatus.slice(1)}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDownloadPDF(billing)}
                          className="rounded p-2 hover:bg-blue-50"
                          title="Download PDF"
                        >
                          <Download className="h-4 w-4 text-blue-600" />
                        </button>
                        <button
                          onClick={() => handleSendEmail(billing)}
                          className="rounded p-2 hover:bg-green-50"
                          title="Send via Email"
                        >
                          <Mail className="h-4 w-4 text-green-600" />
                        </button>
                        <button
                          onClick={() => handleDelete(billing._id)}
                          className="rounded p-2 hover:bg-red-50"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="space-y-3 bg-slate-50 p-4 md:hidden">
        {loading ? (
          <p className="py-8 text-center text-slate-500">Loading...</p>
        ) : billings.length === 0 ? (
          <p className="py-8 text-center text-slate-500">No billing records found</p>
        ) : (
          billings.map((billing) => (
            <div key={billing._id} className="rounded-lg bg-white p-4 shadow-sm">
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <p className="font-semibold text-slate-900">{billing.customerName}</p>
                  <p className="text-xs text-slate-600">{billing.customerEmail}</p>
                </div>
                <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getStatusColor(billing.paymentStatus)}`}>
                  {billing.paymentStatus.charAt(0).toUpperCase() + billing.paymentStatus.slice(1)}
                </span>
              </div>

              <div className="mb-3 grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-xs text-slate-600">Service</p>
                  <p className="font-semibold text-slate-900">{billing.serviceName}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-600">Amount</p>
                  <p className="font-semibold text-emerald-600">₹{billing.amount.toLocaleString()}</p>
                </div>
              </div>

              <div className="mb-3 text-xs text-slate-600">
                <p>Date: {formatDate(billing.serviceDate)}</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleDownloadPDF(billing)}
                  className="flex-1 rounded bg-blue-50 py-2 text-xs font-semibold text-blue-600 hover:bg-blue-100"
                >
                  Download PDF
                </button>
                <button
                  onClick={() => handleSendEmail(billing)}
                  className="flex-1 rounded bg-green-50 py-2 text-xs font-semibold text-green-600 hover:bg-green-100"
                >
                  Email
                </button>
                <button
                  onClick={() => handleDelete(billing._id)}
                  className="flex-1 rounded bg-red-50 py-2 text-xs font-semibold text-red-600 hover:bg-red-100"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
