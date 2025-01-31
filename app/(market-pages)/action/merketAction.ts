"use server";

import prisma from "@/utils/prisma";

interface Token {
  id: number;  
  symbol: string;
  name: string;
  price: number;
  marketCap: number;
  supply: number;
  createdAt: Date;
  updatedAt: Date;
}

export async function getTokenFromDb(): Promise<Token[]> {
    const tokens = await prisma.token.findMany();
    
    const tokensWithNumberId = tokens.map((token) => ({
      ...token,
      id: Number(token.id),
    }));
    
    return tokensWithNumberId;
  }
  
  export async function getPriceOfToken(symbol: string) {
    const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${symbol}&vs_currencies=usd`);
    if (!response.ok) {
      throw new Error("Failed to fetch price");
    }
    
    const data = await response.json();
    
    if (!data || !data[symbol]) {
      console.error("No price data found");
      return { price: 0 }; 
    }
  
    return data[symbol].usd; 
  }
  
  
  
