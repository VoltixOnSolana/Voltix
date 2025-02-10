import { Suspense } from "react";
import TableSkeleton from "./loading";

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
