import type { Metadata } from "next";
import Link from "next/link";
import { BookingForm } from "@/components/booking-form";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Book Cleaning Appointment",
  description: "Schedule professional home and office cleaning in minutes.",
};

export default function BookPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            {/* Left Column - Info */}
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">Book Appointment</p>
              <h1 className="mt-3 font-serif text-4xl font-bold text-slate-900 sm:text-5xl">
                Schedule Your Cleaning
              </h1>
              <p className="mt-4 text-base leading-7 text-slate-600">
                Choose your preferred service, date, and time. Our professional team will confirm your appointment and ensure your home or office gets the perfect cleaning it deserves.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                    <span className="text-2xl">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Quick Booking</h3>
                    <p className="text-sm text-slate-600">Book in under 2 minutes</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                    <span className="text-2xl">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Instant Confirmation</h3>
                    <p className="text-sm text-slate-600">Get appointment details via SMS & Email</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                    <span className="text-2xl">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">100% Safe & Secure</h3>
                    <p className="text-sm text-slate-600">Background-verified professionals</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                    <span className="text-2xl">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Flexible Rescheduling</h3>
                    <p className="text-sm text-slate-600">Reschedule anytime for free</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 rounded-2xl bg-slate-900 p-6 text-white">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">Need Help?</p>
                <p className="mt-3 text-lg font-semibold">Call us anytime</p>
                <p className="mt-2 text-3xl font-bold text-emerald-400">+91 98765 43210</p>
                <p className="mt-2 text-sm text-slate-300">Available 8 AM - 8 PM, Monday to Saturday</p>
              </div>
            </div>

            {/* Right Column - Form */}
            <div>
              <BookingForm />
              <p className="mt-4 text-center text-xs text-slate-600">
                Or go back to{" "}
                <Link href="/" className="font-semibold text-slate-900 underline">
                  homepage
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
