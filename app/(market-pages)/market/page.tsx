import React from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    getKeyValue,
  } from "@heroui/react";
import TableTokens from "@/components/table-tokens";

const rows = [
    {
        "key": 1,
        "id": "f9b74f5e-12f4-4ab1-bf2c-3c5b7762c9e7",
        "symbol": "BTC",
        "name": "Bitcoin",
        "price": 45000.25,
        "marketCap": 850000000000,
        "supply": 21000000,
        "createdAt": "2025-01-24T10:00:00.000Z",
        "updatedAt": "2025-01-24T10:00:00.000Z",
      },
      {
        "key": 2,
        "id": "d3a2e5f1-3cd1-4be0-8ec9-23c5c1a273bb",
        "symbol": "ETH",
        "name": "Ethereum",
        "price": 3200.75,
        "marketCap": 380000000000,
        "supply": 115000000,
        "createdAt": "2025-01-24T10:00:00.000Z",
        "updatedAt": "2025-01-24T10:00:00.000Z",
      },
      {
        "key": 3,
        "id": "d782fc39-8bc0-4640-95d5-560d25fe9ad4",
        "symbol": "ADA",
        "name": "Cardano",
        "price": 1.35,
        "marketCap": 45000000000,
        "supply": 34000000000,
        "createdAt": "2025-01-24T10:00:00.000Z",
        "updatedAt": "2025-01-24T10:00:00.000Z",
      }
];
  
const columns = [
    { key: "symbol", label: "Symbol" },
    { key: "name", label: "Name" },
    { key: "price", label: "Price" },
    { key: "marketCap", label: "MarketCap" },
    { key: "supply", label: "Supply" },
  ];
  

export default async function Market() {
    return (
        <TableTokens columns={columns} rows={rows} />
      );
    }
  
