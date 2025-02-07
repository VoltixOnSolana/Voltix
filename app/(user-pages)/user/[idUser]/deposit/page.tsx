import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { CheckoutForm } from '@/components/checkout-form';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

type Params = Promise<{ idUser: string }>

export default async function DepositPage({
  params,
}: {
  params: Params
}) {
  const { idUser } = await params;
  console.log(idUser)
  return (
    <Elements stripe={stripePromise}>
      <div className="min-h-screen flex items-center justify-center bg-[hsl(var(--background))]">
        <div className="w-full max-w-md p-6 space-y-8 bg-[hsl(var(--card))] rounded-lg shadow-xl">
          <h2 className="text-center text-3xl font-extrabold text-[hsl(var(--foreground))]">
            Déposer des fonds
          </h2>
          <CheckoutForm />
        </div>
      </div>
    </Elements>
  );
}
