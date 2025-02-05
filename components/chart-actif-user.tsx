"use client"
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
import NumberTicker from "./ui/number-ticker"
import { Button } from "@heroui/react"
import Link from "next/link"
import { paths } from "@/paths"

// Définition de l'interface pour les propriétés du composant
interface ChartActifUserProps {
  rows: {
    date: string;
    amount: number;
  }[],
  idUser: string
}

// Composant principal pour afficher le graphique de l'actif utilisateur
export function ChartActifUser({ rows, idUser }: ChartActifUserProps) {
  // Transformation des données pour le graphique
  let chartData = rows.map((row) => ({
    date: row.date,
    amount: row.amount,
  }))

  // Ajout d'un jour précédent si un seul élément est présent
  if (chartData.length === 1) {
    const previousDate = new Date(chartData[0].date)
    previousDate.setDate(previousDate.getDate() - 1)
    chartData = [
      {
        date: previousDate.toISOString().split('T')[0], // Format YYYY-MM-DD
        amount: 0,
      },
      ...chartData,
    ]
  }

  // Configuration du graphique
  const chartConfig = {
    amount: {
      label: "Actif total",
      color: "hsl(270, 50%, 50%)",
    },
  } satisfies ChartConfig

  // Si aucune donnée n'est disponible, afficher un message et un bouton
  if (rows.length === 0) {
    return (
      <Card className="bg-[#18181b] border-gray-800 p-4 max-h-[500px] min-h-[200px]">
        <CardHeader>
          <CardTitle>Votre actif total : <NumberTicker value={0} /> €</CardTitle>
          <Button
            color="primary"
            size="sm"
            className="max-w-[150px]"
            as={Link}
            href={paths.userDeposit(idUser)}>
            Déposer de l'argent
          </Button>
        </CardHeader>
        <CardContent>
          <p>Aucune donnée disponible.</p>
        </CardContent>
      </Card>
    )
  }

  // Rendu du graphique avec les données disponibles
  return (
    <Card className="bg-[#18181b] border-gray-800 p-4 max-h-[500px]">
      <CardHeader>
        <CardTitle>Votre actif total : <NumberTicker value={rows[rows.length - 1].amount} /> €</CardTitle>
        <CardDescription>Sur les 7 derniers jours</CardDescription>
        <Button
          color="primary"
          size="sm"
          className="max-w-[150px]"
          as={Link}
          href={paths.userDeposit(idUser)}>
          Déposer de l'argent
        </Button>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
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
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="amount"
              type="natural"
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
      <CardFooter className=" text-sm">
        {/* Pied de carte, peut être utilisé pour des informations supplémentaires */}
      </CardFooter>
    </Card>
  )
}
