"use client"
import React from "react";
import { FlipWords } from "@/components/ui/flip-words";
import { Button, Input } from "@heroui/react";
import Link from "next/link";
import { ChartHero } from "./ui/chart-hero";

const btcData = [
    { day: "Lun", price: 101000 },
    { day: "Mar", price: 106000 },
    { day: "Mer", price: 97000 },
    { day: "Jeu", price: 95000 },
    { day: "Ven", price: 100000 },
    { day: "Sam", price: 108000 },
]

const ethData = [
    { day: "Lun", price: 3000 },
    { day: "Mar", price: 3700 },
    { day: "Mer", price: 3500 },
    { day: "Jeu", price: 3300 },
    { day: "Ven", price: 3200 },
    { day: "Sam", price: 3100 },
]

const xrpData = [
    { day: "Lun", price: 1 },
    { day: "Mar", price: 0.70 },
    { day: "Mer", price: 0.60 },
    { day: "Jeu", price: 2 },
    { day: "Ven", price: 3.20 },
    { day: "Sam", price: 2.80 },
]

const suiData = [
    { day: "Lun", price: 1.90 },
    { day: "Mar", price: 3.70 },
    { day: "Mer", price: 1.00 },
    { day: "Jeu", price: 4.80 },
    { day: "Ven", price: 5.00 },
    { day: "Sam", price: 5.20 },
]

export function HeroSection() {
    const words = ["innovant", "sécurisé", "rapide", "fiable"];
    const [email, setEmail] = React.useState("");
    React.useEffect(() => {
        // Récupère l'élément DOM avec l'ID 'carousel'
        const carousel = document.getElementById('carousel');
        let index = 0; // Initialise l'index à 0
        const totalItems = carousel ? carousel.children.length : 0; // Nombre total d'éléments enfants dans le carousel

        // Fonction pour faire tourner le carousel
        const rotateCarousel = () => {
            if (carousel) {
                index++; // Incrémente l'index
                const offset = -index * 100; // Calcule le décalage pour la translation
                carousel.style.transform = `translateX(${offset}%)`; // Applique la transformation de translation en css
                carousel.style.transition = 'transform 0.5s ease-in-out'; // Définit la transition pour l'animation

                // Si l'index atteint le nombre total d'éléments, réinitialise le carousel
                if (index === totalItems) {
                    setTimeout(() => {
                        carousel.style.transition = 'none'; // Supprime la transition pour éviter l'animation de retour
                        carousel.style.transform = 'translateX(0%)'; // Réinitialise la position du carousel
                        index = 0; // Réinitialise l'index
                    }, 500); // Délai pour laisser l'animation se terminer
                }
            }
        };

        // Définit un intervalle pour faire tourner le carousel toutes les 2 secondes
        const interval = setInterval(rotateCarousel, 2000);

        // Nettoie l'intervalle lorsque le composant est démonté
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-[34rem] flex flex-col md:flex-row justify-center items-center px-4">
            <div className="text-4xl mx-auto font-normal text-center md:text-left w-full md:w-1/2">
                <div className="gradient-text py-2">Voltix</div>
                <div className="text-gray-200">
                    Votre exchange <span className="text-[#7C3AED] opacity-1">crypto</span>
                    <FlipWords words={words} />
                </div>
                <div className="text-gray-400 text-sm mt-2">
                    Nous vous proposons des services de trading crypto
                    <br />
                    avec des taux de change compétitifs et des frais de transaction réduits.
                </div>
                <div className="mt-4 flex flex-row justify-center items-center gap-4 max-w-sm mx-auto md:mx-0">
                    <Input placeholder="Adresse email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Button as={Link} href={`/sign-up?email=${email}`} color="primary" size="md">
                        Commencer
                    </Button>
                </div>
            </div>
            <div className="text-4xl mx-auto hidden md:flex flex-row gap-4 w-full md:w-1/2 overflow-hidden">
                <div id="carousel" className="flex flex-row w-full md:w-1/2 gap-8">
                    <div className="flex-shrink-0 w-full">
                        <ChartHero title="BTC/USD" data={btcData} />
                    </div>
                    <div className="flex-shrink-0 w-full">
                        <ChartHero title="ETH/USD" data={ethData} />
                    </div>
                    <div className="flex-shrink-0 w-full">
                        <ChartHero title="XRP/USD" data={xrpData} />
                    </div>
                    <div className="flex-shrink-0 w-full">
                        <ChartHero title="SUI/USD" data={suiData} />
                    </div>
                </div>
            </div>
        </div>
    );
}
