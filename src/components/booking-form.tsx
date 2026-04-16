"use client";

import { useState } from "react";

type BookingPayload = {
  fullName: string;
  phone: string;
  email: string;
  service: string;
  date: string;
  time: string;
  address: string;
  notes: string;
};

const serviceOptions = [
  "Deep Home Cleaning",
  "Bathroom Deep Cleaning",
  "Kitchen Deep Cleaning",
  "Sofa & Carpet Shampooing",
  "Office Cleaning",
];

export function BookingForm() {
  const [form, setForm] = useState<BookingPayload>({
    fullName: "",
    phone: "",
    email: "",
    service: serviceOptions[0],
    date: "",
    time: "",
    address: "",
    notes: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(data.message ?? "Unable to submit booking");
      }

      setStatus("success");
      setMessage("Appointment request sent. Our team will call you shortly.");
      setForm({
        fullName: "",
        phone: "",
        email: "",
        service: serviceOptions[0],
        date: "",
        time: "",
        address: "",
        notes: "",
      });
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong.");
    }
  };

  const handleChange = <K extends keyof BookingPayload>(key: K, value: BookingPayload[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full Name" required>
          <input
            value={form.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            required
            className="input"
            placeholder="Your name"
          />
        </Field>
        <Field label="Phone" required>
          <input
            value={form.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            required
            className="input"
            placeholder="10-digit mobile"
          />
        </Field>
      </div>

      <Field label="Email" required>
        <input
          type="email"
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
          required
          className="input"
          placeholder="you@example.com"
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Service" required>
          <select
            value={form.service}
            onChange={(e) => handleChange("service", e.target.value)}
            className="input"
          >
            {serviceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Preferred Date" required>
          <input
            type="date"
            value={form.date}
            onChange={(e) => handleChange("date", e.target.value)}
            required
            className="input"
          />
        </Field>
        <Field label="Preferred Time" required>
          <input
            type="time"
            value={form.time}
            onChange={(e) => handleChange("time", e.target.value)}
            required
            className="input"
          />
        </Field>
      </div>

      <Field label="Address" required>
        <textarea
          value={form.address}
          onChange={(e) => handleChange("address", e.target.value)}
          required
          className="input min-h-24"
          placeholder="Complete service address"
        />
      </Field>

      <Field label="Notes">
        <textarea
          value={form.notes}
          onChange={(e) => handleChange("notes", e.target.value)}
          className="input min-h-20"
          placeholder="Any special instructions"
        />
      </Field>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "submitting" ? "Submitting..." : "Confirm Appointment"}
      </button>

      {message ? (
        <p className={status === "success" ? "text-sm text-emerald-700" : "text-sm text-rose-700"}>{message}</p>
      ) : null}
    </form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-2 text-sm font-medium text-slate-700">
      <span>
        {label}
        {required ? <span className="text-rose-500">*</span> : null}
      </span>
      {children}
    </label>
  );
}
