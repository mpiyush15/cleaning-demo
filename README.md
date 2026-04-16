# Premium Clean Co. Demo (Next.js Full Stack)

Professional, mobile-first cleaning services demo website with:

- Premium landing page design
- Appointment booking form
- Full-stack API route for bookings (`/api/appointments`)
- Responsive UI with Tailwind CSS
- Premium typography with `Playfair Display` + `Inter`

## Run Locally

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Open `http://localhost:3000`

## Available Routes

- `/` → Landing page
- `/book` → Appointment booking page
- `/api/appointments` → GET/POST booking API

## Build and Lint

```bash
npm run lint
npm run build
```

## Notes

- Booking storage is currently in-memory for demo purpose.
- You can provide your database next, and we can connect this API to it.
