"use client"

import React, { useEffect, useState } from 'react'
import { Card } from "@/components/ui/card"
import { CheckCircle, XCircle } from "lucide-react"
import NumberTicker from "@/components/ui/number-ticker"
import { motion } from "framer-motion"

export default function CardBilling({
  invoice,
  animationDelay = 0
}: {
  invoice: any;
  animationDelay?: number;
}) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, animationDelay)

    return () => clearTimeout(timer)
  }, [animationDelay])

  return (
    <motion.div
      key={invoice.id}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-6 my-4 mx-auto max-w-2xl shadow-lg rounded-lg bg-background/40 border-border dark:bg-[#121212] dark:border-[#262626] text-white">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Facture #{invoice.id}</h2>
          <span
            className={`flex items-center gap-1 text-sm font-medium px-3 py-1 rounded-full ${invoice.status === "success" ? "bg-green-600/20 text-green-400" : "bg-red-600/20 text-red-400"
              }`}
          >
            {invoice.status === "success" ? <CheckCircle size={16} /> : <XCircle size={16} />}
            {invoice.status === "success" ? "Versé" : "Non versé"}
          </span>
        </div>
        <div className="mb-2 text-foreground">
          <p className="text-2xl font-bold">
            <NumberTicker value={invoice.amount} isBilling={true} /> <span className="text-foreground/80">CHF</span>
          </p>
        </div>
        <p className="text-sm text-foreground/80">Payé le {invoice.createdAt.toLocaleDateString()}</p>
      </Card>
    </motion.div>
  )
}
