"use client";

import { useState, useEffect } from "react";
import { MdDownload, MdEmail } from "react-icons/md";

type Appointment = {
  id: string;
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

type Transaction = {
  id: string;
  appointmentId: string;
  customerId: string;
  customerName: string;
  serviceType: string;
  amount: number;
  paymentMethod: string;
  date: string;
  status: "Completed";
};

// Mock completed transactions data
const MOCK_COMPLETED_TRANSACTIONS: Transaction[] = [
  {
    id: "txn-001",
    appointmentId: "APT-001",
    customerId: "CUST-001",
    customerName: "John Smith",
    serviceType: "Deep Cleaning",
    amount: 5000,
    paymentMethod: "Credit Card",
    date: "2024-04-08",
    status: "Completed",
  },
  {
    id: "txn-002",
    appointmentId: "APT-002",
    customerId: "CUST-002",
    customerName: "Sarah Johnson",
    serviceType: "Window Cleaning",
    amount: 2000,
    paymentMethod: "Debit Card",
    date: "2024-04-07",
    status: "Completed",
  },
  {
    id: "txn-003",
    appointmentId: "APT-003",
    customerId: "CUST-003",
    customerName: "Mike Wilson",
    serviceType: "Carpet Cleaning",
    amount: 3500,
    paymentMethod: "UPI",
    date: "2024-04-06",
    status: "Completed",
  },
  {
    id: "txn-004",
    appointmentId: "APT-004",
    customerId: "CUST-004",
    customerName: "Emma Davis",
    serviceType: "Office Cleaning",
    amount: 8000,
    paymentMethod: "Bank Transfer",
    date: "2024-04-05",
    status: "Completed",
  },
  {
    id: "txn-005",
    appointmentId: "APT-005",
    customerId: "CUST-005",
    customerName: "David Brown",
    serviceType: "Bathroom Cleaning",
    amount: 1500,
    paymentMethod: "Credit Card",
    date: "2024-04-04",
    status: "Completed",
  },
  {
    id: "txn-006",
    appointmentId: "APT-006",
    customerId: "CUST-006",
    customerName: "Lisa Anderson",
    serviceType: "Full House Cleaning",
    amount: 7500,
    paymentMethod: "Debit Card",
    date: "2024-04-03",
    status: "Completed",
  },
  {
    id: "txn-007",
    appointmentId: "APT-007",
    customerId: "CUST-007",
    customerName: "Robert Taylor",
    serviceType: "Kitchen Cleaning",
    amount: 3000,
    paymentMethod: "UPI",
    date: "2024-04-02",
    status: "Completed",
  },
  {
    id: "txn-008",
    appointmentId: "APT-008",
    customerId: "CUST-008",
    customerName: "Jennifer Martinez",
    serviceType: "General Cleaning",
    amount: 2500,
    paymentMethod: "Credit Card",
    date: "2024-04-01",
    status: "Completed",
  },
];

export default function BillingPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [servicePrices, setServicePrices] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch services from API
        const servicesResponse = await fetch("/api/services");
        const servicesData = await servicesResponse.json();
        const services = servicesData.services || [];

        // Build service pricing map from API
        const priceMap: Record<string, number> = {};
        services.forEach((service: any) => {
          priceMap[service.title] = service.price;
        });
        setServicePrices(priceMap);

        // Fetch appointments
        const response = await fetch("/api/appointments");
        const data = await response.json();
        const appointments = data.appointments || [];

        // Filter for completed appointments and map to transactions
        const completedTransactions: Transaction[] = appointments
          .filter((apt: Appointment & { status: string }) => apt.status === "Completed")
          .map((apt: Appointment & { status: string }, index: number) => ({
            id: apt.id,
            appointmentId: `APT-${String(index + 1).padStart(3, "0")}`,
            customerId: `CUST-${String(index + 1).padStart(3, "0")}`,
            customerName: apt.fullName,
            serviceType: apt.service,
            amount: priceMap[apt.service] || 2500, // Use fetched price or default
            paymentMethod: "Card Payment",
            date: apt.date,
            status: "Completed",
          }));

        // If no completed appointments, use mock data
        setTransactions(completedTransactions.length > 0 ? completedTransactions : MOCK_COMPLETED_TRANSACTIONS);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Use mock data as fallback
        setTransactions(MOCK_COMPLETED_TRANSACTIONS);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDownloadInvoice = (transaction: Transaction) => {
    // Dummy invoice download
    const invoiceContent = `
INVOICE
================================
Invoice ID: INV-${transaction.id.substring(0, 8).toUpperCase()}
Date: ${transaction.date}
Appointment ID: ${transaction.appointmentId}

CUSTOMER DETAILS
================================
Name: ${transaction.customerName}
Customer ID: ${transaction.customerId}

SERVICE DETAILS
================================
Service: ${transaction.serviceType}
Amount: ₹${transaction.amount.toLocaleString("en-IN")}
Payment Method: ${transaction.paymentMethod}
Status: ${transaction.status}

TOTAL: ₹${transaction.amount.toLocaleString("en-IN")}
================================
    `.trim();

    const element = document.createElement("a");
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(invoiceContent));
    element.setAttribute("download", `Invoice-${transaction.id.substring(0, 8)}.txt`);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleEmailInvoice = (transaction: Transaction) => {
    // Dummy email handler
    alert(`Email invoice INV-${transaction.id.substring(0, 8).toUpperCase()} to ${transaction.customerName}`);
  };

  const totalRevenue = transactions.reduce((sum, t) => sum + t.amount, 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="font-light text-slate-600">Loading transactions...</p>
      </div>
    );
  }

  const getPaymentMethodColor = (method: string) => {
    return "bg-green-50 text-green-700"; // All completed payments
  };

  const getStatusColor = (status: string) => {
    return "bg-green-50 text-green-700"; // Only completed status
  };

  return (
    <div className="p-4 md:p-8 min-h-screen">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-light text-slate-900">Billing & Transactions</h1>
        <p className="mt-2 text-sm md:text-base font-light text-slate-500">Manage and track all transactions and invoices</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
        <div className="rounded-lg border border-slate-200 bg-white p-4 md:p-6">
          <p className="font-light text-slate-500 text-xs md:text-sm">Total Revenue</p>
          <p className="mt-2 text-2xl md:text-3xl font-light text-slate-900">₹{totalRevenue.toLocaleString("en-IN")}</p>
          <p className="mt-1 text-xs font-light text-slate-400">{transactions.length} completed transactions</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4 md:p-6">
          <p className="font-light text-slate-500 text-xs md:text-sm">Completed Payments</p>
          <p className="mt-2 text-2xl md:text-3xl font-light text-green-600">₹{totalRevenue.toLocaleString("en-IN")}</p>
          <p className="mt-1 text-xs font-light text-slate-400">{transactions.length} invoices</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4 md:p-6">
          <p className="font-light text-slate-500 text-xs md:text-sm">Average Amount</p>
          <p className="mt-2 text-2xl md:text-3xl font-light text-blue-600">₹{(totalRevenue / Math.max(transactions.length, 1)).toLocaleString("en-IN", {maximumFractionDigits: 0})}</p>
          <p className="mt-1 text-xs font-light text-slate-400">per transaction</p>
        </div>
      </div>

      {/* Transactions Table - Responsive */}
      <div className="rounded-lg border border-slate-200 bg-white overflow-x-auto">
        <table className="w-full border-collapse min-w-max">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-light text-slate-700">
                Invoice ID
              </th>
              <th className="hidden sm:table-cell px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-light text-slate-700">
                Appointment
              </th>
              <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-light text-slate-700">
                Customer
              </th>
              <th className="hidden md:table-cell px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-light text-slate-700">
                Service
              </th>
              <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-light text-slate-700">
                Amount
              </th>
              <th className="hidden lg:table-cell px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-light text-slate-700">
                Payment Method
              </th>
              <th className="hidden sm:table-cell px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-light text-slate-700">
                Date
              </th>
              <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-light text-slate-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={transaction.id} className={index % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                <td className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm font-light text-slate-900">
                  <span className="hidden md:inline">INV-{transaction.id.substring(0, 8).toUpperCase()}</span>
                  <span className="md:hidden">{transaction.appointmentId}</span>
                </td>
                <td className="hidden sm:table-cell px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm font-light text-slate-700">{transaction.appointmentId}</td>
                <td className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm font-light text-slate-700">
                  <div>
                    <p className="font-light text-slate-900 truncate">{transaction.customerName}</p>
                    <p className="text-xs font-light text-slate-500 hidden sm:block">{transaction.customerId}</p>
                  </div>
                </td>
                <td className="hidden md:table-cell px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm font-light text-slate-700">{transaction.serviceType}</td>
                <td className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm font-semibold text-slate-900">₹{transaction.amount.toLocaleString("en-IN")}</td>
                <td className="hidden lg:table-cell px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm">
                  <span className={`inline-block px-2 py-1 rounded-full font-light text-xs ${getPaymentMethodColor(transaction.paymentMethod)}`}>
                    {transaction.paymentMethod}
                  </span>
                </td>
                <td className="hidden sm:table-cell px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm font-light text-slate-700">{transaction.date}</td>
                <td className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm">
                  <div className="flex items-center gap-1 md:gap-2">
                    <button
                      onClick={() => handleDownloadInvoice(transaction)}
                      className="flex items-center gap-1 px-2 md:px-3 py-1 rounded bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors text-xs"
                      title="Download Invoice"
                    >
                      <MdDownload size={14} className="md:w-4 md:h-4" />
                      <span className="hidden md:inline">Download</span>
                    </button>
                    <button
                      onClick={() => handleEmailInvoice(transaction)}
                      className="flex items-center gap-1 px-2 md:px-3 py-1 rounded bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors text-xs"
                      title="Email Invoice"
                    >
                      <MdEmail size={14} className="md:w-4 md:h-4" />
                      <span className="hidden md:inline">Email</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
