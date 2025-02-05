import { NextResponse } from 'next/server';
import prisma from '@/utils/prisma';
import cron from 'node-cron';

// Fonction qui simule une variation de prix
function simulatePrice(currentPrice: number): number {
    // Crée une fluctuation aléatoire entre -3% et +3%
    const fluctuation = (Math.random() - 0.5) * 0.06;
    const newPrice = currentPrice * (1 + fluctuation);
    return parseFloat(newPrice.toFixed(2)); // Arrondi à 2 décimales
}

// Variable globale pour stocker la tâche CRON
let cronJob: cron.ScheduledTask | null = null;

// Route pour démarrer le CRON et retourner les mises à jour
export async function GET() {
    try {
        // Vérifie si le CRON n'est pas déjà en cours
        if (!cronJob) {
            // Crée une tâche qui s'exécute toutes les 30 secondes
            cronJob = cron.schedule('*/30 * * * * *', async () => {
                // Récupère tous les tokens de la base de données
                const tokens = await prisma.token.findMany();

                // Met à jour le prix de chaque token
                for (const token of tokens) {
                    const newPrice = simulatePrice(token.price);
                    await prisma.token.update({
                        where: { id: token.id },
                        data: { price: newPrice }
                    });
                }
            });
        }

        // Récupère les tokens mis à jour pour les renvoyer à l'API
        const updatedTokens = await prisma.token.findMany({
            select: {
                id: true,
                symbol: true,
                name: true,
                price: true,
                marketCap: true,
                supply: true
            }
        });

        // Renvoie les tokens mis à jour
        return NextResponse.json({
            success: true,
            tokens: updatedTokens
        });
    } catch (error) {
        // Gestion des erreurs
        return NextResponse.json({
            success: false,
            error: 'Erreur lors de la mise à jour des prix'
        }, { status: 500 });
    }
} 