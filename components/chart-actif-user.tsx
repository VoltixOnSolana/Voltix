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
import { useTokens } from "@/contexts/TokenContext"

// Définition de l'interface pour les propriétés du composant
interface CommonToken {
  symbol: string;
  price: number;
  amount?: number; // Optionnel pour les tokens de la base de données
  id?: number; // Optionnel pour les tokens de l'utilisateur
  name?: string;
  marketCap?: number;
  supply?: number;
  lastPrice?: number;
  lastPrice2?: number;
  lastPrice3?: number;
  lastPrice4?: number;
  lastPrice5?: number;
  lastPrice6?: number;
  lastPrice7?: number;
}
interface ChartActifUserProps {
  rows: CommonToken[]
  idUser: string
}

// Composant principal pour afficher le graphique de l'actif utilisateur
export function ChartActifUser({ rows, idUser }: ChartActifUserProps) {
  const { tokens: marketTokens } = useTokens();

  // Calcul du montant total actuel
  const totalAmount = rows.reduce((acc, row) => {
    const marketToken = marketTokens.find(t => t.symbol === row.symbol);
    const currentPrice = marketToken?.price || row.price;
    return acc + ((row.amount ?? 0) * currentPrice);
  }, 0);

  // Création des données du graphique sur 7 jours
  const chartData = [
    { date: "J-7", amount: calculateDayTotal(7) },
    { date: "J-6", amount: calculateDayTotal(6) },
    { date: "J-5", amount: calculateDayTotal(5) },
    { date: "J-4", amount: calculateDayTotal(4) },
    { date: "J-3", amount: calculateDayTotal(3) },
    { date: "J-2", amount: calculateDayTotal(2) },
    { date: "J-1", amount: calculateDayTotal(1) },
    { date: "Aujourd'hui", amount: totalAmount },
  ];

  // Fonction pour calculer le total pour un jour spécifique
  function calculateDayTotal(day: number): number {
    return rows.reduce((acc, row) => {
      const historicPrice = Number(row[`lastPrice${day}` as keyof typeof row] || row.price);
      return acc + ((row.amount ?? 0) * historicPrice);
    }, 0);
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
        <CardTitle>Votre actif total : <NumberTicker value={totalAmount} /> €</CardTitle>
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
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
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
