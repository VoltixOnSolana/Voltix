"use client";
import React, { useEffect, useState } from "react";
import TableTokens from "@/components/table-tokens";
import { getTokenFromDb, getPriceOfToken } from "../action/merketAction";  // Assure-toi que `getPriceOfToken` est bien importée

// Définition de RowType
interface RowType {
  id: number;
  symbol: string;
  name: string;
  price: number;
  marketCap: number;
  supply: number;
}

// Définition des colonnes avec `keyof RowType`
const columns: { id: keyof RowType; label: string }[] = [
  { id: "symbol", label: "Symbol" },
  { id: "name", label: "Name" },
  { id: "price", label: "Price" },
  { id: "marketCap", label: "Market Cap" },
  { id: "supply", label: "Supply" },
];

export default function Market() {
  const [rows, setRows] = useState<RowType[]>([]); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tokensFromDb = await getTokenFromDb();
        
        // Récupérer les prix des tokens depuis CoinGecko
        const formattedRows = await Promise.all(tokensFromDb.map(async (token) => {
          const price = await getPriceOfToken(token.symbol);  // Appel API pour récupérer le prix
          return {
            id: token.id, 
            symbol: token.symbol,
            name: token.name,
            price: price || 0,  // Si le prix est null, on met 0
            marketCap: token.marketCap,
            supply: token.supply,
          };
        }));
        
        setRows(formattedRows);  // Mettre à jour l'état avec les données formatées
      } catch (error) {
        console.error("Error fetching tokens:", error);
      }
    };

    fetchData();
  }, []); 

  return <TableTokens columns={columns} rows={rows} />;
}
