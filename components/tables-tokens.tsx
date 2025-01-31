"use client"
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    getKeyValue,
} from "@heroui/react";

const columns = [
    {
        key: "symbol",
        label: "Nom",
    },
    {
        key: "amount",
        label: "Quantité",
    },
    {
        key: "price",
        label: "Prix",
    },
];

interface TokenRow {
    rows: {
        symbol: string;
        amount: number;
        price: number;
    }[]
}


export function TablesTokens({ rows }: TokenRow) {
    return (
        <Table className="px-10 py-4" aria-label="Spot token of user">
            <TableHeader columns={columns}>
                {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
            </TableHeader>
            <TableBody items={rows} emptyContent={
                <div>
                    <p>Vous n'avez aucune crypto</p>
                </div>
            }>
                {(item) => (
                    <TableRow key={item.symbol}>
                        {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}