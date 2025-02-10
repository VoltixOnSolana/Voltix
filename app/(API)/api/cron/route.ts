import { NextResponse } from 'next/server';
import prisma from '@/utils/prisma';

// Fonction qui simule une variation de prix
function simulatePrice(currentPrice: number): number {
    // Crée une fluctuation aléatoire entre -3% et +3%
    const fluctuation = (Math.random() - 0.5) * 0.06;
    const newPrice = currentPrice * (1 + fluctuation);
    return parseFloat(newPrice.toFixed(2)); // Arrondi à 2 décimales
}

// Route pour mettre à jour et retourner les prix
export async function GET() {
    try {
        // Récupère tous les tokens de la base de données
        const tokens = await prisma.token.findMany();

        // Met à jour le prix de chaque token (sauf USD)
        for (const token of tokens) {
            if (!token.symbol.startsWith('USD')) {
                const newPrice = simulatePrice(token.price);
                await prisma.token.update({
                    where: { id: token.id },
                    data: { price: newPrice }
                });
            }
        }

        // Récupère les tokens mis à jour pour les renvoyer à l'API
        const updatedTokens = await prisma.token.findMany({
            select: {
                id: true,
                symbol: true,
                name: true,
                price: true,
                marketCap: true,
                supply: true,
                priceLastDay: true,
                priceLast2Days: true,
                priceLast3Days: true,
                priceLast4Days: true,
                priceLast5Days: true,
                priceLast6Days: true,
                priceLast7Days: true
            }
        });

        // Renvoie les tokens mis à jour
        return NextResponse.json({
            success: true,
            tokens: updatedTokens
        });
    } catch (error) {
        // Gestion des erreurs
        console.error('Erreur lors de la mise à jour des prix:', error);
        return NextResponse.json({
            success: false,
            error: 'Erreur lors de la mise à jour des prix'
        }, { status: 500 });
    }
} 