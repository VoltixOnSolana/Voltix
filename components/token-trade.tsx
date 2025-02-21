"use client"

import { buyToken, sellToken } from "@/app/(market-pages)/action/marketAction"
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
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"

interface TokenTradeProps {
    token: {
        symbol: string;
        price: number;
        id: number;
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
    const [isLoading, setIsLoading] = useState(false);
    const totalUsd = (usd.USDT || 0) + (usd.USDC || 0);
    const router = useRouter();
    const { toast } = useToast()


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

    const handleTrade = async (type: 'buy' | 'sell') => {
        if (type === 'buy' && user) {
            const buyTokenAction = buyToken.bind(null, user.id, token.id, Number(buyAmount), token.price)
            await buyTokenAction()
        } else if (type === 'sell' && user) {
            const sellTokenAction = sellToken.bind(null, user.id, token.id, Number(sellAmount), token.price)
            await sellTokenAction()
        }
    }

    const handleBuy = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        handleTrade('buy');
        setTimeout(() => {
            setIsLoading(false);
            setBuyAmount("0")
            setBuyUsdAmount("0")
            setIsBuySliderActive(false);
            router.refresh()
            toast({
                title: "Transaction réussie",
                description: "Vous avez acheté " + buyAmount + " " + token.symbol,
            })
        }, 2000);
    }

    const handleSell = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        handleTrade('sell');
        setTimeout(() => {
            setIsLoading(false);
            setSellAmount("0")
            setSellUsdAmount("0")
            setIsSellSliderActive(false);
            router.refresh()
            toast({
                title: "Transaction réussie",
                description: "Vous avez vendu " + sellAmount + " " + token.symbol,
            })
        }, 2000);
    }

    return (
        <Card className="bg-[#18181b] border-gray-800 max-h-[400px] h-full">
            <CardHeader>
                <CardTitle>Trader {token.symbol}</CardTitle>
            </CardHeader>
            <CardContent>
                <Tabs aria-label="Options">
                    <Tab key="buy" title="Achat" isDisabled={isLoading}>
                        <form onSubmit={handleBuy} className="flex flex-col gap-4">
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
                                {totalUsd > 0 && (
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
                                    value={Number(buyUsdAmount)}
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
                                )}
                                <Input
                                    placeholder={`Montant en ${token.symbol}`}
                                    value={buyAmount}
                                    onChange={(e) => setBuyAmount(e.target.value)}
                                    isDisabled={!user}
                                />
                            </div>
                            <Button
                                color="primary"
                                type="submit"
                                isDisabled={!user || Number(buyUsdAmount) > totalUsd || Number(buyUsdAmount) <= 0 || isLoading}
                                isLoading={isLoading}
                            >
                                {isLoading ? "Transation en cours..." : `Acheter ${token.symbol}`}
                            </Button>
                        </form>
                    </Tab>
                    <Tab key="sell" title="Vente">
                        <form onSubmit={handleSell} className="flex flex-col gap-4">
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
                                {tokenBalance > 0 && (
                                    <Slider
                                        key={`${token.symbol}-sell`}
                                        aria-label={`Montant en ${token.symbol}`}
                                        className="pb-6"
                                        size="sm"
                                        color="danger"
                                    value={Number(sellAmount)}
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
                                )}
                                <Input
                                    placeholder="Montant en USD"
                                    value={sellUsdAmount}
                                    onChange={(e) => setSellUsdAmount(e.target.value)}
                                    isDisabled={!user}
                                />
                            </div>
                            <Button
                                color="danger"
                                type="submit"
                                isDisabled={!user || Number(sellAmount) > tokenBalance || Number(sellAmount) <= 0 || isLoading}
                                isLoading={isLoading}
                            >
                                {isLoading ? "Transation en cours..." : `Vendre ${token.symbol}`}
                            </Button>
                        </form>
                    </Tab>
                </Tabs>
            </CardContent>
        </Card>
    )
} 