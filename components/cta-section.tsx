"use client";

import { Input, Button } from "@/utils/HeroUI";
import Link from "next/link";
import React from 'react'
import NumberTicker from "./ui/number-ticker";

export default function CtaSection() {
    const [email, setEmail] = React.useState("");

    return (
        <div className="py-10 lg:py-20 flex flex-col gap-4">
            <h2 className="text-4xl font-bold text-center">Plus de <NumberTicker value={100000} isAccueil={true} /> utilisateurs nous font confiance</h2>
            <p className="text-gray-400 text-center text-base font-normal">Rejoignez-nous et commencez à trader en toute sécurité</p>
            <div className="mt-4 flex flex-row justify-center items-center gap-4 max-w-sm mx-auto">
                <Input placeholder="Adresse email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Button as={Link} href={`/sign-up?email=${email}`} color="primary" size="md">
                    Commencer
                </Button>
            </div>
        </div>
    )
}