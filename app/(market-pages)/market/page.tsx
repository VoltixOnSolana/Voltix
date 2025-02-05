"use client";
import React, { useEffect, useState } from "react";
import TableTokens from "@/components/table-tokens";
import { getTokenFromDb, getPriceOfToken } from "../action/marketAction";  

interface RowType {
  id: number;
  symbol: string;
  name: string;
  price: number;
  marketCap: number;
  supply: number;
}

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
        
        const formattedRows = await Promise.all(
          tokensFromDb.map(async (token) => {
            const priceData = await getPriceOfToken(token.symbol);
            return {
              id: token.id, 
              symbol: token.symbol,
              name: token.name,
              price: priceData?.price ? parseFloat(priceData.price.toFixed(2)) : 0,  // Arrondi à 2 chiffres
              marketCap: priceData?.marketCap ? parseFloat(priceData.marketCap.toFixed(2)) : 0,
              supply: priceData?.supply ? parseFloat(priceData.supply.toFixed(2)) : 0,
            };
          })
        );

        setRows(formattedRows);  
      } catch (error) {
        console.error("Error fetching tokens:", error);
      }
    };

    fetchData();
  }, []); 

  return <TableTokens columns={columns} rows={rows} />;
}

