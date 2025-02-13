import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";


// Initialise Stripe avec la clé privée
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: Request) {
  try {
    // Récupérer les données envoyées depuis le frontend
    const body = await req.json();
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    // Créer une session de paiement Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'], // Méthodes de paiement
      line_items: body.items.map((item: any) => ({
        price_data: {
          currency: 'eur',
          product_data: {
            name: item.name, // Nom du produit
          },
          unit_amount: item.price * 100, // Prix en centimes
        },
        quantity: item.quantity, // Quantité
      })),
      mode: 'payment',
      success_url: `${defaultUrl}/user/${user?.id}/deposit?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${defaultUrl}/user/${user?.id}/deposit`,
    });

    // Retourner l'ID de la session au frontend
    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Erreur lors de la création de la session Stripe :', error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
