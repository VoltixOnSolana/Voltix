import { Suspense } from "react";
import UserPageSkeleton from "./loading";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <Suspense fallback={<UserPageSkeleton />}>
            {/* {children} */}
            <UserPageSkeleton/>
            </Suspense>

  );
}
