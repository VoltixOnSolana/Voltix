"use client" // Indique que ce fichier est destiné à être exécuté côté client

import { useTokens } from '@/contexts/TokenContext'; // Importation du contexte des tokens
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    getKeyValue,
} from "@heroui/react"; // Importation des composants de la bibliothèque @heroui/react
import NumberTicker from './ui/number-ticker';
import TableSkeleton from '@/app/(market-pages)/market/loading-market-table';
import TableChartSkeleton from '../app/(user-pages)/user/[idUser]/account/loading-table-chart';

import { Line, LineChart, ResponsiveContainer } from "recharts";
import { useRouter } from 'next/navigation';

// Composant pour le mini graphique
function MiniChart({ token }: { token: any }) {
    const chartData = [
        { date: "J-7", price: token.priceLast7Days || token.price },
        { date: "J-6", price: token.priceLast6Days || token.price },
        { date: "J-5", price: token.priceLast5Days || token.price },
        { date: "J-4", price: token.priceLast4Days || token.price },
        { date: "J-3", price: token.priceLast3Days || token.price },
        { date: "J-2", price: token.priceLast2Days || token.price },
        { date: "J-1", price: token.priceLastDay || token.price },
        { date: "J", price: token.price },
    ];

    return (
        <div className="w-[100px] h-[20px]">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                    <Line
                        type="natural"
                        dataKey="price"
                        stroke="hsl(270, 50%, 50%)"
                        strokeWidth={2}
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
// Définition des colonnes pour l'affichage des tokens de l'utilisateur
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
        label: "Valeur",
    },
];

// Définition des colonnes pour l'affichage des tokens du marché
const columnsDb = [
    {
        key: "symbol",
        label: "Symbole",
    },
    {
        key: "name",
        label: "Nom",
    },
    {
        key: "price",
        label: "Prix",
    },
    {
        key: "chart",
        label: "Évolution",
    },
];

// Interface pour définir la structure commune d'un token
interface CommonToken {
    symbol: string;
    price: number;
    amount?: number; // Optionnel pour les tokens de la base de données
    id?: number; // Optionnel pour les tokens de l'utilisateur
    name?: string;
    marketCap?: number;
    supply?: number;
    priceLastDay?: number;
    priceLast2Days?: number;
    priceLast3Days?: number;
    priceLast4Days?: number;
    priceLast5Days?: number;
    priceLast6Days?: number;
    priceLast7Days?: number;
}

// Interface pour les propriétés du composant TableTokens
interface TableTokensProps {
    isActifUser: boolean; // Indique si l'utilisateur est actif
    tokensFromUser?: CommonToken[] // Liste des tokens de l'utilisateur
}

// Composant principal pour afficher les tokens
export function TablesTokens({ isActifUser, tokensFromUser }: TableTokensProps) {
    const { tokens: marketTokens, isLoading } = useTokens(); // Récupération des tokens du marché depuis le contexte
    const router = useRouter();

    // Combiner les données utilisateur avec les prix du marché
    const displayTokens: CommonToken[] = isActifUser
        ? (tokensFromUser?.map(userToken => {
            const marketToken = marketTokens.find(t => t.symbol === userToken.symbol);
            return {
                ...userToken,
                price: marketToken?.price || userToken.price
            };
        }) ?? [])
        : marketTokens;

    const columns = isActifUser ? columnsActifUser : columnsDb; // Choix des colonnes selon l'état de l'utilisateur

    // Tri des tokens
    if (isActifUser && displayTokens) {
        displayTokens.sort((a, b) => (b.amount ?? 0) * (b.price ?? 0) - (a.amount ?? 0) * (a.price ?? 0));
    } else if (displayTokens) {
        displayTokens.sort((a, b) => (a.id ?? 0) - (b.id ?? 0));
    }

    if (isLoading) {
        return isActifUser ? <TableChartSkeleton /> : <TableSkeleton />;
    }

    return (
        <div className="px-10 py-4">
            <h1 className="text-2xl font-bold p-4">
                {isActifUser ? "Vos cryptos" : "Marché crypto en direct"}
            </h1>
            <Table aria-label={isActifUser ? "Spot token of user" : "Market token"} isStriped>
                <TableHeader columns={columns}>
                    {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                </TableHeader>
                <TableBody items={displayTokens} emptyContent={
                    <div>
                        <p>Aucune crypto disponible</p>
                    </div>
                }>
                    {(item) => (
                        <TableRow style={{ cursor: 'pointer', transition: 'background-color 0.3s ease, transform 0.2s ease', }} key={item.symbol} 
                        onClick={() => router.push(`/market/${item.symbol}`)}
                        onMouseEnter={(e) => e.currentTarget.style.opacity = "0.8"} 
                        onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}>
                            {(columnKey) => (
                                <TableCell>
                                    {columnKey === "price" && !isActifUser
                                        ? <NumberTicker value={item.price} isPrimary={false} />
                                        : isActifUser && columnKey === "price"
                                            ? <NumberTicker value={item.price * (item.amount ?? 0)} isPrimary={false} />
                                            : columnKey === "chart" && !isActifUser
                                                ? <MiniChart token={item} />
                                                : getKeyValue(item, columnKey)}
                                </TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}