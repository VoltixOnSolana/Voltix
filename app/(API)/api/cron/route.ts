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

// Variables globales pour stocker les tâches CRON
let priceUpdateCron: cron.ScheduledTask | null = null;
let dailyUpdateCron: cron.ScheduledTask | null = null;

// Route pour démarrer le CRON et retourner les mises à jour
export async function GET() {
    try {
        // CRON pour les mises à jour de prix toutes les 30 secondes
        if (!priceUpdateCron) {
            priceUpdateCron = cron.schedule('*/30 * * * * *', async () => {
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

        // CRON pour la mise à jour quotidienne des prix historiques
        if (!dailyUpdateCron) {
            dailyUpdateCron = cron.schedule('0 0 * * *', async () => {
                const tokens = await prisma.token.findMany();

                for (const token of tokens) {
                    await prisma.token.update({
                        where: { id: token.id },
                        data: {
                            priceLast7Days: token.priceLast6Days,
                            priceLast6Days: token.priceLast5Days,
                            priceLast5Days: token.priceLast4Days,
                            priceLast4Days: token.priceLast3Days,
                            priceLast3Days: token.priceLast2Days,
                            priceLast2Days: token.priceLastDay,
                            priceLastDay: token.price,
                        }
                    });
                }
                console.log('Prix historiques mis à jour');
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