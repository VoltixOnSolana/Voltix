import { Suspense } from "react";
import TableSkeleton from "./loading-market-table";

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
