"use client";

import { useSession, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { MdDashboard, MdEventNote, MdPeople, MdLocalOffer, MdAnalytics, MdLogout, MdPayment, MdMenu, MdClose, MdPersonAdd, MdAssignment } from "react-icons/md";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (status === "loading") {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:fixed md:left-0 md:top-0 md:h-screen md:w-64 md:border-r md:border-slate-200 md:bg-white md:pt-6 md:flex md:flex-col">
        {/* Logo */}
        <div className="px-6 pb-8">
          <h1 className="text-2xl font-light text-slate-900">Premium Clean</h1>
          <p className="mt-1 text-xs font-light text-slate-500">Admin Panel</p>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1 px-4 flex-1">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 rounded-lg px-3 py-2 font-light text-slate-700 hover:bg-slate-50"
          >
            <MdDashboard size={20} />
            <span>Dashboard</span>
          </Link>
          <Link
            href="/dashboard/appointments"
            className="flex items-center gap-3 rounded-lg px-3 py-2 font-light text-slate-700 hover:bg-slate-50"
          >
            <MdEventNote size={20} />
            <span>Appointments</span>
          </Link>
          <Link
            href="/dashboard/customers"
            className="flex items-center gap-3 rounded-lg px-3 py-2 font-light text-slate-700 hover:bg-slate-50"
          >
            <MdPeople size={20} />
            <span>Customers</span>
          </Link>
          <Link
            href="/dashboard/services"
            className="flex items-center gap-3 rounded-lg px-3 py-2 font-light text-slate-700 hover:bg-slate-50"
          >
            <MdLocalOffer size={20} />
            <span>Services</span>
          </Link>
          <Link
            href="/dashboard/staff"
            className="flex items-center gap-3 rounded-lg px-3 py-2 font-light text-slate-700 hover:bg-slate-50"
          >
            <MdPersonAdd size={20} />
            <span>Staff</span>
          </Link>
          <Link
            href="/dashboard/jobs"
            className="flex items-center gap-3 rounded-lg px-3 py-2 font-light text-slate-700 hover:bg-slate-50"
          >
            <MdAssignment size={20} />
            <span>Jobs</span>
          </Link>
          <Link
            href="/dashboard/reports"
            className="flex items-center gap-3 rounded-lg px-3 py-2 font-light text-slate-700 hover:bg-slate-50"
          >
            <MdAnalytics size={20} />
            <span>Reports</span>
          </Link>
          <Link
            href="/dashboard/billing"
            className="flex items-center gap-3 rounded-lg px-3 py-2 font-light text-slate-700 hover:bg-slate-50"
          >
            <MdPayment size={20} />
            <span>Billing</span>
          </Link>
        </nav>

        {/* Logout Button */}
        <div className="mt-auto px-4 pb-6 pt-4 border-t border-slate-200">
          <button
            onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
            className="w-full flex items-center gap-3 rounded-lg bg-slate-900 px-3 py-2 font-light text-white hover:bg-slate-800 transition-colors"
          >
            <MdLogout size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Sidebar - Mobile */}
      {sidebarOpen && (
        <aside className="fixed inset-0 z-40 flex md:hidden">
          <div className="w-64 border-r border-slate-200 bg-white flex flex-col">
            {/* Logo */}
            <div className="px-6 pb-8 pt-6">
              <h1 className="text-2xl font-light text-slate-900">Premium Clean</h1>
              <p className="mt-1 text-xs font-light text-slate-500">Admin Panel</p>
            </div>

            {/* Navigation Links */}
            <nav className="space-y-1 px-4 flex-1">
              <Link
                href="/dashboard"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2 font-light text-slate-700 hover:bg-slate-50"
              >
                <MdDashboard size={20} />
                <span>Dashboard</span>
              </Link>
              <Link
                href="/dashboard/appointments"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2 font-light text-slate-700 hover:bg-slate-50"
              >
                <MdEventNote size={20} />
                <span>Appointments</span>
              </Link>
              <Link
                href="/dashboard/customers"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2 font-light text-slate-700 hover:bg-slate-50"
              >
                <MdPeople size={20} />
                <span>Customers</span>
              </Link>
              <Link
                href="/dashboard/services"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2 font-light text-slate-700 hover:bg-slate-50"
              >
                <MdLocalOffer size={20} />
                <span>Services</span>
              </Link>
              <Link
                href="/dashboard/staff"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2 font-light text-slate-700 hover:bg-slate-50"
              >
                <MdPersonAdd size={20} />
                <span>Staff</span>
              </Link>
              <Link
                href="/dashboard/jobs"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2 font-light text-slate-700 hover:bg-slate-50"
              >
                <MdAssignment size={20} />
                <span>Jobs</span>
              </Link>
              <Link
                href="/dashboard/reports"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2 font-light text-slate-700 hover:bg-slate-50"
              >
                <MdAnalytics size={20} />
                <span>Reports</span>
              </Link>
              <Link
                href="/dashboard/billing"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2 font-light text-slate-700 hover:bg-slate-50"
              >
                <MdPayment size={20} />
                <span>Billing</span>
              </Link>
            </nav>

            {/* Logout Button */}
            <div className="mt-auto px-4 pb-6 pt-4 border-t border-slate-200">
              <button
                onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
                className="w-full flex items-center gap-3 rounded-lg bg-slate-900 px-3 py-2 font-light text-white hover:bg-slate-800 transition-colors"
              >
                <MdLogout size={20} />
                <span>Logout</span>
              </button>
            </div>
          </div>
          {/* Overlay */}
          <div className="flex-1 bg-black/50" onClick={() => setSidebarOpen(false)} />
        </aside>
      )}

      {/* Main Content */}
      <main className="w-full md:ml-64 md:w-[calc(100%-256px)]">
        {/* Top Bar */}
        <header className="border-b border-slate-200 bg-white px-4 md:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden flex items-center justify-center"
            >
              {sidebarOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
            </button>
            <div />
            <div className="flex items-center gap-2 md:gap-4">
              <div className="text-right hidden sm:block">
                <p className="font-light text-slate-900 text-sm md:text-base">{session.user?.name || "Admin"}</p>
                <p className="text-xs font-light text-slate-500">{session.user?.role || "Administrator"}</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white font-light">
                {session.user?.name?.charAt(0) || "A"}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <section className="bg-white">{children}</section>
      </main>
    </div>
  );
}
