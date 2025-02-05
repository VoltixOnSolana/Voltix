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

// Interface pour définir la structure commune d'un token
interface CommonToken {
    symbol: string;
    price: number;
    amount?: number; // Optionnel pour les tokens de la base de données
    id?: number; // Optionnel pour les tokens de l'utilisateur
    name?: string;
    marketCap?: number;
    supply?: number;
}

// Interface pour les propriétés du composant TableTokens
interface TableTokensProps {
    isActifUser: boolean; // Indique si l'utilisateur est actif
    tokensFromUser?: CommonToken[] // Liste des tokens de l'utilisateur
}

// Fonction pour formater le prix selon le format français
function formatPrice(value: number): string {
    if (value < 1) {
        return value.toLocaleString('fr-FR', { minimumFractionDigits: 3, maximumFractionDigits: 7 }).replace(/\s/g, "'");
    }
    return value.toLocaleString('fr-FR', { maximumFractionDigits: 0 }).replace(/\s/g, "'");
}

// Composant principal pour afficher les tokens
export function TablesTokens({ isActifUser, tokensFromUser }: TableTokensProps) {
    const { tokens: marketTokens } = useTokens(); // Récupération des tokens du marché depuis le contexte

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

    return (
        <div className="px-10 py-4">
            <h1 className="text-2xl font-bold p-4">
                {isActifUser ? "Vos cryptos" : "Marché crypto en direct"}
            </h1>
            <Table aria-label={isActifUser ? "Spot token of user" : "Market token"}>
                <TableHeader columns={columns}>
                    {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                </TableHeader>
                <TableBody items={displayTokens} emptyContent={
                    <div>
                        <p>Aucune crypto disponible</p>
                    </div>
                }>
                    {(item) => (
                        <TableRow key={item.symbol}>
                            {(columnKey) => (
                                <TableCell>
                                    {columnKey === "price" && !isActifUser
                                        ? formatPrice(item.price) + " €"
                                        : isActifUser && columnKey === "price"
                                            ? formatPrice(item.price * (item.amount ?? 0)) + " €"
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