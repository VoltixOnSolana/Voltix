import { Geist } from "next/font/google";
import "./globals.css";
import { Providers } from "./provider";
import NavbarLayout from "@/components/navbar-layout";
import FooterLayout from "@/components/footer-layout";
import { createClient } from "@/utils/supabase/server";
import { TokenProvider } from '@/contexts/TokenContext';
import { Toaster } from "@/components/ui/toaster"

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Voltix || Exchange for crypto",
  description: "Voltix is a platform for trading cryptocurrencies.",
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body suppressHydrationWarning className="bg-gray-900 text-white h-full">
        <Providers>
          <TokenProvider>
            <NavbarLayout user={user} />
            {children}
            <FooterLayout />
          </TokenProvider>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
