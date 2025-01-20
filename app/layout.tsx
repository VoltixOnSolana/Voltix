import { Geist } from "next/font/google";
import "./globals.css";
import { Providers } from "./provider";
import NavbarLayout from "@/components/navbar-layout";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body suppressHydrationWarning className="bg-gray-900 text-white h-screen">
        <Providers>
          <NavbarLayout />
          {children}
        </Providers>
      </body>
    </html>
  );
}
