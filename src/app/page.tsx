import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ServicesSection } from "@/components/services-section";
import { TEAM_MEMBERS, TESTIMONIALS, FAQS } from "@/lib/mock-data";
import { FadeInUp, ScaleIn, StaggerContainer, StaggerItem } from "@/components/animations";

const processSteps = [
  {
    number: "01",
    title: "Select Service",
    description: "Choose from our comprehensive cleaning services tailored to your needs.",
  },
  {
    number: "02",
    title: "Set Schedule",
    description: "Pick your preferred date and time that works best for you.",
  },
  {
    number: "03",
    title: "Professional Clean",
    description: "Our team arrives on time and delivers a spotless result guaranteed.",
  },
];

const whyChooseUs = [
  "Experienced & Certified Professionals",
  "Eco-Friendly & Safe Products",
  "Flexible Scheduling",
  "100% Satisfaction Guarantee",
  "Transparent Pricing—No Hidden Fees",
  "Fully Insured & Background-Checked",
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col overflow-hidden">
      <SiteHeader />
      <main className="flex-1 overflow-y-auto">
        {/* Hero Section */}
        <section className="relative isolate overflow-hidden bg-slate-950 min-h-screen flex items-center justify-center">
          <Image
            src="/hero-1.jpg"
            alt="Professional cleaning staff at work"
            fill
            priority
            className="object-cover opacity-40"
          />
          <div className="relative mx-auto w-full max-w-6xl px-3 py-8 sm:px-6 sm:py-12 lg:px-8 flex items-center justify-start">
            <div className="w-full max-w-2xl space-y-4">
              <FadeInUp delay={0.1}>
                <div>
                  <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.15em] text-emerald-300">
                    Professional Deep Cleaning
                  </p>
                </div>
              </FadeInUp>
              <FadeInUp delay={0.2}>
                <div>
                  <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
                    Sparkling Clean Homes & Offices
                  </h1>
                </div>
              </FadeInUp>
              <FadeInUp delay={0.3}>
                <div className="max-w-md">
                  <p className="text-sm sm:text-base leading-6 text-slate-200">
                    Premium deep cleaning with certified professionals. Trusted by 5,000+ families across Mumbai.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 pt-3">
                  <Link
                    href="/book"
                    className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-2.5 sm:px-8 sm:py-3 text-xs sm:text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 whitespace-nowrap"
                  >
                    Book Now
                  </Link>
                  <a
                    href="#services"
                    className="inline-flex items-center justify-center rounded-full border-2 border-white px-6 py-2.5 sm:px-8 sm:py-3 text-xs sm:text-sm font-semibold text-white transition hover:bg-white/10 whitespace-nowrap"
                  >
                    Explore Services
                  </a>
                </div>
                <div className="pt-2">
                  <p className="text-sm text-slate-300">📞 Call anytime: <span className="font-semibold">+91 98765 43210</span></p>
                </div>
              </FadeInUp>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-white py-10 sm:py-12">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <StaggerContainer delay={0.2}>
              <div className="grid gap-6 sm:grid-cols-3">
                <StaggerItem>
                  <div className="text-center">
                    <p className="font-serif text-4xl font-bold text-emerald-600 sm:text-5xl">25+</p>
                    <p className="mt-2 text-lg font-semibold text-slate-900">Years Experience</p>
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <div className="text-center">
                    <p className="font-serif text-4xl font-bold text-emerald-600 sm:text-5xl">5000+</p>
                    <p className="mt-2 text-lg font-semibold text-slate-900">Happy Clients</p>
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <div className="text-center">
                    <p className="font-serif text-4xl font-bold text-emerald-600 sm:text-5xl">4.9/5</p>
                    <p className="mt-2 text-lg font-semibold text-slate-900">Verified Rating</p>
                  </div>
                </StaggerItem>
              </div>
            </StaggerContainer>
          </div>
        </section>

        {/* Services Section */}
        <ServicesSection />

        {/* How It Works */}
        <section className="bg-white py-10 sm:py-12">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <FadeInUp>
              <div className="text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">Process</p>
              <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-bold text-slate-900 text-center">How It Works</h2>
              <p className="mt-3 max-w-2xl text-sm sm:text-base text-slate-600 text-center">
                  Simple 3-step process to get your space sparkling clean.
                </p>
              </div>
            </FadeInUp>
            <StaggerContainer delay={0.2}>
              <div className="mt-10 grid gap-6 sm:grid-cols-3">
                {processSteps.map((step, index) => (
                  <StaggerItem key={index}>
                    <div className="relative">
                      <div className="rounded-2xl border-2 border-emerald-500 bg-white p-5 text-center">
                        <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500">
                          <span className="font-serif text-xl font-bold text-white">{step.number}</span>
                        </div>
                        <h3 className="mt-4 font-serif text-lg font-bold text-slate-900">{step.title}</h3>
                        <p className="mt-2 text-xs text-slate-600">{step.description}</p>
                      </div>
                      {index < processSteps.length - 1 && (
                        <div className="absolute -right-3 top-1/2 hidden h-1 w-6 bg-emerald-500 sm:block" />
                      )}
                    </div>
                  </StaggerItem>
                ))}
              </div>
            </StaggerContainer>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="bg-slate-900 py-10 sm:py-12">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <FadeInUp>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">Why Choose Us</p>
                  <h2 className="mt-3 font-serif text-4xl font-bold text-white sm:text-5xl">
                    Reliable, Affordable & Eco Friendly
                  </h2>
                  <p className="mt-4 text-base text-slate-200">
                    Trusted partner for professional cleaning with skilled team and commitment to excellence.
                  </p>
                  <StaggerContainer delay={0.2}>
                    <ul className="mt-5 space-y-2">
                      {whyChooseUs.map((item, index) => (
                        <StaggerItem key={index}>
                          <li className="flex items-start gap-3">
                            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white text-xs flex-shrink-0">
                              ✓
                            </span>
                            <span className="text-sm text-slate-100">{item}</span>
                          </li>
                        </StaggerItem>
                      ))}
                    </ul>
                  </StaggerContainer>
                </div>
              </FadeInUp>
              <ScaleIn>
                <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=800&q=80"
                    alt="Team cleaning"
                    fill
                    className="object-cover"
                  />
                </div>
              </ScaleIn>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="bg-white py-10 sm:py-12">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <FadeInUp>
              <div className="text-center flex flex-col items-center">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">Our Team</p>
                <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-bold text-slate-900 text-center">
                  Meet Our Professionals
                </h2>
              </div>
            </FadeInUp>
            <StaggerContainer delay={0.2}>
              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {TEAM_MEMBERS.map((member) => (
                  <StaggerItem key={member.id}>
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden shadow-md hover:shadow-lg transition">
                      <div className="relative h-48 w-full bg-slate-200">
                        <Image src={member.image} alt={member.name} fill className="object-cover" />
                      </div>
                      <div className="p-6 text-center">
                        <h3 className="font-semibold text-lg text-slate-900">{member.name}</h3>
                        <p className="mt-1 text-sm font-semibold text-emerald-600">{member.role}</p>
                        <p className="mt-3 text-sm text-slate-600">{member.years} years experience</p>
                        <p className="mt-3 text-sm leading-relaxed text-slate-600">{member.bio}</p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </div>
            </StaggerContainer>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="bg-slate-50 py-10 sm:py-12">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center flex flex-col items-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">Testimonials</p>
              <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-bold text-slate-900 text-center">
                Trusted by Our Customers
              </h2>
              <p className="mt-3 max-w-2xl text-sm sm:text-base text-slate-600 text-center">
                Hear from our satisfied clients about their cleaning experience.
              </p>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {TESTIMONIALS.map((testimonial) => (
                <div key={testimonial.id} className="rounded-2xl bg-white p-5 sm:p-6 shadow-md">
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_idx, i) => (
                      <span key={i} className="text-2xl text-amber-400">
                        ★
                      </span>
                    ))}
                  </div>
                  <blockquote className="mt-6 text-lg text-slate-700">
                    "{testimonial.text}"
                  </blockquote>
                  <div className="mt-6 border-t border-slate-100 pt-6">
                    <p className="font-semibold text-slate-900">{testimonial.name}</p>
                    <p className="mt-1 text-sm text-slate-600">
                      {testimonial.location} • {testimonial.service}
                    </p>
                    {testimonial.verified && (
                      <p className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-emerald-600">
                        ✓ Verified Review
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white py-10 sm:py-12">
          <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center flex flex-col items-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">FAQ</p>
              <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-bold text-slate-900 text-center">
                Frequently Asked Questions
              </h2>
            </div>
            <div className="mt-10 space-y-3">
              {FAQS.map((faq) => (
                <details
                  key={faq.id}
                  className="group rounded-xl border border-slate-200 bg-white shadow-sm text-center"
                >
                  <summary className="flex cursor-pointer items-center justify-between p-4 sm:p-5 font-semibold text-sm sm:text-base text-slate-900 group-open:text-emerald-600">
                    {faq.question}
                    <span className="transition group-open:rotate-180 text-lg">▼</span>
                  </summary>
                  <div className="border-t border-slate-100 px-4 sm:px-5 py-3 sm:py-4">
                    <p className="text-xs sm:text-sm text-slate-600 text-left">{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-emerald-500 to-emerald-600 py-16 sm:py-20">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="font-serif text-4xl font-bold text-white sm:text-5xl">
                Ready for a Spotless Space?
              </h2>
              <p className="mt-6 text-xl text-emerald-50">
                Book your appointment now. Our team will call you to confirm.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Link
                  href="/book"
                  className="inline-flex items-center justify-center rounded-full bg-slate-950 px-8 py-4 text-lg font-semibold text-white transition hover:bg-slate-800"
                >
                  Book Appointment Now
                </Link>
                <a
                  href="tel:+919876543210"
                  className="inline-flex items-center justify-center rounded-full border-2 border-white px-8 py-4 text-lg font-semibold text-white transition hover:bg-white/20"
                >
                  Call +91 98765 43210
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
