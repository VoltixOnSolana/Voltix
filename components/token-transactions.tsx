"use client"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    getKeyValue,
} from "@heroui/react"
import { formatDistance } from 'date-fns'
import { fr } from 'date-fns/locale'
import NumberTicker from "./ui/number-ticker"

const columns = [
    { key: 'type', label: 'Type' },
    { key: 'amount', label: 'Montant' },
    { key: 'price', label: 'Prix' },
    { key: 'createdAt', label: 'Date' },
]

interface Transaction {
    id: string;
    type: string;
    amount: number;
    price: number;
    createdAt: Date;
}

interface TokenTransactionsProps {
    transactions: Transaction[];
}

export function TokenTransactions({ transactions }: TokenTransactionsProps) {
    return (
        <Card className="bg-background/40 border-border dark:bg-[#18181b] dark:border-gray-800">
            <CardHeader>
                <CardTitle>Transactions récentes</CardTitle>
            </CardHeader>
            <CardContent>
                <Table aria-label="Transactions récentes" isStriped>
                    <TableHeader columns={columns}>
                        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                    </TableHeader>
                    <TableBody items={transactions.slice(0, 7)} emptyContent={
                        <div>
                            <p>Aucune crypto disponible</p>
                        </div>
                    }>
                        {(item) => (
                            <TableRow key={item.id}>
                                {(columnKey) => (
                                    <TableCell>
                                        {columnKey === "price"
                                            ? <NumberTicker value={item.price} isPrimary={false} />
                                            : columnKey === "createdAt"
                                                ? formatDistance(new Date(item.createdAt), new Date(), {
                                                    addSuffix: true,
                                                    locale: fr
                                                })
                                                : columnKey === "type"
                                                    ? item.type === "buy" || item.type === "purchase" ? "Achat" : "Vente"
                                                    : getKeyValue(item, columnKey)}
                                    </TableCell>
                                )}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
} 