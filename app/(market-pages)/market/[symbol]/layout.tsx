import React, { Suspense } from 'react'
import LoadingMarketPage from './loading'

export default async function LayoutMarketPage({ children }: { children: React.ReactNode }) {
    return (
        <Suspense fallback={<LoadingMarketPage />}>
            {children}
        </Suspense>
    )
}
