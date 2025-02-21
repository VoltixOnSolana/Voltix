"use server"

import { Card } from "@heroui/react"
import { getUserBilling } from "../action/userAccountAction"
import React from 'react'
import NumberTicker from "@/components/ui/number-ticker"

export default async function Billing({ params }: { params: Promise<{ idUser: string }> }) {
    const { idUser } = await params
    const invoices = await getUserBilling(idUser)
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold text-center mb-6">Facturation</h1>
            {invoices.map((invoice) => (
                <Card key={invoice.id} className="p-6 my-4 mx-auto max-w-2xl shadow-lg rounded-lg">
                    <h2 className="text-lg font-bold mb-2">Montant: <NumberTicker value={invoice.amount} /></h2>
                    <p className="text-sm mb-1">Date de paiement: {invoice.createdAt.toLocaleDateString()}</p>
                    <p className="text-sm">Statut: {invoice.status === "success" ? "Versé" : "Non versé"}</p>
                </Card>
            ))}
        </div>
    )
}
