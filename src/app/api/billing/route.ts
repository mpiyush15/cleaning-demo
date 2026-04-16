import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import BillingModel from "@/models/Billing";

export async function GET(request: Request) {
  try {
    await connectDB();

    const url = new URL(request.url);
    const status = url.searchParams.get("status");

    const query = status ? { paymentStatus: status } : {};
    const billings = await BillingModel.find(query).sort({ createdAt: -1 });

    // Calculate totals
    const totals = {
      pending: billings.filter((b) => b.paymentStatus === "pending").reduce((sum, b) => sum + b.amount, 0),
      paid: billings.filter((b) => b.paymentStatus === "paid").reduce((sum, b) => sum + b.amount, 0),
      refunded: billings.filter((b) => b.paymentStatus === "refunded").reduce((sum, b) => sum + b.amount, 0),
      total: billings.reduce((sum, b) => sum + b.amount, 0),
    };

    return NextResponse.json({ billings, totals, total: billings.length });
  } catch (error: any) {
    console.error("Error fetching billings:", error);
    return NextResponse.json(
      { message: "Error fetching billings", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const payload = await request.json();

    const { jobId, appointmentId, serviceName, customerName, customerPhone, customerEmail, assignedStaffName, amount, serviceDate, paymentStatus, paymentMethod, notes } = payload;

    if (!jobId || !serviceName || !customerName || !amount || !serviceDate) {
      return NextResponse.json(
        { message: "Required fields: jobId, serviceName, customerName, amount, serviceDate" },
        { status: 400 }
      );
    }

    const billing = await BillingModel.create({
      jobId,
      appointmentId,
      serviceName,
      customerName,
      customerPhone,
      customerEmail,
      assignedStaffName,
      amount,
      serviceDate,
      paymentStatus: paymentStatus || "pending",
      paymentMethod,
      notes,
    });

    return NextResponse.json(
      { message: "Billing record created", billing },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating billing:", error);
    return NextResponse.json(
      { message: "Error creating billing", error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    await connectDB();
    const { id, paymentStatus, completionDate, paymentMethod, notes } = await request.json();

    if (!id) {
      return NextResponse.json(
        { message: "Billing ID is required" },
        { status: 400 }
      );
    }

    const updates: any = {};
    if (paymentStatus) updates.paymentStatus = paymentStatus;
    if (completionDate) updates.completionDate = completionDate;
    if (paymentMethod) updates.paymentMethod = paymentMethod;
    if (notes) updates.notes = notes;

    const billing = await BillingModel.findByIdAndUpdate(id, updates, {
      returnDocument: "after",
    });

    if (!billing) {
      return NextResponse.json(
        { message: "Billing record not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Billing record updated", billing },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error updating billing:", error);
    return NextResponse.json(
      { message: "Error updating billing", error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    await connectDB();
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { message: "Billing ID is required" },
        { status: 400 }
      );
    }

    const billing = await BillingModel.findByIdAndDelete(id);

    if (!billing) {
      return NextResponse.json(
        { message: "Billing record not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Billing record deleted", billing },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error deleting billing:", error);
    return NextResponse.json(
      { message: "Error deleting billing", error: error.message },
      { status: 500 }
    );
  }
}
