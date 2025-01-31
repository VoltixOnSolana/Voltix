'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function DepositPage() {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);

    const stripe = await stripePromise;
    if (!stripe) {
      console.error('Stripe n’a pas pu être chargé');
      return;
    }

    // Appel à l’API pour créer une session Stripe
    const response = await fetch('/api/stripe/create-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: [
          { name: 'Pack Tokens', price: 2000, quantity: 1 }, // Exemple
        ],
      }),
    });

    const { sessionId } = await response.json();

    // Redirection vers Stripe Checkout
    const { error } = await stripe.redirectToCheckout({ sessionId });
    if (error) {
      console.error(error.message);
    }

    setLoading(false);
  };

  return (
    <div>
      <h1>Déposer des fonds</h1>
      <button
        onClick={handlePayment}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {loading ? 'Chargement...' : 'Payer avec Stripe'}
      </button>
    </div>
  );
}
