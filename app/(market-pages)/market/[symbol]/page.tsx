'use server'

import React, { Suspense } from 'react'
import type { Metadata } from 'next'
import { getTokenBySymbol, getRecentTransactions, getUserTokenBalance, getUserBalance } from '../../action/marketAction'
import { TokenChart } from '@/components/token-chart'
import { TokenTrade } from '@/components/token-trade'
import { TokenTransactions } from '@/components/token-transactions'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import NumberTicker from '@/components/ui/number-ticker'
import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }: { params: Promise<{ symbol: string }> }): Promise<Metadata> {
  const { symbol } = await params;
  return {
    title: `Token - ${symbol} || Voltix`,
    description: `Token - ${symbol} || Voltix`,
  }
}

export default async function MarketPageDetail({ params }: { params: Promise<{ symbol: string }> }) {
  const { symbol } = await params;
  const token = await getTokenBySymbol(symbol);
  const transactions = await getRecentTransactions(symbol);
  const supabase = createClient();
  const { data: { user } } = await (await supabase).auth.getUser();

  let usd = {
    USDT: 0,
    USDC: 0
  };
  let tokenBalance = 0;

  if (user) {
    const res = await getUserBalance(user.id) as { USDT: number, USDC: number };
    usd = res;
    const userToken = await getUserTokenBalance(user.id, symbol);
    tokenBalance = userToken;
    
  }

  if (!token) {
    return notFound();
  }

  else {
    return (
        <div className="mx-auto p-4 space-y-6 h-full mt-10 min-h-screen">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Graphique principal */}
            <div className="lg:col-span-2">
              <TokenChart token={token} />
            </div>
            {/* Section trading */}
            <div>
              <TokenTrade token={token} user={user} usd={usd} tokenBalance={tokenBalance} />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Statistiques du token */}
            <Card className="bg-[#18181b] border-gray-800">
              <CardHeader>
                <CardTitle>Informations utiles</CardTitle>
              </CardHeader>
                <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Market Cap</span>
                  <NumberTicker value={token.marketCap} isAccueil={true} />
                </div>
                <div className="flex justify-between">
                  <span>Supply</span>
                  <NumberTicker value={token.supply} isAccueil={true} />
                </div>
              </CardContent>
            </Card>
            {/* Transactions récentes */}
            <TokenTransactions transactions={transactions} />
          </div>
        </div>
    )
  }
}