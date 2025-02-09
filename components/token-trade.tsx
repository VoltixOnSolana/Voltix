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
    Slider
} from "@heroui/react"
import { User } from "@supabase/supabase-js"
import { useState, useEffect } from "react"

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
    const [isBuySliderActive, setIsBuySliderActive] = useState(false);
    const [isSellSliderActive, setIsSellSliderActive] = useState(false);

    const totalUsd = (usd.USDT || 0) + (usd.USDC || 0);

    // Synchronisation des valeurs pour l'achat
    useEffect(() => {
        if (isBuySliderActive) {
            const calculatedBuyAmount = (Number(buyUsdAmount) / token.price).toFixed(6);
            if (calculatedBuyAmount !== buyAmount) {
                setBuyAmount(calculatedBuyAmount);
            }
            setIsBuySliderActive(false);
        }
    }, [buyUsdAmount, token.price, isBuySliderActive]);

    useEffect(() => {
        if (!isBuySliderActive) {
            const calculatedBuyUsdAmount = (Number(buyAmount) * token.price).toFixed(2);
            if (calculatedBuyUsdAmount !== buyUsdAmount) {
                setBuyUsdAmount(calculatedBuyUsdAmount);
            }
        }
    }, [buyAmount, token.price, isBuySliderActive]);

    // Synchronisation des valeurs pour la vente
    useEffect(() => {
        if (isSellSliderActive) {
            const calculatedSellUsdAmount = (Number(sellAmount) * token.price).toFixed(2);
            if (calculatedSellUsdAmount !== sellUsdAmount) {
                setSellUsdAmount(calculatedSellUsdAmount);
            }
            setIsSellSliderActive(false);
        }
    }, [sellAmount, token.price, isSellSliderActive]);

    useEffect(() => {
        if (!isSellSliderActive) {
            const calculatedSellAmount = (Number(sellUsdAmount) / token.price).toFixed(6);
            if (calculatedSellAmount !== sellAmount && !isNaN(Number(calculatedSellAmount))) {
                setSellAmount(calculatedSellAmount);
            }
        }
    }, [sellUsdAmount, token.price, isSellSliderActive]);

    const handleTrade = (type: 'buy' | 'sell') => {
        // TODO: Implémenter la logique d'achat/vente
        console.log(`${type} ${type === 'buy' ? buyAmount : sellAmount} ${token.symbol} at ${token.price}€`)
    }

    return (
        <Card className="bg-[#18181b] border-gray-800 max-h-[400px] h-full">
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
                                    placeholder="Montant en USD"
                                    value={buyUsdAmount}
                                    onChange={(e) => setBuyUsdAmount(e.target.value)}
                                    isDisabled={!user}
                                />
                                <Slider
                                    key={`${token.symbol}-buy`}
                                    aria-label={`Montant en ${token.symbol}-buy`}
                                    size="sm"
                                    color="primary"
                                    marks={[
                                        {
                                            value: totalUsd * 0.25,
                                            label: "25%",
                                        },
                                        {
                                            value: totalUsd * 0.5,
                                            label: "50%",
                                        },
                                        {
                                            value: totalUsd * 0.75,
                                            label: "75%",
                                        },
                                    ]}
                                    defaultValue={0}
                                    maxValue={totalUsd}
                                    minValue={0}
                                    step={0.01}
                                    onChange={(value) => {
                                        setIsBuySliderActive(true);
                                        setBuyUsdAmount(value.toString());
                                    }}
                                    isDisabled={!user}
                                    className="pb-6"
                                />
                                <Input
                                    placeholder={`Montant en ${token.symbol}`}
                                    value={buyAmount}
                                    onChange={(e) => setBuyAmount(e.target.value)}
                                    isDisabled={!user}
                                />
                            </div>
                            <Button
                                onPress={() => handleTrade('buy')}
                                color="primary"
                                isDisabled={!user || Number(buyUsdAmount) > totalUsd || Number(buyUsdAmount) <= 0}
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
                                    placeholder={`Montant en ${token.symbol}`}
                                    value={sellAmount}
                                    onChange={(e) => setSellAmount(e.target.value)}
                                    isDisabled={!user}
                                />
                                                                <Slider
                                    key={`${token.symbol}-sell`}
                                    aria-label={`Montant en ${token.symbol}`}
                                    className="pb-6"
                                    size="sm"
                                    color="danger"
                                    defaultValue={0}
                                    maxValue={tokenBalance}
                                    minValue={0}
                                    step={0.000001}
                                    onChange={(value) => {
                                        setIsSellSliderActive(true);
                                        setSellAmount(value.toString());
                                    }}
                                    isDisabled={!user}
                                    marks={[
                                        {
                                            value: tokenBalance * 0.25,
                                            label: "25%",
                                        },
                                        {
                                            value: tokenBalance * 0.5,
                                            label: "50%",
                                        },
                                        {
                                            value: tokenBalance * 0.75,
                                            label: "75%",
                                        },
                                    ]}
                                />
                                <Input
                                    placeholder="Montant en USD"
                                    value={sellUsdAmount}
                                    onChange={(e) => setSellUsdAmount(e.target.value)}
                                    isDisabled={!user}
                                />
                            </div>
                            <Button
                                onPress={() => handleTrade('sell')}
                                color="danger"
                                isDisabled={!user || Number(sellAmount) > tokenBalance || Number(sellAmount) <= 0}
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