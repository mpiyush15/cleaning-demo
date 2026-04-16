"use client";

import { useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { ChevronDown, LogOut, Bell, Menu, X } from "lucide-react";

export function DashboardSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();
  const { data: session } = useSession();

  const menuItems = [
    { label: "Dashboard", href: "/dashboard", icon: "📊" },
    { label: "Appointments", href: "/dashboard/appointments", icon: "📅" },
    { label: "Customers", href: "/dashboard/customers", icon: "👥" },
    { label: "Services", href: "/dashboard/services", icon: "🧹" },
    { label: "Reports", href: "/dashboard/reports", icon: "📈" },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden bg-gradient-to-r from-purple-600 to-purple-700 text-white p-2 rounded-lg"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white transition-transform duration-300 md:translate-x-0 z-40 overflow-y-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="sticky top-0 p-6 border-b border-slate-800 bg-gradient-to-r from-slate-900 to-slate-950">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 font-bold text-white">
              PC
            </div>
            <div>
              <p className="font-serif text-lg font-bold">Premium Clean</p>
              <p className="text-xs text-slate-400">Admin</p>
            </div>
          </Link>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg shadow-purple-500/50"
                    : "text-slate-300 hover:bg-slate-800/50 hover:text-white"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-sm font-medium">{item.label}</span>
                {isActive && <div className="ml-auto h-2 w-2 rounded-full bg-purple-300" />}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-800 bg-gradient-to-t from-slate-950 to-transparent space-y-4">
          <div className="rounded-lg bg-slate-800/50 p-3">
            <p className="text-xs text-slate-400">Logged in as</p>
            <p className="text-sm font-semibold text-slate-100 mt-1">{session?.user?.name}</p>
            <p className="text-xs text-slate-500">{session?.user?.email}</p>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white text-sm font-medium py-2 rounded-lg transition-all duration-200 shadow-lg"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

export function DashboardTopbar() {
  const { data: session } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="fixed right-0 top-0 left-0 md:left-64 border-b border-slate-200 bg-white backdrop-blur-sm z-40">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Welcome back</h1>
          <p className="text-sm text-slate-600">{session?.user?.name}</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="relative rounded-full p-2 hover:bg-slate-100 transition">
            <Bell size={20} className="text-slate-600" />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
          </button>
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex-shrink-0" />
        </div>
      </div>
    </header>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <DashboardSidebar />
      <div className="md:ml-64">
        <DashboardTopbar />
        <main className="pt-24 p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}
