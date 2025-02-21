"use server"

import prisma from "@/utils/prisma"

// Interface pour représenter une ligne de token
interface TokenRow {
  symbol: string; // Symbole du token
  amount: number; // Quantité du token
  price: number;  // Prix du token au moment de la transaction
  lastPrice: number;
  lastPrice2: number;
  lastPrice3: number;
  lastPrice4: number;
  lastPrice5: number;
  lastPrice6: number;
  lastPrice7: number;
}

export async function getUserBilling(id: string) {
  const invoices = await prisma.invoice.findMany({
    where: {
      userId: id
    }
  })
  return invoices
}

// Fonction pour obtenir les tokens d'un utilisateur spécifique
export async function getTokenOfUser(id: string) {
  const transactions = await prisma.transaction.findMany({
    where: {
      userId: id
    },
    include: {
      token: true
    }
  });

  // Grouper les transactions par symbole et calculer le solde total
  const tokenBalances = transactions.reduce((acc, tx) => {
    const symbol = tx.token.symbol;
    if (!acc[symbol]) {
      acc[symbol] = {
        symbol,
        amount: 0,
        price: tx.token.price,
        lastPrice: tx.token.priceLastDay,
        lastPrice2: tx.token.priceLast2Days,
        lastPrice3: tx.token.priceLast3Days,
        lastPrice4: tx.token.priceLast4Days,
        lastPrice5: tx.token.priceLast5Days,
        lastPrice6: tx.token.priceLast6Days,
        lastPrice7: tx.token.priceLast7Days
      };
    }
    acc[symbol].amount += tx.amount;
    return acc;
  }, {} as Record<string, TokenRow>);

  // Convertir l'objet en tableau et filtrer les soldes nuls
  return Object.values(tokenBalances).filter(token => token.amount !== 0);
}

// Fonction pour obtenir les transactions des 7 derniers jours pour un utilisateur
export async function getTransactionsForLast7Days(userId: string) {
  const now = new Date(); // Date actuelle
  const sevenDaysAgo = new Date(now); // Date il y a 7 jours
  sevenDaysAgo.setDate(now.getDate() - 7); // Calculer la date il y a 7 jours

  // Récupération des transactions des 7 derniers jours
  const transactions = await prisma.transaction.findMany({
    where: {
      userId: userId, // Filtrer par identifiant utilisateur
      createdAt: {
        gte: sevenDaysAgo, // Filtrer par date de création (>= il y a 7 jours)
      },
    },
    include: {
      token: true, // Inclure les informations sur le token
    },
  });

  return transactions; // Retourner les transactions
}