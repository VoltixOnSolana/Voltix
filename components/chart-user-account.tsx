"use client"

import { Pie, PieChart } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent } from "@/components/ui/chart"

// Palette de violets : dégradé de violet en ajustant la luminosité
const violetPalette = [
    "hsl(270, 50%, 80%)", // Violet clair
    "hsl(270, 50%, 70%)", // Violet moyen clair
    "hsl(270, 50%, 60%)", // Violet moyen
    "hsl(270, 50%, 50%)", // Violet foncé
    "hsl(270, 50%, 40%)", // Violet très foncé
]

interface ChartUserProps {
    rows: {
        symbol: string;
        amount: number;
        price: number;
    }[]
}

export function ChartUserAccount({rows}: ChartUserProps) {
    // Si le tableau est vide, afficher un message
    if (rows.length === 0) {
        return (
            <Card className="bg-[#18181b] border-gray-800 p-4">
                <CardHeader className="items-center pb-0">
                    <CardTitle>Distribution des Cryptos</CardTitle>
                    <CardDescription>Top 5 des cryptos détenues</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 pb-0 text-center">
                    <p>Aucune donnée disponible.</p>
                </CardContent>
            </Card>
        )
    }

    const sortedRows = rows.sort((a, b) => b.amount - a.amount).slice(0, 5)

    const chartData = sortedRows.map((row, index) => ({
        crypto: row.symbol,
        amount: row.amount,
        fill: violetPalette[index % violetPalette.length], // Assigner une couleur de la palette
    }))
    
    const chartConfig: ChartConfig = sortedRows.reduce((config, row, index) => {
        config[row.symbol] = {
            label: row.symbol,
            color: violetPalette[index % violetPalette.length], // Couleur dynamique basée sur la palette
        }
        return config
    }, {} as ChartConfig)

    return (
        <Card className="border-none ">
            <CardHeader className="items-center pb-0">
                <CardTitle>Distribution des Cryptos</CardTitle>
                <CardDescription>Top 5 des cryptos détenues</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[300px]"
                >
                    <PieChart>
                        <Pie data={chartData} dataKey="amount" nameKey="crypto" cx="50%" cy="50%" outerRadius="80%" fill="#8884d8" label />
                        <ChartLegend
                            content={<ChartLegendContent nameKey="crypto" />}
                            className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
