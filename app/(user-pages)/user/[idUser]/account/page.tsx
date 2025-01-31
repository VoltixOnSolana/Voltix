import { TablesTokens } from "@/components/tables-tokens"
import { getTokenOfUser, getTransactionsForLast7Days } from "../action/userAccountAction"
import { ChartUserAccount } from "@/components/chart-user-account"
import { Button } from "@heroui/react"
import Link from "next/link"
import { paths } from "@/paths"
import { ChartActifUser } from "@/components/chart-actif-user"

type Params = Promise<{ idUser: string }>

export default async function AccountPage({
    params,
}: {
    params: Params
}) {
    const { idUser } = await params
    const tokens = await getTokenOfUser(idUser)
    async function getChartData(userId: string) {
        const transactions = await getTransactionsForLast7Days(userId);
        const dailyData = transactions.reduce((acc, transaction) => {
            const transactionDate = transaction.createdAt.toISOString().slice(0, 10);
            const tokenSymbol = transaction.token.symbol;
            const amount = transaction.amount * transaction.priceAtTransaction;

            if (!acc[transactionDate]) {
                acc[transactionDate] = {};
            }

            if (!acc[transactionDate][tokenSymbol]) {
                acc[transactionDate][tokenSymbol] = 0;
            }

            acc[transactionDate][tokenSymbol] += amount;

            return acc;
        }, {} as Record<string, Record<string, number>>);

        const chartData = Object.keys(dailyData).map((date) => {
            const totalAmount = Object.values(dailyData[date]).reduce((sum, amount) => sum + amount, 0);
            return { date, amount: totalAmount };
        });

        return chartData;
    }

    const actifsUser = await getChartData(idUser)
    return (
        <div className="w-full h-screen">
            <div className="flex flex-col md:flex-row gap-4 px-10 py-4">
                <div className="flex-1">
                    <ChartActifUser rows={actifsUser} />
                </div>
                <div className="flex-1">
                    <ChartUserAccount rows={tokens} />
                </div>
            </div>
            <Button
                color="primary"
                className="ml-10"
                as={Link}
                href={paths.userDeposit(idUser)}>
                Déposer de l'argent
            </Button>
            <TablesTokens rows={tokens} />
        </div>
    )
}