import { NextResponse } from "next/server";
import { SERVICES } from "@/lib/mock-data";

type Service = {
  id: number | string;
  title: string;
  description: string;
  price: number;
  duration: string;
  image: string;
  popular: boolean;
};

declare global {
  var servicesStore: Service[] | undefined;
}

// Convert SERVICES mock data to have numeric IDs
const convertedServices = SERVICES.map((s: any, index: number) => ({
  ...s,
  id: index + 1,
}));

const services = globalThis.servicesStore ?? convertedServices;
globalThis.servicesStore = services;

export async function GET() {
  return NextResponse.json({ services, total: services.length });
}

export async function POST(request: Request) {
  const newService = (await request.json()) as Omit<Service, "id">;

  if (!newService.title || !newService.price) {
    return NextResponse.json(
      { message: "Title and price are required" },
      { status: 400 }
    );
  }

  const service: Service = {
    id: Math.max(...services.map((s) => (typeof s.id === "number" ? s.id : 0)), 0) + 1,
    title: newService.title,
    description: newService.description,
    price: newService.price,
    duration: newService.duration,
    image: newService.image,
    popular: newService.popular,
  };

  services.push(service);
  return NextResponse.json({ message: "Service created", service }, { status: 201 });
}

export async function PUT(request: Request) {
  const { id, ...updates } = (await request.json()) as Partial<Service> & { id: number | string };

  const serviceIndex = services.findIndex((s) => s.id === id);
  if (serviceIndex === -1) {
    return NextResponse.json({ message: "Service not found" }, { status: 404 });
  }

  services[serviceIndex] = { ...services[serviceIndex], ...updates };
  return NextResponse.json({ message: "Service updated", service: services[serviceIndex] });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = parseInt(searchParams.get("id") || "");

  if (!id) {
    return NextResponse.json({ message: "ID is required" }, { status: 400 });
  }

  const serviceIndex = services.findIndex((s) => s.id === id);
  if (serviceIndex === -1) {
    return NextResponse.json({ message: "Service not found" }, { status: 404 });
  }

  const deletedService = services.splice(serviceIndex, 1)[0];
  return NextResponse.json({ message: "Service deleted", service: deletedService });
}
