import { TablesTokens } from "@/components/tables-tokens"
import { getTokenOfUser } from "../action/userAccountAction"
import { ChartUserAccount } from "@/components/chart-user-account"
import { Button } from "@heroui/react"
import Link from "next/link"
import { paths } from "@/paths"

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
                    <ChartUserAccount rows={tokens} />
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