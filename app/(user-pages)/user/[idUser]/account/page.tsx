'use server'

import { TablesTokens } from "@/components/tables-tokens"
import { getTokenOfUser } from "../action/userAccountAction"
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
    return (
            <div className={`${tokens.length === 0 ? "min-h-screen" : "w-full h-full"}`}>
                <div className="flex flex-col md:flex-row gap-4 px-10 py-4">
                    <div className="flex-1">
                        <ChartActifUser rows={tokens} idUser={idUser} />
                    </div>
                    <div className="flex-1">
                        <ChartUserAccount rows={tokens} />
                    </div>
                </div>
                    <TablesTokens isActifUser={true} tokensFromUser={tokens} />
            </div>
    )
}