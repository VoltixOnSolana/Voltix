"use client"

import { TrendingUp, TrendingDown } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

// Configuration du graphique pour le symbol
const chartConfig = {
    btc: {
        label: "Symbol",
        color: "hsl(var(--primary))",
    },
} satisfies ChartConfig

interface ChartHeroProps {
    title: string;
    data: { day: string; price: number }[];
}

// Composant pour afficher un graphique de prix de crypto-monnaie
export function ChartHero({ title, data }: ChartHeroProps) {
    return (
        <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="text-gray-200 max-w-sm">
                <CardTitle>{title} - 6 derniers jours</CardTitle>
                <CardDescription className="text-gray-400">
                    Le prix du {title} sur ces 6 derniers jours est de {data[5].price}$
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <LineChart
                        accessibilityLayer
                        data={data}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="day"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Line
                            dataKey="price"
                            type="natural"
                            stroke="var(--color-btc)"
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none text-gray-200">
                    Tendance {((data[5].price - data[0].price) / data[0].price * 100) > 0 ? <TrendingUp className="h-4 w-4 text-green-500" /> : <TrendingDown className="h-4 w-4 text-red-500" />}
                </div>
                <div className="text-gray-400">
                    de {((data[5].price - data[0].price) / data[0].price * 100).toFixed(2)}% sur les 6 derniers jours
                </div>
            </CardFooter>
        </Card >
    )
}
