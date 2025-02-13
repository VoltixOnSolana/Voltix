import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/utils/prisma'; // Assurez-vous que le chemin est correct

// Initialise Stripe avec la clé privée
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  try {
    // Récupérer les données envoyées depuis le frontend
    const body = await req.json();

    // Créer un PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: body.items.reduce((total: number, item: any) => total + item.price * item.quantity, 0) * 100, // Montant en centimes
      currency: 'eur',
      payment_method_types: ['card'],
      metadata: { userId: user?.id as string },
    });

    // Enregistrer la transaction dans la base de données avec Prisma
    const transaction = await prisma.transaction.create({
      data: {
        userId: user?.id as string,
        tokenId: 12, // Assurez-vous que l'ID du token USDT est correct
        amount: body.items.reduce((total: number, item: any) => total + item.price * item.quantity, 0),
        priceAtTransaction: body.items[0].price, // Prix de l'USDT au moment de la transaction
        transactionType: 'buy',
      },
    });

    // Créer une facture après la réussite de la transaction
    await prisma.invoice.create({
      data: {
        userId: user?.id as string,
        amount: transaction.amount,
        status: 'success',
      },
    });

    // Retourner l'ID de la session au frontend
    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Erreur lors de la création du PaymentIntent Stripe :', error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
