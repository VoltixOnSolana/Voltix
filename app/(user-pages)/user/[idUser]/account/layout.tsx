import { Suspense } from "react";
import UserPageActifSkeleton from "./loading-actif";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <Suspense fallback={<UserPageActifSkeleton />}>
      {children}
    </Suspense>

  );
}
