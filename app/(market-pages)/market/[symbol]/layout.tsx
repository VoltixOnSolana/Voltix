import { Suspense } from "react";
import LoadingMarketPage from "./loading";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <Suspense fallback={<LoadingMarketPage />}>
        {children}
    </Suspense>

  );
}
