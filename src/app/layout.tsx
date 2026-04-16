import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Provider } from "@/components/session-provider";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Premium Clean Co. | Professional Cleaning Services",
  description:
    "Professional home and office cleaning services with quick online appointment booking.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
