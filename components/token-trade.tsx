"use client"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Button,
    Input,
    Tabs,
    Tab,
    CardBody
} from "@heroui/react"
import { User } from "@supabase/supabase-js"
import { useState, useEffect } from "react"
import NumberTicker from "./ui/number-ticker"

interface TokenTradeProps {
    token: {
        symbol: string;
        price: number;
    }
    user: User | null
    usd: {
        USDT: number;
        USDC: number;
    }
    tokenBalance: number;
}

export function TokenTrade({ token, user, usd, tokenBalance }: TokenTradeProps) {
    const [buyAmount, setBuyAmount] = useState<string>("")
    const [sellAmount, setSellAmount] = useState<string>("")
    const [buyUsdAmount, setBuyUsdAmount] = useState<string>("")
    const [sellUsdAmount, setSellUsdAmount] = useState<string>("")

    const totalUsd = (usd.USDT || 0) + (usd.USDC || 0);

    // Calculs pour l'achat
    useEffect(() => {
        if (buyAmount) {
            setBuyUsdAmount((Number(buyAmount) * token.price).toFixed(2))
        } else if (buyUsdAmount) {
            setBuyAmount((Number(buyUsdAmount) / token.price).toFixed(6))
        }
    }, [buyAmount, buyUsdAmount, token.price])

    // Calculs pour la vente
    useEffect(() => {
        if (sellAmount) {
            setSellUsdAmount((Number(sellAmount) * token.price).toFixed(2))
        } else if (sellUsdAmount) {
            setSellAmount((Number(sellUsdAmount) / token.price).toFixed(6))
        }
    }, [sellAmount, sellUsdAmount, token.price])

    const handleTrade = (type: 'buy' | 'sell') => {
        // TODO: Implémenter la logique d'achat/vente
        console.log(`${type} ${type === 'buy' ? buyAmount : sellAmount} ${token.symbol} at ${token.price}€`)
    }

    return (
        <Card className="bg-[#18181b] border-gray-800">
            <CardHeader>
                <CardTitle>Trader {token.symbol}</CardTitle>
            </CardHeader>
            <CardContent>
                <Tabs aria-label="Options">
                    <Tab key="buy" title="Achat">
                        <div className="flex flex-col gap-4">
                            <div className="text-sm text-gray-400">
                                Solde disponible: {totalUsd.toFixed(4)} USD
                            </div>
                            <div className="space-y-2">
                                <Input
                                    type="number"
                                    placeholder="Montant en USD"
                                    value={buyUsdAmount}
                                    onChange={(e) => setBuyUsdAmount(e.target.value)}
                                    isDisabled={!user}
                                />
                                <Input
                                    type="number"
                                    placeholder={`Montant en ${token.symbol}`}
                                    value={buyAmount}
                                    onChange={(e) => setBuyAmount(e.target.value)}
                                    isDisabled={!user}
                                />
                            </div>
                            <Button
                                onPress={() => handleTrade('buy')}
                                color="primary"
                                isDisabled={!user || Number(buyUsdAmount) > totalUsd}
                            >
                                Acheter {token.symbol}
                            </Button>
                        </div>
                    </Tab>
                    <Tab key="sell" title="Vente">
                        <div className="flex flex-col gap-4">
                            <div className="text-sm text-gray-400">
                                Solde disponible: {tokenBalance.toFixed(4)} {token.symbol}
                            </div>
                            <div className="space-y-2">
                                <Input
                                    type="number"
                                    placeholder={`Montant en ${token.symbol}`}
                                    value={sellAmount}
                                    onChange={(e) => setSellAmount(e.target.value)}
                                    isDisabled={!user}
                                />
                                <Input
                                    type="number"
                                    placeholder="Montant en USD"
                                    value={sellUsdAmount}
                                    onChange={(e) => setSellUsdAmount(e.target.value)}
                                    isDisabled={!user}
                                />
                            </div>
                            <Button
                                onPress={() => handleTrade('sell')}
                                color="danger"
                                isDisabled={!user || Number(sellAmount) > tokenBalance}
                            >
                                Vendre {token.symbol}
                            </Button>
                        </div>
                    </Tab>
                </Tabs>
            </CardContent>
        </Card>
    )
} 