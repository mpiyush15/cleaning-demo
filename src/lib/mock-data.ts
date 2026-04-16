export const SERVICES = [
  {
    id: "deep-home",
    title: "Deep Home Cleaning",
    slug: "deep-home-cleaning",
    description: "Complete sanitization for your entire living space",
    longDescription:
      "Our comprehensive deep cleaning service covers every corner of your home. We tackle dust, grime, and hidden allergens using eco-safe products. Includes bedroom deep clean, living area refresh, kitchen sanitation, and bathroom restoration.",
    price: 8999,
    duration: "4-5 hours",
    includes: [
      "Floor deep clean (wet & dry)",
      "All surface wiping & disinfection",
      "Kitchen appliance exteriors",
      "Bathroom tile & fixture scrubbing",
      "Bedroom & living area dusting",
      "Air circulation & odor removal",
    ],
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=400&fit=crop&q=80",
    popular: true,
  },
  {
    id: "bathroom",
    title: "Bathroom Deep Cleaning",
    slug: "bathroom-deep-cleaning",
    description: "Professional bathroom restoration & sanitation",
    longDescription:
      "Expert removal of hard water stains, soap scum, and mold. Every tile, fixture, and corner is meticulously cleaned and disinfected using professional-grade sanitizers safe for your family.",
    price: 2999,
    duration: "1.5-2 hours",
    includes: [
      "Toilet bowl scrubbing & disinfection",
      "Hard water stain removal",
      "Tile & grout cleaning",
      "Mirror & fixture polishing",
      "Mold & mildew treatment",
      "Floor deep clean",
    ],
    image:
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&h=400&fit=crop&q=80",
    popular: false,
  },
  {
    id: "kitchen",
    title: "Kitchen Deep Cleaning",
    slug: "kitchen-deep-cleaning",
    description: "Complete kitchen sanitization & degreasing",
    longDescription:
      "Professional kitchen cleaning with focus on grease removal, appliance sanitation, and food safety. We clean behind and under appliances, scrub cooktops, and disinfect all surfaces.",
    price: 3999,
    duration: "2-2.5 hours",
    includes: [
      "Degreasing cooktop & chimney",
      "Microwave & oven interior clean",
      "Cabinet exterior wiping",
      "Sink & faucet polishing",
      "Counter & backsplash scrubbing",
      "Floor deep clean & disinfection",
    ],
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop&q=80",
    popular: false,
  },
  {
    id: "sofa-carpet",
    title: "Sofa & Carpet Shampooing",
    slug: "sofa-carpet-shampooing",
    description: "Professional fabric & carpet rejuvenation",
    longDescription:
      "Deep shampooing removes embedded dirt, allergens, and odors from all fabric surfaces. Our equipment extracts moisture quickly, preventing mold and ensuring fast drying.",
    price: 4999,
    duration: "2-3 hours",
    includes: [
      "Stain treatment & removal",
      "Carpet shampooing with extraction",
      "Sofa & upholstery cleaning",
      "Odor elimination",
      "Fabric protection coating (optional)",
      "Quick-dry treatment",
    ],
    image:
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&h=400&fit=crop&q=80",
    popular: false,
  },
  {
    id: "office",
    title: "Office Cleaning",
    slug: "office-cleaning",
    description: "Corporate workspace maintenance packages",
    longDescription:
      "Recurring schedules for offices, co-working spaces, and commercial units. We maintain cleanliness standards that impress clients and boost employee productivity.",
    price: 12999,
    duration: "Customizable",
    includes: [
      "Daily or weekly scheduling",
      "Conference room sanitization",
      "Desk & workspace disinfection",
      "Restroom maintenance",
      "Floor & carpet care",
      "Waste management",
    ],
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop&q=80",
    popular: true,
  },
  {
    id: "windows",
    title: "Window & Glass Cleaning",
    slug: "window-glass-cleaning",
    description: "Crystal-clear windows inside and out",
    longDescription:
      "Professional window cleaning with streak-free finish. We handle high-rise properties with safety protocols and eco-friendly glass cleaners.",
    price: 1999,
    duration: "1-1.5 hours",
    includes: [
      "Interior & exterior glass cleaning",
      "Frame & sill wiping",
      "Streak-free finish",
      "Safety protocols for high-rise",
      "Gutter inspection included",
    ],
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=400&fit=crop&q=80",
    popular: false,
  },
];

