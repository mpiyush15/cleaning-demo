"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/animations";

type Service = {
  id: number;
  title: string;
  description: string;
  price: number;
  duration: string;
  image: string;
  popular: boolean;
};

export function ServicesSection() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("/api/services");
        const data = await response.json();
        setServices(data.services || []);
      } catch (error) {
        console.error("Failed to fetch services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <section id="services" className="bg-slate-50 py-10 sm:py-12">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-slate-600">Loading services...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="bg-slate-50 py-10 sm:py-12">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <StaggerContainer delay={0.2}>
          <div className="text-center">
            <StaggerItem>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
                Our Services
              </p>
            </StaggerItem>
            <StaggerItem>
              <h2 className="mt-2 font-serif text-4xl font-bold text-slate-900 sm:text-5xl">
                Deep Cleaning Services
              </h2>
            </StaggerItem>
            <StaggerItem>
              <p className="mt-3 max-w-2xl mx-auto text-base text-slate-600">
                Professional cleaning for homes and offices with eco-safe products.
              </p>
            </StaggerItem>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <StaggerItem key={service.id}>
                <div className="group overflow-hidden rounded-2xl bg-white shadow-md transition hover:shadow-xl">
                  <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition group-hover:scale-110"
                    />
                    {service.popular && (
                      <span className="absolute right-3 top-3 rounded-full bg-emerald-500 px-3 py-1 text-xs font-bold text-white">
                        Popular
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-serif text-lg font-bold text-slate-900">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-xs text-slate-600">{service.description}</p>
                    <div className="mt-4 flex items-baseline justify-between">
                      <div>
                        <p className="text-2xl font-bold text-emerald-600">
                          ₹{service.price}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">{service.duration}</p>
                      </div>
                      <Link
                        href="/book"
                        className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-emerald-600"
                      >
                        Book
                      </Link>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  );
}
