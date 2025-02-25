"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { Button, Input, Image } from "@heroui/react";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CreditCard } from "lucide-react";
import mastercard from "./images/mastercard.png";
import visa from "./images/visa.png";
import { RadioGroup, useRadio, VisuallyHidden, cn } from "@heroui/react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export const CustomRadio = (props: any) => {
  const {
    Component,
    children,
    description,
    getBaseProps,
    getWrapperProps,
    getInputProps,
    getLabelProps,
    getLabelWrapperProps,
    getControlProps,
  } = useRadio(props);
  return (
    <Component
      {...getBaseProps()}
      className={cn(
        "group inline-flex items-center hover:opacity-70 active:opacity-50 justify-between flex-row-reverse tap-highlight-transparent",
        "max-w-[300px] cursor-pointer border-2 border-default rounded-lg gap-4 p-4",
        "data-[selected=true]:border-primary"
      )}
    >
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <span {...getWrapperProps()}>
        <span {...getControlProps()} />
      </span>
      <div {...getLabelWrapperProps()}>
        {children && <span {...getLabelProps()}>{children}</span>}
        {description && (
          <span className="text-small text-foreground opacity-70">
            {description}
          </span>
        )}
      </div>
    </Component>
  );
};

export default function DepositPage() {
  return (
    <Elements stripe={stripePromise}>
      <DepositForm />
    </Elements>
  );
}

function CreditCardDesign({
  cardNumber,
  expiryDate,
  cardholder,
}: {
  cardNumber: string;
  expiryDate: string;
  cardholder: string;
}) {
  return (
    <div className="relative w-[420px] h-[230px] rounded-xl bg-gradient-to-br from-gray-950 to-gray-800 p-6 shadow-2xl border border-gray-700">
      <div className="relative z-10 h-full flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div className="w-14 h-10 bg-gradient-to-r from-gray-300 to-gray-500 rounded-md shadow-md border border-gray-500"></div>
          <div className="flex items-center">
            <Image src={visa.src} alt="CardBrand" className="w-14 h-14" />
          </div>
        </div>

        <div className="text-3xl text-white tracking-widest text-center">
          {"•••• •••• •••• ••••"}
        </div>

        <div className="flex justify-between items-end text-white">
          <div>
            <div className="text-xs text-gray-400">MM/YY</div>
            <div className="tracking-widest">MM/YY</div>
          </div>
          <div>
            <div className="text-xs text-gray-400">PROPRIETAIRE</div>
            <div className="tracking-widest">JSP Encore</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DepositForm() {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const pathname = usePathname();

  const idUser = pathname.split("/").slice(-2)[0];

  const handleCardNumberChange = (event: any) => {
    if (event.complete) {
      // Simuler un numéro de carte masqué pour l'affichage
      setCardNumber(cardNumber.replace(/\d(?=\d{4})/g, "*"));
    }
  };

  const handleExpiryChange = (event: any) => {
    if (event.complete) {
      const month = event.value.month.toString().padStart(2, "0");
      const year = event.value.year.toString().slice(-2);
      setExpiryDate(`${month}/${year}`);
    }
  };

  const handlePayment = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      console.error("Stripe n'est pas encore chargé");
      setLoading(false);
      return;
    }

    // Appel à l'API pour créer un PaymentIntent
    const response = await fetch("/api/stripe/create-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: [{ name: "Tokens", price: amount, quantity: 1 }],
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
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Déposer des fonds</h1>
      <CreditCardDesign
        cardNumber={cardNumber}
        expiryDate={expiryDate}
        cardholder="JSP Encore"
      />
      <form
        onSubmit={handlePayment}
        className="flex flex-col gap-4 p-8 w-[500px] max-w-2xl"
      >
        {/* <div className="flex-1 flex flex-col gap-2 p-4 mt-1"> */}
        {/* <Input
            type="number"
            size="md"
            labelPlacement="outside"
            label="Montant à déposer"
            value={amount.toString()}
            onChange={(e) => setAmount(Number(e.target.value))}
          /> */}
        {/* <p>Vous recevrez: {amount} USDT</p> */}
        {/* </div> */}
        <div className="grid md:grid-cols-1 gap-6">
          <div className="flex justify-between">
            <Button
              color="primary"
              className="w-[48%]"
              endContent={<img src={visa.src} alt="Visa" className="w-8 h-8" />}
            >
              <CreditCard className="w-5 h-5" /> Visa
            </Button>
            <Button
              color="primary"
              className="w-[48%]"
              endContent={
                <img
                  src={mastercard.src}
                  alt="Mastercard"
                  className="w-8 h-5"
                />
              }
            >
              <CreditCard className="w-5 h-5" /> Mastercard
            </Button>
          </div>
          <RadioGroup label="Payement">
            <CustomRadio description="Visa" value="free">
              <div className="flex justify-between">
                <CreditCard className="w-5 h-5" />
                <img src={visa.src} alt="Visa" className="w-8 h-8" />
                
              </div>
            </CustomRadio>
            <CustomRadio description="Mastercard" value="pro">
              <div className="flex justify-between">
                <CreditCard className="w-5 h-5" />
                <img
                  src={mastercard.src}
                  alt="Mastercard"
                  className="w-8 h-5"
                />
                
              </div>
            </CustomRadio>
          </RadioGroup>
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Numéro de carte</label>
            <CardNumberElement
              onChange={handleCardNumberChange}
              className="rounded-lg bg-[#27272A] p-3 h-10"
            />
            <div className="flex flex-row gap-2 justify-between">
              <div className="flex flex-col gap-2 w-full">
                <label className="text-sm font-medium">Date d'expiration</label>
                <CardExpiryElement className="w-full rounded-lg bg-[#27272A] p-3 h-10 text-white" />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label className="text-sm font-medium">Code CVC</label>
                <CardCvcElement className="w-full rounded-lg bg-[#27272A] p-3 h-10 text-white" />
              </div>
            </div>
          </div>
          <Button
            type="submit"
            disabled={loading}
            variant="solid"
            color="primary"
            className="mt-4"
            isLoading={loading}
          >
            {loading ? "Payement en cours..." : "Payer avec Stripe"}
          </Button>
        </div>
      </form>
    </div>
  );
}
