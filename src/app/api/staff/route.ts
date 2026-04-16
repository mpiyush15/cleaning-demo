import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import StaffModel from "@/models/Staff";

type StaffInput = {
  name: string;
  phone: string;
  specialization: string;
  hourlyRate: number;
  status?: "Active" | "Inactive";
};

export async function GET() {
  try {
    await connectDB();
    const staff = await StaffModel.find();
    return NextResponse.json({ staff, total: staff.length });
  } catch (error) {
    console.error("Error fetching staff:", error);
    return NextResponse.json(
      { message: "Error fetching staff" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const payload = (await request.json()) as StaffInput;

    if (!payload.name || !payload.phone || !payload.specialization || !payload.hourlyRate) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const newStaff = await StaffModel.create({
      name: payload.name,
      phone: payload.phone,
      specialization: payload.specialization,
      hourlyRate: payload.hourlyRate,
      status: payload.status || "Active",
    });

    return NextResponse.json(
      { message: "Staff member created", staff: newStaff },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating staff:", error);
    return NextResponse.json(
      { message: "Error creating staff member" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    await connectDB();
    const { id, ...updates } = (await request.json()) as StaffInput & {
      id: string;
    };

    if (!id) {
      return NextResponse.json(
        { message: "Staff ID is required" },
        { status: 400 }
      );
    }

    const staff = await StaffModel.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!staff) {
      return NextResponse.json(
        { message: "Staff not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Staff updated", staff });
  } catch (error) {
    console.error("Error updating staff:", error);
    return NextResponse.json(
      { message: "Error updating staff" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "ID is required" },
        { status: 400 }
      );
    }

    const staff = await StaffModel.findByIdAndDelete(id);

    if (!staff) {
      return NextResponse.json(
        { message: "Staff not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Staff deleted", staff });
  } catch (error) {
    console.error("Error deleting staff:", error);
    return NextResponse.json(
      { message: "Error deleting staff" },
      { status: 500 }
    );
  }
}
