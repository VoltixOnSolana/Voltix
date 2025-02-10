import { NextResponse } from 'next/server';
import prisma from '@/utils/prisma';

// Route pour la mise à jour quotidienne des prix historiques
export async function GET() {
    try {
        const tokens = await prisma.token.findMany();

        // Met à jour les prix historiques pour chaque token
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

        // Récupère les tokens mis à jour pour les renvoyer
        const updatedTokens = await prisma.token.findMany({
            select: {
                id: true,
                symbol: true,
                name: true,
                price: true,
                priceLastDay: true,
                priceLast2Days: true,
                priceLast3Days: true,
                priceLast4Days: true,
                priceLast5Days: true,
                priceLast6Days: true,
                priceLast7Days: true
            }
        });

        return NextResponse.json({
            success: true,
            message: 'Prix historiques mis à jour avec succès',
            tokens: updatedTokens
        });

    } catch (error) {
        console.error('Erreur lors de la mise à jour des prix historiques:', error);
        return NextResponse.json({
            success: false,
            error: 'Erreur lors de la mise à jour des prix historiques'
        }, { status: 500 });
    }
}
