"use client"

import type React from "react"
import { useState } from "react"
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TransactionStatus } from "@/components/transaction-status"
import visa from "@/app/(user-pages)/user/[idUser]/deposit/images/visa.png"
import mastercard from "@/app/(user-pages)/user/[idUser]/deposit/images/mastercard.png"
import { RadioGroup, useRadio, VisuallyHidden, cn, Spacer, Button } from "@heroui/react"
import { CreditCard } from "lucide-react"
import { useTheme } from "next-themes"

const CARD_ELEMENT_OPTIONS_WHITE = {
  style: {
    base: {
      color: "white",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
}

const CARD_ELEMENT_OPTIONS_BLACK = {
  style: {
    base: {
      color: "black",
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
}
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
  } = useRadio(props);

  return (
    <Component
      {...getBaseProps()}
      className={cn(
        "hover:opacity-80 active:opacity-60 tap-highlight-transparent",
        "w-[48%] cursor-pointer border-2 border-default rounded-lg p-4 flex flex-col items-center gap-2 py-auto",
        "data-[selected=true]:border-primary data-[selected=false]:opacity-70"
      )}
    >
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <div
        {...getLabelWrapperProps()}
        className="flex flex-col items-center gap-2"
      >
        <div className="flex items-center gap-4">
          {children && <span {...getLabelProps()}>{children}</span>}
        </div>
        {description && (
          <span className="text-small text-foreground opacity-70">
            {description}
          </span>
        )}
      </div>
    </Component>
  );
}

function CreditCardDesign({
  cardNumber,
  expiryDate,
  cvcCode,
  imageDisplay,
}: {
  cardNumber: boolean;
  expiryDate: boolean;
  cvcCode: boolean;
  imageDisplay: string;
}) {
  const cardNumberText = cardNumber ? "text-green-500" : "text-gray-400";
  const expiryDateText = expiryDate ? "text-green-500" : "text-gray-400";
  const cvcCodeText = cvcCode ? "text-green-500" : "text-gray-400";
  const imageToDisplay = imageDisplay === "visa" ? visa.src : mastercard.src;
  const isVisa = imageDisplay === "visa";
  const imageSize = isVisa ? "w-17 h-7" : "w-15 h-9";

  return (
    <div className="min-w-[420px] max-w-[420px] h-[230px] rounded-xl bg-gradient-to-br from-gray-950 to-gray-800 p-6 shadow-2xl border border-gray-700">
      <div className="relative h-full flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div className="w-14 h-10 bg-gradient-to-r from-gray-300 to-gray-500 rounded-md shadow-md border border-gray-500"></div>

          <div className="flex items-center">
            <img
              src={imageToDisplay}
              alt="CardBrand"
              className={`${imageSize}`}
            />
          </div>
        </div>
        <div className={`${cardNumberText} text-xs`}>Numéro de carte</div>
        <div className="text-2xl tracking-widest text-center text-white">
          {"xx•• •••• •••• xxxx"}
        </div>

        <div className="flex justify-between items-end text-white">
          <div>
            <div className={`${expiryDateText} text-xs`}>Date d'expiration</div>
            <div className="tracking-widest">MM/YY</div>
          </div>
          <div>
            <div className={`${cvcCodeText} text-xs`}>CVC</div>
            <div className="tracking-widest">CVC</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DepositForm() {
  const [loading, setLoading] = useState(false)
  const [amount, setAmount] = useState(0)
  const [showStatus, setShowStatus] = useState(false)
  const [success, setSuccess] = useState(false)
  const stripe = useStripe()
  const elements = useElements()
  const pathname = usePathname()
  const userId = pathname.split("/").slice(-1)[0]
  const [myIsComplete, setMYIsComplete] = useState(false);
  const [cardNumberIsComplete, setCardNumberIsComplete] = useState(false);
  const [cvcIsComplete, setCvcIsComplete] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const { theme } = useTheme()

  const CARD_ELEMENT_OPTIONS = theme === "dark" ? CARD_ELEMENT_OPTIONS_BLACK : CARD_ELEMENT_OPTIONS_WHITE

  const handlePayment = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)
    setShowStatus(false)

    if (!stripe || !elements) {
      console.error("Stripe hasn't loaded yet")
      setLoading(false)
      return
    }

    try {
      const response = await fetch("/api/stripe/create-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: [{ name: "Tokens", price: amount, quantity: 1 }],
          userId,
        }),
      })

      const { clientSecret } = await response.json()

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement)!,
        },
      })

      if (error) {
        setSuccess(false)
      } else if (paymentIntent.status === "succeeded") {
        setSuccess(true)
      }
      setShowStatus(true)
    } catch (err) {
      setSuccess(false)
      setShowStatus(true)
    }

    setLoading(false)
  }

  if (showStatus) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <TransactionStatus success={success} amount={amount} tokens={amount} />
        </motion.div>
      </div>
    )
  }

  return (
    <div className="flex justify-center items-center min-h-screen w-full px-4 md:px-8 lg:px-16 min-w-[550px]">

      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[1100px]"
        >
          <Card className="w-full bg-background/40 border-border dark:bg-[#081220] dark:border-gray-800 grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px] flex items-center p-6">
            <div className="hidden lg:block lg:min-w-[420px] lg:max-w-[420px]">
              <CreditCardDesign
              cardNumber={cardNumberIsComplete}
              expiryDate={myIsComplete}
              cvcCode={cvcIsComplete}
              imageDisplay={selectedPayment || ""}
              />
            </div>
            <div className="w-full">
              <CardHeader>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                >
                  <CardTitle>Déposer des fonds</CardTitle>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                >
                  <CardDescription>Completez votre achat de tokens en utilisant notre méthode de paiement sécurisée.</CardDescription>
                </motion.div>
              </CardHeader>
              <div className="flex items-center justify-center">

              </div>
              <CardContent>
                <form onSubmit={handlePayment} className="space-y-6">
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.3 }}
                  >
                    <RadioGroup
                      value={selectedPayment}
                      onValueChange={setSelectedPayment}
                      label={
                        <span className="flex items-center gap-2">
                          <CreditCard className="w-5 h-5" /> Paiement
                        </span>
                      }
                    >
                      <div className="flex gap-4 w-full">
                        <CustomRadio description="Visa" value="visa">
                          <div className="flex flex-col items-center gap-2 pt-3">
                            <img
                              src={visa.src}
                              alt="Logo Visa"
                              className="w-15 h-5"
                            />
                          </div>
                        </CustomRadio>
                        <CustomRadio description="Mastercard" value="mastercard">
                          <div className="flex flex-col items-center gap-2">
                            <img
                              src={mastercard.src}
                              alt="Logo Mastercard"
                              className="w-13 h-8"
                            />
                          </div>
                        </CustomRadio>
                      </div>
                    </RadioGroup>
                    <Spacer y={4} />
                    <Label htmlFor="amount">Montant à déposer</Label>
                    <Input
                      id="amount"
                      type="text"
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      className="w-full bg-background/40 border-border dark:bg-[#111827] dark:border-gray-800 text-foreground"
                      placeholder="Entrez le montant"
                    />
                    <p className="text-sm text-gray-500">Vous recevrez: {amount} USDT</p>
                  </motion.div>
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 0.3 }}
                  >
                    <Label>Numéro de carte</Label>
                    <div className="h-10 px-3 py-2 border rounded-md">
                      <CardNumberElement
                        options={CARD_ELEMENT_OPTIONS}
                        onChange={(event) =>
                          setCardNumberIsComplete(event.complete)
                        }
                      />
                    </div>
                  </motion.div>
                  <motion.div
                    className="flex space-x-4"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6, duration: 0.3 }}
                  >
                    <div className="flex-1 space-y-2">
                      <Label>Date d'expiration</Label>
                      <div className="h-10 px-3 py-2 border rounded-md">
                        <CardExpiryElement
                          options={CARD_ELEMENT_OPTIONS}
                          onChange={(event) => setMYIsComplete(event.complete)}
                        />
                      </div>
                    </div>
                    <div className="flex-1 space-y-2">
                      <Label>CVC</Label>
                      <div className="h-10 px-3 py-2 border rounded-md">
                        <CardCvcElement
                          options={CARD_ELEMENT_OPTIONS}
                          onChange={(event) => setCvcIsComplete(event.complete)}
                        />
                      </div>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.3 }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button type="submit" disabled={loading} isLoading={loading} className="w-full" color="primary">
                      {loading ? "Traitement en cours..." : "Payer avec Stripe"}
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

