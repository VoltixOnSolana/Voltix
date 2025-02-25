import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function GET(
  request: Request,
  { params }: { params: { symbol: string } }
) {
  try {
    const token = await prisma.token.findFirst({
      where: {
        symbol: params.symbol
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

    if (!token) {
      return NextResponse.json({
        success: false,
        error: "Token non trouvé"
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      token
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Erreur lors de la récupération du token"
    }, { status: 500 });
  }
} 