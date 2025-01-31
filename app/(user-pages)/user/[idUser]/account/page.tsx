import { TablesTokens } from "@/components/tables-tokens"
import { getTokenOfUser } from "../action/userAccountAction"
import { ChartUserAccount } from "@/components/chart-user-account"

type Params = Promise<{ idUser: string }>

export default async function AccountPage({
    params,
}: {
    params: Params
}) {
    const { idUser } = await params
    const tokens = await getTokenOfUser(idUser)
    return (
        <div className="w-full h-screen">
            <div className="flex flex-col md:flex-row gap-4 px-10 py-4">
                <div className="flex-1">
                    <ChartUserAccount rows={tokens}/>
                </div>
                <div className="flex-1">
                    <ChartUserAccount rows={tokens} />
                </div>
            </div>
            <TablesTokens rows={tokens} />
        </div>
    )
}