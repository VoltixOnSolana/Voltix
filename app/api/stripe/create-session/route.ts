import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: Request) {
  try {
    const { amount } = await req.json();
    console.log('Montant reçu:', amount); // Debugging

    if (!amount || isNaN(amount) || amount <= 0) {
      return NextResponse.json({ error: 'Montant invalide' }, { status: 400 });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'eur',
      payment_method_types: ['card'],
    });

    console.log('Payment Intent créé:', paymentIntent.id); // Debugging

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Erreur Stripe:', error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
