import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({
      success: false,
      error: "UserId manquant"
    }, { status: 400 });
  }

  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        userId,
        token: {
          symbol: { in: ["USDT", "USDC"] },
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

    return NextResponse.json({
      success: true,
      balance
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Erreur lors de la récupération du solde"
    }, { status: 500 });
  }
} 