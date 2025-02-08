'use server'

import React from 'react'

export default async function MarketPageDetail({ params }: { params: Promise<{ symbol: string }> }) {
  const { symbol } = await params
  return (
    <div>
      <h1>{symbol}</h1>
    </div>
  )
}
