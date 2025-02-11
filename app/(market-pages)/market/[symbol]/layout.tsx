<<<<<<< HEAD
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
=======
import React, { Suspense } from 'react'
import LoadingMarketPage from './loading'

export default async function LayoutMarketPage({ children }: { children: React.ReactNode }) {
    return (
        <Suspense fallback={<LoadingMarketPage />}>
            {children}
        </Suspense>
    )
>>>>>>> f8b570a (Ajout de l'ui loading d'enzo)
}
