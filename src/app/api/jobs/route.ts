import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import JobModel from "@/models/Job";
import BillingModel from "@/models/Billing";
import ServiceModel from "@/models/Service";
import AppointmentModel from "@/models/Appointment";

export async function GET() {
  try {
    await connectDB();
    const jobs = await JobModel.find().sort({ createdAt: -1 });
    return NextResponse.json({ jobs, total: jobs.length });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { message: "Error fetching jobs" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const payload = (await request.json()) as {
      appointmentId: string;
      customerId?: string;
      customerName: string;
      customerPhone?: string;
      customerEmail?: string;
      service: string;
      date: string;
      time: string;
      address?: string;
    };

    if (!payload.appointmentId || !payload.customerName || !payload.service || !payload.date) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const job = await JobModel.create({
      appointmentId: payload.appointmentId,
      customerId: payload.customerId || "",
      customerName: payload.customerName,
      customerPhone: payload.customerPhone || "",
      customerEmail: payload.customerEmail || "",
      service: payload.service,
      date: payload.date,
      time: payload.time,
      address: payload.address || "",
      status: "Pending",
    });

    return NextResponse.json(
      { message: "Job created", job },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating job:", error);
    return NextResponse.json(
      { message: "Error creating job" },
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
        assignedStaffId?: string | null;
        assignedStaffName?: string | null;
      };

    if (!id) {
      return NextResponse.json(
        { message: "Job ID is required" },
        { status: 400 }
      );
    }

    const updates: any = {};
    
    if (status) updates.status = status;
    if (assignedStaffId !== undefined) updates.assignedStaffId = assignedStaffId;
    if (assignedStaffName !== undefined) updates.assignedStaffName = assignedStaffName || "";

    const job = await JobModel.findByIdAndUpdate(
      id,
      updates,
      { returnDocument: "after" }
    );

    if (!job) {
      return NextResponse.json(
        { message: "Job not found" },
        { status: 404 }
      );
    }

    // Sync appointment status with job status
    if (status && job.appointmentId) {
      try {
        await AppointmentModel.findByIdAndUpdate(
          job.appointmentId,
          { status },
          { returnDocument: "after" }
        );
        console.log(`Appointment ${job.appointmentId} status updated to ${status}`);
      } catch (syncError) {
        console.error("Error syncing appointment status:", syncError);
        // Don't fail the job update if appointment sync fails
      }
    }

    // If job status changed to "Completed", create billing record
    if (status === "Completed") {
      try {
        // Get service price
        const service = await ServiceModel.findOne({ title: job.service });
        const amount = service?.price || 0;

        // Create billing record
        await BillingModel.create({
          jobId: job._id,
          appointmentId: job.appointmentId,
          serviceName: job.service,
          customerName: job.customerName,
          customerPhone: job.customerPhone,
          customerEmail: job.customerEmail,
          assignedStaffName: job.assignedStaffName,
          amount,
          serviceDate: job.date,
          completionDate: new Date(),
          paymentStatus: "pending",
        });

        console.log("Billing record created for completed job:", job._id);
      } catch (billingError) {
        console.error("Error creating billing record:", billingError);
        // Don't fail the job update if billing fails
      }
    }

    return NextResponse.json({
      message: "Job updated",
      job,
    });
  } catch (error) {
    console.error("Error updating job:", error);
    return NextResponse.json(
      { message: "Error updating job" },
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
        { message: "Job ID is required" },
        { status: 400 }
      );
    }

    const job = await JobModel.findByIdAndDelete(id);

    if (!job) {
      return NextResponse.json(
        { message: "Job not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Job deleted", job });
  } catch (error) {
    console.error("Error deleting job:", error);
    return NextResponse.json(
      { message: "Error deleting job" },
      { status: 500 }
    );
  }
}
