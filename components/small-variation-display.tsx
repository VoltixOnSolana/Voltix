"use client"

import { useEffect, useState } from "react"
import { TrendingUpIcon, TrendingDownIcon } from "lucide-react"
import { useRouter } from 'next/navigation';
import { useTheme } from "next-themes"

interface TokenChartProps {
    token: {
        symbol: string;
        name: string;
        price: number;
        priceLastDay?: number;
        priceLast2Days?: number;
        priceLast3Days?: number;
        priceLast4Days?: number;
        priceLast5Days?: number;
        priceLast6Days?: number;
        priceLast7Days?: number;
    }
}

const ChoseIcon = ({ priceChange }: { priceChange: number }) => {
    if (priceChange >= 0) {
        return <TrendingUpIcon className="text-green-500" />
    } else {
        return <TrendingDownIcon className="text-red-500" />
    }
}

export function SmallVariationDisplay ({ token }: TokenChartProps) {
    const [priceChange, setPriceChange] = useState(0);
    const router = useRouter();
    const { theme } = useTheme()
    
    const border = theme === "dark" ? "border border-gray-500" : "border border-gray-500"
    const text = theme === "dark" ? "text-gray-300" : "text-gray-500"
    
    
        useEffect(() => {
            setPriceChange(token.priceLastDay
                ? ((token.price - token.priceLastDay) / token.priceLastDay) * 100
                : 0);
        }, [token.price])

        return(
            <div className={`flex flex-col h-full space-y-1 ${border} p-2 rounded-lg px-3 cursor-pointer`}
            onClick={() => router.push(`/market/${token.symbol}`)}
            suppressHydrationWarning
            >
                <span className={`text-sm text-left ${text}`} suppressHydrationWarning>{token.name} ({token.symbol})</span>
                <div className="flex items-center gap-2">
                    <span 
                        className={priceChange >= 0 ? "text-green-500 text-sm" : "text-red-500 text-sm"}>
                        {priceChange >= 0 ? "+" : ""}{priceChange.toFixed(2)}% 
                    </span>
                    <ChoseIcon priceChange={priceChange} />
                </div>
            </div>
        )
    }