'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from '@heroui/react';
import { paths } from '@/paths';

export const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [amount, setAmount] = useState<string>('20');
  
    const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault();
      setLoading(true);
  
      if (!stripe || !elements) {
        console.error('Stripe non chargé');
        setLoading(false);
        return;
      }
  
      const amountCents = Math.round(parseFloat(amount) * 100);
      if (isNaN(amountCents) || amountCents <= 0) {
        alert("Veuillez entrer un montant valide.");
        setLoading(false);
        return;
      }
  
      const response = await fetch('/api/stripe/create-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: amountCents }),
      });
  
      const { clientSecret } = await response.json();
  
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
        },
      });
  
      if (result.error) {
        //router.push(paths.userCancel());
      } else {
        router.push('/deposit/succes');
      }
  
      setLoading(false);
    };
  
    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-[hsl(var(--foreground))]">
            Montant (€)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 block w-full rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--input))] px-3 py-2 shadow-sm focus:border-[hsl(var(--ring))] focus:outline-none"
            min="1"
            step="any"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[hsl(var(--foreground))]">
            Informations de paiement
          </label>
          <div className="mt-1 p-3 border rounded-md border-[hsl(var(--border))] bg-[hsl(var(--card))]">
            <CardElement
              options={{
                hidePostalCode: true,
                style: {
                  base: {
                    color: '#fff',
                    fontSize: '16px',
                    '::placeholder': { color: 'rgba(255,255,255,0.7)' },
                  },
                  invalid: { color: '#e5424d' },
                },
              }}
            />
          </div>
        </div>
        <Button
          type="submit"
          disabled={!stripe || loading}
          className="w-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary)/0.8)] transition-colors"
        >
          {loading ? 'Paiement en cours...' : `Payer ${amount}€`}
        </Button>
      </form>
    );
  };