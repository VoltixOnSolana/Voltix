"use server";

import prisma from "@/utils/prisma";

export async function getTokenFromDb(): Promise<{ id: number; symbol: string; name: string; marketCap: number; supply: number, price: number }[]> {
  const tokens = await prisma.$queryRaw<{ id: number; symbol: string; name: string; marketCap: number; supply: number, price: number }[]>`
    SELECT * FROM "Token"
  `;

  return tokens;
}

// Récupérer les informations détaillées d'un token par son symbole
export async function getTokenBySymbol(symbol: string) {
  const token = await prisma.token.findFirst({
    where: {
      symbol: symbol
    },
    select: {
      id: true,
      symbol: true,
      name: true,
      price: true,
      marketCap: true,
      supply: true,
      priceLastDay: true,
      priceLast2Days: true,
      priceLast3Days: true,
      priceLast4Days: true,
      priceLast5Days: true,
      priceLast6Days: true,
      priceLast7Days: true,
    }
  });

  return token;
}

// Récupérer les transactions récentes pour un token
export async function getRecentTransactions(symbol: string) {
  const rawTransactions = await prisma.transaction.findMany({
    where: {
      token: {
        symbol: symbol
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

  // Transformer les données pour correspondre à l'interface Transaction
  return rawTransactions.map(tx => ({
    id: String(tx.id),
    type: tx.transactionType === 'BUY' ? 'buy' : 'sell',
    amount: tx.amount,
    price: tx.priceAtTransaction,
    createdAt: tx.createdAt
  }));
}

export async function getUserBalance(userId: string) {
  const transactions = await prisma.transaction.findMany({
    where: {
      userId,
      token: {
        symbol: { in: ["UDT", "USDC"] },
      },
    },
    include: {
      token: true,
    },
  });

  const balance = transactions.reduce((acc, tx) => {
    acc[tx.token.symbol] = (acc[tx.token.symbol] || 0) + tx.amount;
    return acc;
  }, {} as Record<string, number>);

  return balance;
}

// Fonction pour récupérer le nombre de tokens détenus par un utilisateur selon le symbole
export async function getUserTokenBalance(userId: string, symbol: string) {
  const transactions = await prisma.transaction.findMany({
    where: {
      userId,
      token: {
        symbol,
      },
    },
    include: {
      token: true,
    },
  });

  const totalAmount = transactions.reduce((acc, tx) => acc + tx.amount, 0);

  return totalAmount;
}