export const TEAM_MEMBERS = [
  {
    id: 1,
    name: "Rajesh Kumar",
    role: "Cleaning Operations Head",
    years: 12,
    specialization: "Deep Cleaning & Restoration",
    bio: "Started his career 12 years ago. Expert in handling complex cleaning tasks and training staff.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Quality Assurance Manager",
    years: 8,
    specialization: "Bathroom & Kitchen Sanitation",
    bio: "Ensures every cleaning meets our premium standards. Certified in eco-safe cleaning protocols.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 3,
    name: "Vikram Singh",
    role: "Senior Cleaning Specialist",
    years: 7,
    specialization: "Upholstery & Carpet Care",
    bio: "Expert in fabric restoration and carpet shampooing. Handles premium home care.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 4,
    name: "Anjali Patel",
    role: "Customer Relations Officer",
    years: 5,
    specialization: "Client Communication & Booking",
    bio: "Handles all customer inquiries and ensures satisfaction. Available 24/7 support.",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=500&q=60",
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Bandra, Mumbai",
    rating: 5,
    text: "Absolutely professional service! They cleaned corners I didn't even know existed. Deep cleaning was thorough and within the promised time. Highly recommended!",
    service: "Deep Home Cleaning",
    verified: true,
  },
  {
    id: 2,
    name: "Rajesh Mehta",
    location: "Powai, Mumbai",
    rating: 5,
    text: "Best office cleaning service in Mumbai. They maintain consistency and professionalism. Our office looks spotless every morning. Worth every rupee!",
    service: "Office Cleaning",
    verified: true,
  },
  {
    id: 3,
    name: "Neha Desai",
    location: "Andheri, Mumbai",
    rating: 5,
    text: "Got my sofa and carpet cleaned after 2 years. Couldn't believe how fresh they look! The team was polite and worked around our schedule.",
    service: "Sofa & Carpet Shampooing",
    verified: true,
  },
  {
    id: 4,
    name: "Amit Gupta",
    location: "Matunga, Mumbai",
    rating: 5,
    text: "Bathroom cleaning was exceptional. Hard water stains completely gone. They use safe products that don't harm kids or pets. Absolutely satisfied!",
    service: "Bathroom Deep Cleaning",
    verified: true,
  },
  {
    id: 5,
    name: "Kavya Nair",
    location: "Malad, Mumbai",
    rating: 5,
    text: "Kitchen looked brand new after their deep clean. They removed years of grease buildup. Professional, punctual, and friendly team!",
    service: "Kitchen Deep Cleaning",
    verified: true,
  },
];

export const FAQS = [
  {
    id: 1,
    question: "How soon can I book an appointment?",
    answer:
      "You can book appointments as early as the next day. Same-day bookings are available for emergency cleaning (subject to availability). Weekend bookings require 48 hours notice.",
  },
  {
    id: 2,
    question: "What products do you use? Are they safe for kids and pets?",
    answer:
      "We use eco-safe, non-toxic cleaning products certified by health authorities. All products are child-safe and pet-friendly. We can also use your own products if you prefer.",
  },
  {
    id: 3,
    question: "Do you provide your own equipment?",
    answer:
      "Yes, we bring all professional-grade equipment including vacuum cleaners, mops, and carpet shampooing machines. You don't need to arrange anything.",
  },
  {
    id: 4,
    question: "What if I'm not satisfied with the cleaning?",
    answer:
      "We offer 100% satisfaction guarantee. If you're not happy, we'll revisit within 24 hours at no extra cost. Your satisfaction is our priority.",
  },
  {
    id: 5,
    question: "Do you offer subscription/recurring cleaning?",
    answer:
      "Absolutely! We offer weekly, bi-weekly, and monthly plans with special discounts. Corporate clients get customized recurring schedules.",
  },
  {
    id: 6,
    question: "How do you ensure quality and reliability?",
    answer:
      "All staff are background-verified and trained. We conduct quality checks after every service. Regular customer feedback surveys help us maintain standards.",
  },
  {
    id: 7,
    question: "Can you handle bulk/commercial cleaning?",
    answer:
      "Yes, we specialize in large spaces including office buildings, malls, and industrial units. We'll provide custom quotes based on your requirements.",
  },
  {
    id: 8,
    question: "What's your cancellation policy?",
    answer:
      "Free cancellation up to 24 hours before appointment. Late cancellations (within 24 hours) attract 20% of service charge. Emergency cancellations may incur full charge.",
  },
];

export const CONTACT_INFO = {
  phone: "+91 98765 43210",
  email: "bookings@premiumcleanco.com",
  whatsapp: "+91 98765 43210",
  address: "Mumbai, India",
  hours: {
    weekdays: "8:00 AM - 8:00 PM",
    saturday: "8:00 AM - 8:00 PM",
    sunday: "Emergency bookings only",
  },
};
