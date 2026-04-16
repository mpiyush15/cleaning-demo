import { NextResponse } from "next/server";

type Staff = {
  id: number;
  name: string;
  phone: string;
  specialization: string;
  hourlyRate: number;
  createdAt: string;
  status?: "Active" | "Inactive";
};

type StaffInput = Omit<Staff, "id" | "createdAt" | "status">;

declare global {
  var staffStore: Staff[] | undefined;
}

const staff = globalThis.staffStore ?? [];
globalThis.staffStore = staff;

export async function GET() {
  return NextResponse.json({ staff, total: staff.length });
}

export async function POST(request: Request) {
  const payload = (await request.json()) as StaffInput;

  if (!payload.name || !payload.phone || !payload.specialization || !payload.hourlyRate) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }

  const newStaff: Staff = {
    id: Math.max(...staff.map((s) => s.id), 0) + 1,
    name: payload.name,
    phone: payload.phone,
    specialization: payload.specialization,
    hourlyRate: payload.hourlyRate,
    createdAt: new Date().toISOString(),
    status: "Active",
  };

  staff.push(newStaff);
  return NextResponse.json({ message: "Staff member created", staff: newStaff }, { status: 201 });
}

export async function PUT(request: Request) {
  const { id, ...updates } = (await request.json()) as Partial<Staff> & { id: number };

  const staffIndex = staff.findIndex((s) => s.id === id);
  if (staffIndex === -1) {
    return NextResponse.json({ message: "Staff not found" }, { status: 404 });
  }

  staff[staffIndex] = { ...staff[staffIndex], ...updates };
  return NextResponse.json({ message: "Staff updated", staff: staff[staffIndex] });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = parseInt(searchParams.get("id") || "");

  if (!id) {
    return NextResponse.json({ message: "ID is required" }, { status: 400 });
  }

  const staffIndex = staff.findIndex((s) => s.id === id);
  if (staffIndex === -1) {
    return NextResponse.json({ message: "Staff not found" }, { status: 404 });
  }

  const deletedStaff = staff.splice(staffIndex, 1)[0];
  return NextResponse.json({ message: "Staff deleted", staff: deletedStaff });
}
