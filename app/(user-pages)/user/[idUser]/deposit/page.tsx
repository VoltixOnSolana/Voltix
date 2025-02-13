'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import { Button, Input } from '@heroui/react';
import { usePathname, useRouter } from 'next/navigation';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function DepositPage() {
  return (
    <Elements stripe={stripePromise}>
      <DepositForm />
    </Elements>
  );
}

function DepositForm() {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const pathname = usePathname();

  const idUser = pathname.split('/').slice(-2)[0];

  const handlePayment = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      console.error("Stripe n'est pas encore chargé");
      setLoading(false);
      return;
    }

    // Appel à l'API pour créer un PaymentIntent
    const response = await fetch('/api/stripe/create-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: [
          { name: 'Tokens', price: amount, quantity: 1 },
        ],
      }),
    });

    const { clientSecret } = await response.json();

    // Confirmer le paiement avec le client secret
    const { error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardNumberElement)!,
      },
    });

    if (error) {
      router.push(`/user/${idUser}/deposit/cancel`);
    } else {
      router.push(`/user/${idUser}/deposit/succes`);
    }

    setLoading(false);
  };

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-2xl font-bold mb-4'>Déposer des fonds</h1>
      <form onSubmit={handlePayment} className="flex flex-col md:flex-row gap-4 p-4 w-full max-w-2xl">
        <div className="flex-1 flex flex-col gap-2 p-4 mt-1">
          <Input
            type="number"
            size='md'
            labelPlacement='outside'
            label='Montant à déposer'
            value={amount.toString()}
            onChange={(e) => setAmount(Number(e.target.value))}
            
          />
          <p>Vous recevrez: {amount} USDT</p>
        </div>
        <div className="flex-1 flex flex-col gap-2 p-4">
          <div className="flex flex-col gap-2">
            <label className='text-sm font-medium'>Numéro de carte</label>
            <CardNumberElement
              className="rounded-lg bg-[#27272A] p-3 h-10"
            />
            <div className="flex flex-row gap-2 justify-between">
              <div className="flex flex-col gap-2 w-full">
                <label className='text-sm font-medium'>Date d'expiration</label>
                <CardExpiryElement className="w-full rounded-lg bg-[#27272A] p-3 h-10 text-white" />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label className='text-sm font-medium'>Code CVC</label>
                <CardCvcElement className="w-full rounded-lg bg-[#27272A] p-3 h-10 text-white" />
              </div>
            </div>
          </div>
          <Button
            type="submit"
            disabled={loading}
            variant='solid'
            color='primary'
            className='mt-4'
            isLoading={loading}
          >
            {loading ? 'Payement en cours...' : 'Payer avec Stripe'}
          </Button>
        </div>
      </form>
    </div>
  );
}
