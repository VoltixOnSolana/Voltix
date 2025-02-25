"use server"

import { Card, Spacer } from "@heroui/react"
import { getUserBilling } from "../action/userAccountAction"
import React from 'react'
import NumberTicker from "@/components/ui/number-ticker"
import { CheckCircle, XCircle } from "lucide-react";

export default async function Billing({ params }: { params: Promise<{ idUser: string }> }) {
    const { idUser } = await params
    const invoices = await getUserBilling(idUser)
    return (
        <div className="container mx-auto p-4 h-full">
          <Spacer y={12} />
            <h1 className="text-3xl font-extrabold text-center mb-8 bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 bg-clip-text text-transparent tracking-wide">
                Historique des paiements
            </h1>
            {invoices.map((invoice) => (
                <Card key={invoice.id} className="p-6 my-4 mx-auto max-w-2xl shadow-lg rounded-lg bg-[#121212] border border-[#262626] text-white">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-200">Facture #{invoice.id}</h2>
                  <span
                    className={`flex items-center gap-1 text-sm font-medium px-3 py-1 rounded-full ${
                      invoice.status === "success" ? "bg-green-600/20 text-green-400" : "bg-red-600/20 text-red-400"
                    }`}
                  >
                    {invoice.status === "success" ? <CheckCircle size={16} /> : <XCircle size={16} />}
                    {invoice.status === "success" ? "Versé" : "Non versé"}
                  </span>
                </div>
                <div className="mb-2 text-gray-300">
                  <p className="text-2xl font-bold">
                    <NumberTicker value={invoice.amount} isBilling={true} /> <span className="text-gray-400">CHF</span>
                  </p>
                </div>
                <p className="text-sm text-gray-500">Payé le {invoice.createdAt.toLocaleDateString()}</p>
              </Card>
            ))}
        </div>
    )
}
