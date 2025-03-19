"use server"

import { Spacer } from "@heroui/react"
import { getUserBilling } from "../action/userAccountAction"
import React from 'react'
import CardBilling from "@/components/card-billing"


export default async function Billing({ params }: { params: Promise<{ idUser: string }> }) {
  const { idUser } = await params
  const invoices = await getUserBilling(idUser)
  const invoicesReverse = invoices.reverse()
  return (
    <div className="container mx-auto p-4 h-screen">
      <Spacer y={12} />
      <h1 className="text-3xl font-extrabold text-center mb-8 text-foreground">
        Historique des paiements
      </h1>
      {invoicesReverse.length === 0 ? (
        <div className="text-center text-muted-foreground">
          Aucun paiement trouvé
        </div>
      ) : (
        invoicesReverse.map((invoice, index) => (
          <CardBilling
            key={invoice.id}
            invoice={invoice}
            animationDelay={index * 150}
          />
        ))
      )}
    </div>
  )
}
