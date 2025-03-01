"use client"

import { useTokens } from "@/contexts/TokenContext"
import { paths } from "@/paths"
import { Autocomplete, AutocompleteItem, Chip, Spinner } from "@heroui/react"
import { SearchIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import React, { Key } from "react"

export function SearchBar() {
    const { tokens } = useTokens()
    const router = useRouter()
    const [selectedToken, setSelectedToken] = React.useState<string>("")
    const [isLoading, setIsLoading] = React.useState(false)

    const handleSelectionChange = async (value: Key | null) => {
        if (!value) return
        
        setSelectedToken(value as string)
        setIsLoading(true)
        
        try {
            router.push(paths.marketDetails(value as string))
        } finally {
            setIsLoading(false)
        }
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(price)
    }

    const getPriceColor = (price: number) => {
        if (price > 1000) return "success"
        if (price < 100) return "primary"
        return "default"
    }

    return (
        <Autocomplete
            defaultItems={tokens}
            label="Rechercher un token"
            placeholder="BTC, ETH, etc..."
            className="max-w-xs"
            selectedKey={selectedToken}
            onSelectionChange={handleSelectionChange}
            startContent={
                isLoading ? (
                    <Spinner size="sm" color="primary" />
                ) : (
                    <SearchIcon className="text-default-400" size={18} />
                )
            }
            size="sm"
            variant="flat"
            classNames={{
                base: "max-w-xs",
                listboxWrapper: "max-h-[400px]",
                selectorButton: "text-default-500",
                listbox: "bg-transparent",
            }}
        >
            {(token) => (
                <AutocompleteItem 
                    key={token.symbol} 
                    textValue={token.symbol}
                    className="data-[hover=true]:bg-default-100/10"
                >
                    <div className="flex justify-between items-center gap-2">
                        <div className="flex flex-col">
                            <span className="text-small font-medium text-foreground">
                                {token.symbol}
                            </span>
                            <span className="text-tiny text-default-400">
                                {token.name}
                            </span>
                        </div>
                        <Chip 
                            size="sm" 
                            variant="flat" 
                            color={getPriceColor(token.price)}
                            className="text-foreground"
                        >
                            {formatPrice(token.price)}
                        </Chip>
                    </div>
                </AutocompleteItem>
            )}
        </Autocomplete>
    )
}