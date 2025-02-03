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

function formatPrice(value: number): string {
    return value.toLocaleString('fr-FR', { maximumFractionDigits: 0 }).replace(/\s/g, "'");
}

export function TablesTokens({ rows }: TokenRow) {
    return (
        <div className="px-10 py-4">
            <h1 className="text-2xl font-bold p-4">Vos cryptos</h1>
            <Table className="" aria-label="Spot token of user">
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
                            {(columnKey) => (
                                <TableCell>
                                    {columnKey === "price"
                                        ? formatPrice(item.amount * item.price) + " €"
                                        : getKeyValue(item, columnKey)}
                                </TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}