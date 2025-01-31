"use server";

import { PrismaClient } from '@prisma/client';
import { symbol } from 'zod';
const prisma = new PrismaClient();

export async function getTokenFromDb(): Promise<{ id: number; symbol: string; name: string; marketCap: number; supply: number }[]> {
  const tokens = await prisma.$queryRaw<{ id: number; symbol: string; name: string; marketCap: number; supply: number }[]>`
    SELECT * FROM "Token"
  `;
  
  return tokens;
}


  
interface RowType {
  id: number;
  symbol: string;
  name: string;
  price: number;
  marketCap: number;
  supply: number;
}

export async function getPriceOfToken(symbol: string): Promise<RowType | null> {
  const API_KEY = 'cc0ba194-01f6-4f66-867a-d68292c133d9'; 
  try {
    const response = await fetch(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?symbol=${symbol.toUpperCase()}`, {
      headers: {
        'X-CMC_PRO_API_KEY': API_KEY, 
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des données de CoinMarketCap");
    }

    const data = await response.json();
    
    // Vérification de la présence de données valides
    if (data.status.error_code !== 0 || !data.data || data.data.length === 0) {
      throw new Error("Token introuvable dans les données de CoinMarketCap");
    }

    const tokenData = data.data[0]; 

    return {
      id: Date.now(),
      symbol: tokenData.symbol,
      name: tokenData.name,
      price: tokenData.quote.USD.price,
      marketCap: tokenData.quote.USD.market_cap,
      supply: tokenData.total_supply,
    };
  } catch (error) {
    console.error("Erreur lors de l'appel API CoinMarketCap:", error);
    return null;
  }
}

  
  
