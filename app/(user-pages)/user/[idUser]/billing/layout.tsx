import { Suspense } from "react";
import BillingSkeleton from "./loading-billing";

export default async function BillingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <Suspense fallback={<BillingSkeleton />}>
      {children}
    </Suspense>

  );
}