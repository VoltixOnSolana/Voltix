import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function GET(
  request: Request,
  { params }: { params: { symbol: string } }
) {
  try {
    const rawTransactions = await prisma.transaction.findMany({
      where: {
        token: {
          symbol: params.symbol
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

    return NextResponse.json({
      success: true,
      transactions
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Erreur lors de la récupération des transactions"
    }, { status: 500 });
  }
} 