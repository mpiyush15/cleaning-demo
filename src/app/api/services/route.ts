import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import ServiceModel from "@/models/Service";

type ServiceInput = {
  title: string;
  description?: string;
  price: number;
  duration?: string;
  image?: string;
  popular?: boolean;
};

export async function GET() {
  try {
    await connectDB();
    const services = await ServiceModel.find();
    return NextResponse.json({ services, total: services.length });
  } catch (error) {
    console.error("Error fetching services:", error);
    return NextResponse.json(
      { message: "Error fetching services" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const newService = (await request.json()) as ServiceInput;

    if (!newService.title || !newService.price) {
      return NextResponse.json(
        { message: "Title and price are required" },
        { status: 400 }
      );
    }

    const service = await ServiceModel.create({
      title: newService.title,
      description: newService.description || "",
      price: newService.price,
      duration: newService.duration || "",
      image: newService.image || "",
      popular: newService.popular || false,
    });

    return NextResponse.json(
      { message: "Service created", service },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating service:", error);
    return NextResponse.json(
      { message: "Error creating service" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    await connectDB();
    const { id, ...updates } = (await request.json()) as ServiceInput & {
      id: string;
    };

    if (!id) {
      return NextResponse.json(
        { message: "Service ID is required" },
        { status: 400 }
      );
    }

    const service = await ServiceModel.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!service) {
      return NextResponse.json(
        { message: "Service not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Service updated", service });
  } catch (error) {
    console.error("Error updating service:", error);
    return NextResponse.json(
      { message: "Error updating service" },
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

    const service = await ServiceModel.findByIdAndDelete(id);

    if (!service) {
      return NextResponse.json(
        { message: "Service not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Service deleted", service });
  } catch (error) {
    console.error("Error deleting service:", error);
    return NextResponse.json(
      { message: "Error deleting service" },
      { status: 500 }
    );
  }
}
