"use client";

import CtaSection from "@/components/cta-section";
import { HeroText } from "@/components/HeroText";
import BackgroundPaths from "@/components/ui/bg-path";
import { TiltedScroll } from "@/components/ui/tilted-scroll";
import { WorldMap } from "@/components/ui/world-map";
import { motion } from "framer-motion";

const features = [
  { id: '1', icon: '💹', text: 'Trading ultra-rapide : Achetez et vendez en un instant grâce à notre moteur de matching avancé.' },
  { id: '2', icon: '🔒', text: 'Sécurité de pointe : Protection des fonds avec stockage à froid et authentification 2FA.' },
  { id: '3', icon: '📊', text: 'Analyse en temps réel : Graphiques interactifs et outils de suivi des tendances.' },
  { id: '4', icon: '🪙', text: 'Large choix de cryptos : Accédez à des centaines d’actifs numériques.' },
  { id: '5', icon: '📱', text: 'Application mobile : Gérez vos investissements où que vous soyez.' },
];


export default function Home() {
  return (
    <main className="flex-1 flex flex-col gap-6">
      <BackgroundPaths title="Bienvenue sur Voltix" />
      <h2 className="text-2xl font-bold text-center w-full">💡 Pourquoi choisir Voltix ?</h2>
      <div className="flex flex-col md:flex-row justify-center">
        <div className="space-y-8 w-1/2 h-full">
          <TiltedScroll
            items={features}
            className="mt-8"
          />
        </div>
        <div className="w-1/2">
          <HeroText />
        </div>
      </div>
      <div className="py-40 bg-background w-full">
        <div className="max-w-7xl mx-auto text-center">
          <p className="font-bold text-xl md:text-4xl text-foreground p-4">
            Tradez de n'importe où vos{" "}
            <span className="text-foreground-muted">
              {"Crypto".split("").map((word, idx) => (
                <motion.span
                  key={idx}
                  className="inline-block"
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: idx * 0.04 }}
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </p>
        </div>
        <WorldMap
          dots={[
            {
              start: {
                lat: 64.2008,
                lng: -149.4937,
              }, // Alaska (Fairbanks)
              end: {
                lat: 34.0522,
                lng: -118.2437,
              }, // Los Angeles
            },
            {
              start: { lat: 64.2008, lng: -149.4937 }, // Alaska (Fairbanks)
              end: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
            },
            {
              start: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
              end: { lat: 38.7223, lng: -9.1393 }, // Lisbon
            },
            {
              start: { lat: 51.5074, lng: -0.1278 }, // London
              end: { lat: 28.6139, lng: 77.209 }, // New Delhi
            },
            {
              start: { lat: 28.6139, lng: 77.209 }, // New Delhi
              end: { lat: 43.1332, lng: 131.9113 }, // Vladivostok
            },
            {
              start: { lat: 28.6139, lng: 77.209 }, // New Delhi
              end: { lat: -1.2921, lng: 36.8219 }, // Nairobi
            },
          ]}
        />
      </div>
    </main>
  );
}
