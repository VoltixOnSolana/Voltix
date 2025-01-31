"use server"

import prisma from "@/utils/prisma"

interface TokenRow {
    symbol: string;
    amount: number;
    price: number;
  }

export async function getTokenOfUser(id: string) {
    const transactions = await prisma.transaction.findMany({
        where: {
            userId: id
        },
        include: {
            token: true
        }
    });

    const tokenRows: TokenRow[] = transactions.map(tx => ({
        symbol: tx.token.symbol,  
        amount: tx.amount,       
        price: tx.priceAtTransaction,
    }));

    return tokenRows;
}
