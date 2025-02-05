"use server";

import prisma from "@/utils/prisma";

export async function getTokenFromDb(): Promise<{ id: number; symbol: string; name: string; marketCap: number; supply: number, price: number }[]> {
  const tokens = await prisma.$queryRaw<{ id: number; symbol: string; name: string; marketCap: number; supply: number, price: number }[]>`
    SELECT * FROM "Token"
  `;

  return tokens;
}
