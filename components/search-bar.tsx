"use client"

import { useTokens } from "@/contexts/TokenContext"
import { paths } from "@/paths"
import { Autocomplete, AutocompleteItem } from "@heroui/react"
import { useRouter } from "next/navigation"
import { Key, useState } from "react"

export function SearchBar() {
    const { tokens } = useTokens()
    const router = useRouter()
    const [selectedToken, setSelectedToken] = useState<string>("")

    const handleSelectionChange = (value: Key | null) => {
        setSelectedToken(value as string)
        if (value) {
            router.push(paths.marketDetails(value as string))
        }
    }

    return (
        <Autocomplete
            defaultItems={tokens}
            label="Rechercher un token"
            placeholder="BTC, ETH, etc..."
            className="max-w-xs border-gray-800 max-h-[50px]"
            selectedKey={selectedToken}
            onSelectionChange={handleSelectionChange}
            size="sm"
            variant="underlined"
        >
            {(token) => (
                <AutocompleteItem key={token.symbol} textValue={token.symbol}>
                    <div className="flex justify-between items-center">
                        <div className="flex flex-col">
                            <span className="text-small">{token.symbol}</span>
                            <span className="text-tiny text-default-400">{token.name}</span>
                        </div>
                        <span className="text-small">{token.price.toFixed(2)} $</span>
                    </div>
                </AutocompleteItem>
            )}
        </Autocomplete>
    )
} 