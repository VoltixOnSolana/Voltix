"use server"

import React from 'react'
import type { Metadata } from 'next'
import { TokenChart } from '@/components/token-chart'
import { TokenTrade } from '@/components/token-trade'
import { TokenTransactions } from '@/components/token-transactions'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import NumberTicker from '@/components/ui/number-ticker'
import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import { url } from '@/lib/utils'
import prisma from '@/utils/prisma'

export async function generateMetadata({ params }: { params: Promise<{ symbol: string }> }): Promise<Metadata> {
  const { symbol } = await params;
  return {
    title: `Token - ${symbol} || Voltix`,
    description: `Token - ${symbol} || Voltix`,
  }
}

async function getTokenData(symbol: string) {
  const res = await fetch(`${url}/api/tokens/symbol?symbol=${symbol}`);
  const data = await res.json();
  return data.success ? data.token : null;
}

async function getTransactions(symbol: string) {
  const rawTransactions = await prisma.transaction.findMany({
    where: {
      token: {
        symbol: symbol as string
      }
    },
    orderBy: {
      createdAt: 'desc'
    },
    take: 10,
    select: {
      id: true,
      amount: true,
      priceAtTransaction: true,
      transactionType: true,
      createdAt: true,
    }
  });

  const transactions = rawTransactions.map(tx => ({
    id: String(tx.id),
    type: tx.transactionType === 'BUY' ? 'buy' : 'sell',
    amount: tx.amount,
    price: tx.priceAtTransaction,
    createdAt: tx.createdAt
  }));
  return transactions;
}

async function getUserBalances(userId: string) {
  const res = await fetch(`${url}/api/user/balance?userId=${userId}`);
  const data = await res.json();
  return data.success ? data.balance : { USDT: 0, USDC: 0 };
}

async function getUserTokenBalance(userId: string, symbol: string) {
  const res = await fetch(`${url}/api/user/token-balance?userId=${userId}&symbol=${symbol}`);
  const data = await res.json();
  return data.success ? data.balance : 0;
}


export default async function MarketPageDetail({ params }: { params: Promise<{ symbol: string }> }) {
  const { symbol } = await params;
  const token = await getTokenData(symbol);
  const transactions = await getTransactions(symbol);
  const supabase = createClient();
  const { data: { user } } = await (await supabase).auth.getUser();

  let usd = {
    USDT: 0,
    USDC: 0
  };
  let tokenBalance = 0;

  if (user) {
    usd = await getUserBalances(user.id);
    tokenBalance = await getUserTokenBalance(user.id, symbol);
  }

  if (!token) {
    return notFound();
  }

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