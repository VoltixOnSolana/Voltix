"use server"

import prisma from "@/utils/prisma"

// Interface pour représenter une ligne de token
interface TokenRow {
  symbol: string; // Symbole du token
  amount: number; // Quantité du token
  price: number;  // Prix du token au moment de la transaction
}

// Fonction pour obtenir les tokens d'un utilisateur spécifique
export async function getTokenOfUser(id: string) {
  // Récupération des transactions de l'utilisateur depuis la base de données
  const transactions = await prisma.transaction.findMany({
    where: {
      userId: id // Filtrer par identifiant utilisateur
    },
    include: {
      token: true // Inclure les informations sur le token
    }
  });

  // Transformation des transactions en lignes de tokens
  const tokenRows: TokenRow[] = transactions.map(tx => ({
    symbol: tx.token.symbol,  // Symbole du token
    amount: tx.amount,        // Quantité du token
    price: tx.priceAtTransaction, // Prix au moment de la transaction
    lastPrice: tx.token.priceLastDay,
    lastPrice2: tx.token.priceLast2Days,
    lastPrice3: tx.token.priceLast3Days,
    lastPrice4: tx.token.priceLast4Days,
    lastPrice5: tx.token.priceLast5Days,
    lastPrice6: tx.token.priceLast6Days,
    lastPrice7: tx.token.priceLast7Days
  }));

  return tokenRows; // Retourner les lignes de tokens
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