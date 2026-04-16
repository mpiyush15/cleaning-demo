export function SiteFooter() {
  return (
    <footer id="contact" className="border-t border-slate-200 bg-slate-900">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="font-serif text-2xl font-bold text-white">Premium Clean Co.</h3>
            <p className="mt-4 text-sm leading-relaxed text-slate-300">
              Professional deep cleaning services for homes and offices. Trusted by thousands across Mumbai with certified staff and eco-safe products.
            </p>
          </div>
          <div>
            <h4 className="font-semibold uppercase tracking-[0.15em] text-slate-100">Quick Links</h4>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              <li><a href="#" className="hover:text-emerald-400">Home</a></li>
              <li><a href="#services" className="hover:text-emerald-400">Services</a></li>
              <li><a href="#testimonials" className="hover:text-emerald-400">Testimonials</a></li>
              <li><a href="#contact" className="hover:text-emerald-400">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold uppercase tracking-[0.15em] text-slate-100">Services</h4>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              <li><a href="#" className="hover:text-emerald-400">Deep Cleaning</a></li>
              <li><a href="#" className="hover:text-emerald-400">Kitchen Cleaning</a></li>
              <li><a href="#" className="hover:text-emerald-400">Carpet Shampooing</a></li>
              <li><a href="#" className="hover:text-emerald-400">Office Cleaning</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold uppercase tracking-[0.15em] text-slate-100">Get In Touch</h4>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-1">📞</span>
                <div>
                  <p className="font-semibold text-white">+91 98765 43210</p>
                  <p className="text-xs">Available 24/7</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-1">✉️</span>
                <a href="mailto:bookings@premiumcleanco.com" className="hover:text-emerald-400">
                  bookings@premiumcleanco.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-1">📍</span>
                <p>Mumbai, Maharashtra, India</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-700 pt-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <h5 className="font-semibold text-white">Hours of Operation</h5>
              <ul className="mt-3 space-y-1 text-sm text-slate-400">
                <li>Monday - Saturday: 8:00 AM - 8:00 PM</li>
                <li>Sunday: Emergency bookings only</li>
                <li>Holidays: On-call service available</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-white">Follow Us</h5>
              <div className="mt-3 flex gap-4">
                <a href="#" className="text-slate-400 hover:text-emerald-400">Facebook</a>
                <a href="#" className="text-slate-400 hover:text-emerald-400">Instagram</a>
                <a href="#" className="text-slate-400 hover:text-emerald-400">Twitter</a>
              </div>
            </div>
            <div>
              <h5 className="font-semibold text-white">We Accept</h5>
              <p className="mt-3 text-sm text-slate-400">
                💳 Credit Cards • 🏦 Debit Cards • 💰 UPI • 📲 Digital Wallets
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-700 pt-8 text-center text-sm text-slate-400">
          <p>&copy; 2026 Premium Clean Co. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
