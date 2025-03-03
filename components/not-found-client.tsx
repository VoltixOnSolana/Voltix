"use client";

import { Button } from "@/components/ui/button";
import { TrendingUpDown, Bitcoin, ArrowLeft, MessageCircleQuestionIcon } from "lucide-react";
import { paths } from "@/paths";
import Link from "next/link";
import { SmallVariationDisplay } from "@/components/small-variation-display";
import { Spacer } from "@heroui/react";
import { useTheme } from "next-themes"

interface Token {
  symbol: string;
  name: string;
  price: number;
}

interface NotFoundClientProps {
  tokens: Token[];
}

export default function NotFoundClient({ tokens }: NotFoundClientProps) {
  const { theme } = useTheme()
  const border = theme === "dark" ? "border border-gray-500" : "border border-gray-500"
  const text = theme === "dark" ? "text text-white" : "text text-gray-800"
 
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center space-y-4">
      <div className={`relative text-center space-y-4 ${border} p-4 rounded-lg w-[450px]`} suppressHydrationWarning>
        <div className="relative flex items-center justify-center gap-1 text-5xl font-bold">
          <span className={`${text}`} suppressHydrationWarning>4</span>
          <Bitcoin className="h-10 w-10 animate-pulse text-primary" />
          <span className={`${text}`} suppressHydrationWarning>4</span>
        </div>

        <h1 className={`mb-2 text-2xl font-bold tracking-tight ${text}`} suppressHydrationWarning>
          Page introuvable
        </h1>
        <p className="mb-6 text-[#8a8f98]">
          Impossible de trouver cette page, elle a peut-être été déplacée ou n'existe plus.
        </p>

        <Spacer y={4} />

        <p className="text-sm text-gray-500 text-left flex items-center gap-2">
          Découvrez les variations du Marché
          <TrendingUpDown className="w-4 h-4" /> 
        </p>

        <div className="mb-6 grid grid-cols-2 gap-3">
          {tokens .sort(() => 0.5 - Math.random()).slice(0, 4).map((token) => (
            <SmallVariationDisplay key={token.symbol} token={token} />
          ))}
        </div>

        <Spacer y={4} />

        <div className="flex gap-2">
          <Button className="w-1/2 bg-[#2c2f36] text-white hover:bg-[#3a3f4c]">
            <Link href={paths.home()} className="flex gap-2 items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour à l'accueil
            </Link>
          </Button>
          <Button color="primary" className="w-1/2 text-white">
            <Link href={paths.contact()} className="flex gap-2 items-center">
              <MessageCircleQuestionIcon className="h-4 w-4" />
              Nous contacter
            </Link>
          </Button>
        </div>

        <Spacer y={4} />

        <p className="mt-4 text-xs text-[#8a8f98]">
          Pendant que vous êtes ici, rappelez-vous : gardez votre calme et pensez long terme.
        </p>
      </div>
    </div>
  );
}
