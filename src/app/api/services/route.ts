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
    let services = await ServiceModel.find();

    // If no services exist, seed them from mock data
    if (services.length === 0) {
      const SERVICES = [
        {
          title: "Deep Home Cleaning",
          description: "Complete sanitization for your entire living space",
          price: 8999,
          duration: "4-5 hours",
          image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=400&fit=crop&q=80",
          popular: true,
        },
        {
          title: "Bathroom Deep Cleaning",
          description: "Professional bathroom restoration & sanitation",
          price: 2999,
          duration: "1.5-2 hours",
          image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&h=400&fit=crop&q=80",
          popular: false,
        },
        {
          title: "Kitchen Deep Cleaning",
          description: "Complete kitchen sanitization & degreasing",
          price: 3999,
          duration: "2-2.5 hours",
          image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop&q=80",
          popular: false,
        },
        {
          title: "Sofa & Carpet Shampooing",
          description: "Professional fabric & carpet rejuvenation",
          price: 4999,
          duration: "2-3 hours",
          image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&h=400&fit=crop&q=80",
          popular: false,
        },
        {
          title: "Office Cleaning",
          description: "Corporate workspace maintenance packages",
          price: 12999,
          duration: "Customizable",
          image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop&q=80",
          popular: true,
        },
        {
          title: "Window & Glass Cleaning",
          description: "Crystal-clear windows inside and out",
          price: 1999,
          duration: "1-1.5 hours",
          image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=400&fit=crop&q=80",
          popular: false,
        },
      ];

      services = await ServiceModel.insertMany(SERVICES);
      console.log("Services seeded successfully");
    }

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
      returnDocument: "after",
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
