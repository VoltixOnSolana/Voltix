"use client"

import type React from "react"

import { useState } from "react"
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TransactionStatus } from "@/components/transaction-status"

const CARD_ELEMENT_OPTIONS = {
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

export default function DepositForm() {
  const [loading, setLoading] = useState(false)
  const [amount, setAmount] = useState(0)
  const [showStatus, setShowStatus] = useState(false)
  const [success, setSuccess] = useState(false)
  const stripe = useStripe()
  const elements = useElements()
  const pathname = usePathname()
  const userId = pathname.split("/").slice(-1)[0]

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
      <div className="flex justify-center items-center h-screen">
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
    <div className="flex justify-center items-center h-screen">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="w-full mx-auto bg-[#081220]">
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
            <CardContent>
              <form onSubmit={handlePayment} className="space-y-6">
                <motion.div 
                  className="space-y-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                >
                  <Label htmlFor="amount">Montant à déposer</Label>
                  <Input
                    id="amount"
                    type="text"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full bg-[#111827] text-foreground"
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
                    <CardNumberElement options={CARD_ELEMENT_OPTIONS} />
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
                      <CardExpiryElement options={CARD_ELEMENT_OPTIONS} />
                    </div>
                  </div>
                  <div className="flex-1 space-y-2">
                    <Label>CVC</Label>
                    <div className="h-10 px-3 py-2 border rounded-md">
                      <CardCvcElement options={CARD_ELEMENT_OPTIONS} />
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
                  <Button type="submit" disabled={loading} className="w-full">
                    {loading ? "Traitement en cours..." : "Payer avec Stripe"}
                  </Button>
                </motion.div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

