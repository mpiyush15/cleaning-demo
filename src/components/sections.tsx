import { SERVICES, TEAM_MEMBERS, TESTIMONIALS, FAQS } from "@/lib/mock-data";

export function ServicesGrid() {
  return (
    <section id="services" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
          Our Services
        </p>
        <h2 className="mt-2 font-serif text-3xl font-bold text-slate-900 sm:text-4xl">
          Comprehensive Cleaning Solutions
        </h2>
        <p className="mt-3 max-w-2xl text-base text-slate-600">
          From deep home cleaning to specialized services, we handle every detail with precision and
          care.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service) => (
          <article
            key={service.id}
            className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg"
          >
            <div className="relative h-48 overflow-hidden bg-slate-200">
              <img
                src={service.image}
                alt={service.title}
                className="h-full w-full object-cover transition group-hover:scale-105"
              />
              {service.popular && (
                <div className="absolute right-3 top-3 rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white">
                  Most Popular
                </div>
              )}
            </div>
            <div className="p-5">
              <h3 className="font-serif text-xl font-semibold text-slate-900">{service.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{service.description}</p>
              <div className="mt-4 flex items-baseline justify-between">
                <div>
                  <span className="text-2xl font-bold text-slate-900">₹{service.price}</span>
                  <span className="ml-1 text-xs text-slate-500">({service.duration})</span>
                </div>
              </div>
              <a
                href="/book"
                className="mt-4 block rounded-lg bg-slate-950 px-4 py-2 text-center text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Book Now
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function TeamSection() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
          Our Team
        </p>
        <h2 className="mt-2 font-serif text-3xl font-bold text-slate-900 sm:text-4xl">
          Professional & Verified Staff
        </h2>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {TEAM_MEMBERS.map((member) => (
          <div key={member.id} className="rounded-2xl bg-white p-5 text-center shadow-sm">
            <img
              src={member.image}
              alt={member.name}
              className="mx-auto h-32 w-32 rounded-full object-cover"
            />
            <h3 className="mt-4 font-serif text-lg font-semibold text-slate-900">
              {member.name}
            </h3>
            <p className="text-sm font-medium text-emerald-600">{member.role}</p>
            <p className="mt-1 text-xs text-slate-600">{member.years}+ years experience</p>
            <p className="mt-2 text-xs text-slate-500">{member.specialization}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
            Client Reviews
          </p>
          <h2 className="mt-2 font-serif text-3xl font-bold text-slate-900 sm:text-4xl">
            What Our Clients Say
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((testimonial) => (
            <div key={testimonial.id} className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="flex items-center gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="h-5 w-5 text-amber-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="mt-3 text-sm text-slate-700">{testimonial.text}</p>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-900">{testimonial.name}</p>
                  <p className="text-xs text-slate-600">{testimonial.location}</p>
                </div>
                {testimonial.verified && (
                  <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">
                    ✓ Verified
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FAQSection() {
  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
          Help Center
        </p>
        <h2 className="mt-2 font-serif text-3xl font-bold text-slate-900 sm:text-4xl">
          Frequently Asked Questions
        </h2>
      </div>
      <div className="space-y-4">
        {FAQS.map((faq) => (
          <FAQItem key={faq.id} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </section>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="group rounded-lg border border-slate-200 bg-white p-5">
      <summary className="flex cursor-pointer items-center justify-between font-medium text-slate-900">
        <span>{question}</span>
        <svg
          className="h-5 w-5 transition group-open:rotate-180"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </summary>
      <p className="mt-4 text-sm text-slate-600">{answer}</p>
    </details>
  );
}
