import { TablesTokens } from "@/components/tables-tokens"
import { getTokenOfUser, getTransactionsForLast7Days } from "../action/userAccountAction"
import { ChartUserAccount } from "@/components/chart-user-account"
import { ChartActifUser } from "@/components/chart-actif-user"

// Type pour les paramètres de la fonction asynchrone
type Params = Promise<{ idUser: string }>

// Fonction principale pour la page de compte utilisateur
export default async function AccountPage({
    params,
}: {
    params: Params
}) {
    // Extraction de l'identifiant utilisateur à partir des paramètres
    const { idUser } = await params
    // Récupération des tokens de l'utilisateur
    const tokens = await getTokenOfUser(idUser)

    // Fonction pour obtenir les données du graphique
    async function getChartData(userId: string) {
        // Récupération des transactions des 7 derniers jours
        const transactions = await getTransactionsForLast7Days(userId);
        // Réduction des transactions pour obtenir les données journalières
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

        // Transformation des données pour le graphique
        const chartData = Object.keys(dailyData).map((date) => {
            const totalAmount = Object.values(dailyData[date]).reduce((sum, amount) => sum + amount, 0);
            return { date, amount: totalAmount };
        });

        return chartData;
    }

    // Récupération des données d'actifs de l'utilisateur
    const actifsUser = await getChartData(idUser)
    // Rendu de la page avec les composants graphiques et de tableau
    return (
        <div className={`${tokens.length === 0 ? "min-h-screen" : "w-full h-full"}`}>
            <div className="flex flex-col md:flex-row gap-4 px-10 py-4">
                <div className="flex-1">
                    <ChartActifUser rows={actifsUser} idUser={idUser} />
                </div>
                <div className="flex-1">
                    <ChartUserAccount rows={tokens} />
                </div>
            </div>
            <TablesTokens isActifUser={true} tokensFromUser={tokens} />
        </div>
    )
}