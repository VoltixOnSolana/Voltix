"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { initCron } from '@/utils/init';

// Interface pour les tokens
interface Token {
    id: number;
    symbol: string;
    name: string;
    price: number;
    marketCap: number;
    supply: number;
}

// Interface pour le contexte
interface TokenContextType {
    tokens: Token[];
    isLoading: boolean;
    error: string | null;
}

// Création du contexte
const TokenContext = createContext<TokenContextType>({
    tokens: [],
    isLoading: true,
    error: null,
});

// Hook personnalisé pour utiliser le contexte
export const useTokens = () => useContext(TokenContext);

// Provider du contexte
export function TokenProvider({ children }: { children: React.ReactNode }) {
    const [tokens, setTokens] = useState<Token[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const updateTokens = async () => {
        try {
            const updatedTokens = await initCron();
            if (updatedTokens && updatedTokens.length > 0) {
                setTokens(updatedTokens);
            }
            setError(null);
        } catch (err) {
            setError('Erreur lors de la mise à jour des prix');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // Première mise à jour
        updateTokens();

        // Mise à jour toutes les 30 secondes
        const intervalId = setInterval(updateTokens, 30000);

        // Nettoyage
        return () => clearInterval(intervalId);
    }, []);

    return (
        <TokenContext.Provider value={{ tokens, isLoading, error }}>
            {children}
        </TokenContext.Provider>
    );
} 