import { Suspense } from "react";
import TableSkeleton from "./loading-market-table";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Market | Voltix",
  description: "Market | Voltix",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <Suspense fallback={<TableSkeleton />}>
        {children}
    </Suspense>

  );
}
