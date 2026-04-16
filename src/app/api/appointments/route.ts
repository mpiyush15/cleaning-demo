import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import AppointmentModel from "@/models/Appointment";

type AppointmentInput = {
  fullName: string;
  phone: string;
  email: string;
  service: string;
  date: string;
  time: string;
  address: string;
  notes?: string;
};

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
  try {
    await connectDB();

    const payload = (await request.json()) as Partial<AppointmentInput>;

    if (!hasRequiredFields(payload)) {
      return NextResponse.json(
        { message: "Please fill all required fields." },
        { status: 400 }
      );
    }

    const appointment = await AppointmentModel.create({
      fullName: payload.fullName,
      phone: payload.phone,
      email: payload.email,
      service: payload.service,
      date: payload.date,
      time: payload.time,
      address: payload.address,
      notes: payload.notes ?? "",
    });

    return NextResponse.json(
      { message: "Appointment created", appointment },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating appointment:", error);
    return NextResponse.json(
      { message: "Error creating appointment" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const appointments = await AppointmentModel.find().sort({ createdAt: -1 });
    return NextResponse.json({ appointments, total: appointments.length });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return NextResponse.json(
      { message: "Error fetching appointments" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    await connectDB();

    const { id, status, assignedStaffId, assignedStaffName } =
      (await request.json()) as {
        id: string;
        status?: string;
        assignedStaffId?: number;
        assignedStaffName?: string;
      };

    if (!id) {
      return NextResponse.json(
        { message: "Appointment ID is required" },
        { status: 400 }
      );
    }

    const appointment = await AppointmentModel.findByIdAndUpdate(
      id,
      {
        ...(status && { status }),
        ...(assignedStaffId !== undefined && { assignedStaffId }),
        ...(assignedStaffName && { assignedStaffName }),
      },
      { new: true }
    );

    if (!appointment) {
      return NextResponse.json(
        { message: "Appointment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Appointment updated",
      appointment,
    });
  } catch (error) {
    console.error("Error updating appointment:", error);
    return NextResponse.json(
      { message: "Error updating appointment" },
      { status: 500 }
    );
  }
}
