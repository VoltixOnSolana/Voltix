import React from "react";
import { FlipWords } from "@/components/ui/flip-words";

export function HeroSection() {
    const words = ["innovant", "sécurisé", "rapide", "fiable"];

    return (
        <div className="h-[40rem] flex justify-center items-center px-4">
            <div className="text-4xl mx-auto font-normal text-center">
                <div className="gradient-text py-2">Voltix</div>
                <div className="text-gray-200">
                    Votre exchange <span className="text-[#7C3AED] opacity-1">crypto</span>
                    <FlipWords words={words} />
                </div>
            </div>
        </div>
    );
}
