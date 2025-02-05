"use client"
import { initCron } from "@/utils/init";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    getKeyValue,
} from "@heroui/react";
import { useEffect, useState } from "react";

const columnsActifUser = [
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

const columnsDb = [
    {
        key: "symbol",
        label: "Symbol",
    },
    {
        key: "name",
        label: "Name",
    },
    {
        key: "marketCap",
        label: "Market Cap",
    },
    {
        key: "supply",
        label: "Supply",
    },
    {
        key: "price",
        label: "Price",
    },
];

interface CommonToken {
    symbol: string;
    price: number;
    amount?: number; // Optionnel pour les tokens de la base de données
    id?: number; // Optionnel pour les tokens de l'utilisateur
    name?: string;
    marketCap?: number;
    supply?: number;
}

interface TableTokensProps {
    isActifUser: boolean;
    tokensFromUser?: {
        symbol: string;
        amount: number;
        price: number;
    }[]
    tokensFromDb?: {
        id: number;
        symbol: string;
        name: string;
        price: number;
        marketCap: number;
        supply: number;
    }[]
}

function formatPrice(value: number): string {
    if (value <= 1) {
        return value.toLocaleString('fr-FR', { minimumFractionDigits: 3, maximumFractionDigits: 3 }).replace(/\s/g, "'");
    }
    return value.toLocaleString('fr-FR', { maximumFractionDigits: 0 }).replace(/\s/g, "'");
}

export function TablesTokens({ isActifUser, tokensFromUser, tokensFromDb }: TableTokensProps) {
    // Initialise les tokens avec les données initiales
    const initialTokens = isActifUser && tokensFromUser
        ? tokensFromUser.sort((a, b) => b.amount - a.amount)
        : tokensFromDb?.sort((a, b) => a.id - b.id) || [];

    // État local pour stocker les tokens
    const [tokens, setTokens] = useState<CommonToken[]>(initialTokens);
    const columns = isActifUser ? columnsActifUser : columnsDb;
    console.log("Je suis les columns", columns);
    useEffect(() => {
        // Première mise à jour immédiate
        initCron().then((updatedTokens) => {
            if (updatedTokens && updatedTokens.length > 0) {
                // Maintient l'ordre initial des tokens
                setTokens(updatedTokens.sort((a: CommonToken, b: CommonToken) => {
                    const initialIndexA = initialTokens.findIndex(token => token.symbol === a.symbol);
                    const initialIndexB = initialTokens.findIndex(token => token.symbol === b.symbol);
                    return initialIndexA - initialIndexB;
                }));
            }
        });

        // Met en place un intervalle pour mettre à jour les prix toutes les 30 secondes
        const intervalId = setInterval(() => {
            initCron().then((updatedTokens) => {
                if (updatedTokens && updatedTokens.length > 0) {
                    setTokens(updatedTokens.sort((a: CommonToken, b: CommonToken) => {
                        const initialIndexA = initialTokens.findIndex(token => token.symbol === a.symbol);
                        const initialIndexB = initialTokens.findIndex(token => token.symbol === b.symbol);
                        return initialIndexA - initialIndexB;
                    }));
                }
            });
        }, 30000);

        // Nettoie l'intervalle quand le composant est démonté
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="px-10 py-4">
            <h1 className="text-2xl font-bold p-4">{isActifUser ? "Vos cryptos" : "Marché crypto en direct"}</h1>
            <Table className="" aria-label={isActifUser ? "Spot token of user" : "Market token"}>
                <TableHeader columns={columns}>
                    {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                </TableHeader>
                <TableBody items={tokens} emptyContent={
                    <div>
                        <p>Vous n'avez aucune crypto</p>
                    </div>
                }>
                    {(item) => (
                        <TableRow key={item.symbol}>
                            {(columnKey) => (
                                <TableCell>
                                    {columnKey === "price"
                                        ? formatPrice(item.price) + " €"
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