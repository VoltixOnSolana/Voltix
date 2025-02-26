import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function GET() {
  try {
    const tokens = await prisma.$queryRaw<{ id: number; symbol: string; name: string; marketCap: number; supply: number, price: number }[]>`
      SELECT * FROM "Token"
    `;

    return NextResponse.json({
      success: true,
      tokens
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Erreur lors de la récupération des tokens"
    }, { status: 500 });
  }
} 