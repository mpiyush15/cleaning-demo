import Link from "next/link";

const navItems = [
  { label: "Services", href: "#services" },
  { label: "Why Us", href: "#why-us" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="font-serif text-lg font-semibold tracking-wide text-white">
          Premium Clean Co.
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm text-slate-200 transition hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="rounded-full border border-emerald-500 px-4 py-2 text-sm font-semibold text-emerald-500 transition hover:bg-emerald-500 hover:text-white"
          >
            Admin
          </Link>
          <Link
            href="/book"
            className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
          >
            Book Now
          </Link>
        </div>
      </div>
    </header>
  );
}
