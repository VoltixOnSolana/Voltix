"use client"

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

interface TableTokensProps {
    columns: {key: string, label: string}[],
    rows: {
        key: number,
        symbol: string,
        name: string,
        price: number,
        marketCap: number,
        supply: number,
    }[]
}

export default function TableTokens({columns, rows}: TableTokensProps) {
    return (
        <Table aria-label="Example table with dynamic content">
          <TableHeader columns={columns}>
            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
          </TableHeader>
          <TableBody items={rows}>
            {(item) => (
              <TableRow key={item.key}>
                {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
              </TableRow>
            )}
          </TableBody>
        </Table>
      );
    }
  
