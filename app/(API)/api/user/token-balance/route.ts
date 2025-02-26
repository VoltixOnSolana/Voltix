import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  const symbol = searchParams.get('symbol');

  if (!userId || !symbol) {
    return NextResponse.json({
      success: false,
      error: "UserId ou symbol manquant"
    }, { status: 400 });
  }

  try {
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

    return NextResponse.json({
      success: true,
      balance: totalAmount
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Erreur lors de la récupération du solde"
    }, { status: 500 });
  }
} 