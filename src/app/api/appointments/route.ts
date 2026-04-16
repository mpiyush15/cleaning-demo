import { NextResponse } from "next/server";

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
  assignedStaffId?: number;
  assignedStaffName?: string;
};

type AppointmentInput = Omit<Appointment, "id" | "createdAt">;

declare global {
  var appointmentsStore: Appointment[] | undefined;
}

const appointments = globalThis.appointmentsStore ?? [];
globalThis.appointmentsStore = appointments;

function hasRequiredFields(payload: Partial<AppointmentInput>) {
  return (
    payload.fullName &&
    payload.phone &&
    payload.email &&
    payload.service &&
    payload.date &&
    payload.time &&
    payload.address
  );
}

export async function POST(request: Request) {
  const payload = (await request.json()) as Partial<AppointmentInput>;

  if (!hasRequiredFields(payload)) {
    return NextResponse.json({ message: "Please fill all required fields." }, { status: 400 });
  }

  const appointment: Appointment = {
    id: crypto.randomUUID(),
    fullName: payload.fullName!,
    phone: payload.phone!,
    email: payload.email!,
    service: payload.service!,
    date: payload.date!,
    time: payload.time!,
    address: payload.address!,
    notes: payload.notes ?? "",
    createdAt: new Date().toISOString(),
  };

  appointments.unshift(appointment);

  return NextResponse.json({ message: "Appointment created", appointment }, { status: 201 });
}

export async function GET() {
  return NextResponse.json({ appointments, total: appointments.length });
}

export async function PUT(request: Request) {
  const { id, status, assignedStaffId, assignedStaffName } = (await request.json()) as { 
    id: string; 
    status?: string;
    assignedStaffId?: number;
    assignedStaffName?: string;
  };

  if (!id) {
    return NextResponse.json({ message: "Appointment ID is required" }, { status: 400 });
  }

  const appointmentIndex = appointments.findIndex((apt) => apt.id === id || apt.id.includes(id));

  if (appointmentIndex === -1) {
    return NextResponse.json({ message: "Appointment not found" }, { status: 404 });
  }

  // Update the appointment status or staff assignment
  if (status) {
    appointments[appointmentIndex].status = status;
  }
  if (assignedStaffId) {
    appointments[appointmentIndex].assignedStaffId = assignedStaffId;
  }
  if (assignedStaffName) {
    appointments[appointmentIndex].assignedStaffName = assignedStaffName;
  }

  return NextResponse.json({
    message: "Appointment updated",
    appointment: appointments[appointmentIndex],
  });
}
