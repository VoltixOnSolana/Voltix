"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import NumberTicker from "./ui/number-ticker"
import { useEffect, useState } from "react"

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

export function TokenChart({ token }: TokenChartProps) {
    // Calcul de la variation en pourcentage
    const [priceChange, setPriceChange] = useState(0);

    useEffect(() => {
        setPriceChange(token.priceLastDay 
            ? ((token.price - token.priceLastDay) / token.priceLastDay) * 100 
            : 0);
    }, [token.price])
    // Création des données du graphique sur 7 jours
    const chartData = [
        { date: "J-7", price: token.priceLast7Days || token.price },
        { date: "J-6", price: token.priceLast6Days || token.price },
        { date: "J-5", price: token.priceLast5Days || token.price },
        { date: "J-4", price: token.priceLast4Days || token.price },
        { date: "J-3", price: token.priceLast3Days || token.price },
        { date: "J-2", price: token.priceLast2Days || token.price },
        { date: "J-1", price: token.priceLastDay || token.price },
        { date: "Aujourd'hui", price: token.price },
    ];

    const chartConfig = {
        price: {
            label: "Prix",
            color: "hsl(270, 50%, 50%)",
        },
    } satisfies ChartConfig

    return (
        <Card className="bg-[#18181b] border-gray-800 p-4 max-h-[400px]">
            <CardHeader>
                <CardTitle>
                    <div className="flex flex-col gap-2">
                        <span>{token.name} ({token.symbol})</span>
                        <div className="flex items-center gap-4">
                            <NumberTicker value={token.price} />
                            <span className={priceChange >= 0 ? "text-green-500" : "text-red-500"}>
                                {priceChange >= 0 ? "+" : ""}{priceChange.toFixed(2)}%
                            </span>
                        </div>
                    </div>
                </CardTitle>
                <CardDescription>Sur les 7 derniers jours</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-[200px] w-full">
                    <LineChart
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                        />
                        <ChartTooltip
                            content={<ChartTooltipContent />}
                        />
                        <Line
                            type="natural"
                            dataKey="price"
                            stroke="hsl(270, 50%, 50%)"
                            strokeWidth={2}
                            dot={{
                                fill: "hsl(270, 50%, 50%)",
                            }}
                            activeDot={{
                                r: 6,
                            }}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
} 