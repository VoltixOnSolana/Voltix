"use client";

import { HeroText } from "@/components/HeroText";
import BackgroundPaths from "@/components/ui/bg-path";
import { TiltedScroll } from "@/components/ui/tilted-scroll";
import { WorldMap } from "@/components/ui/world-map";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const features = [
  { id: '1', icon: '💹', text: 'Trading ultra-rapide : Achetez et vendez en un instant grâce à notre moteur de matching avancé.' },
  { id: '2', icon: '🔒', text: 'Sécurité de pointe : Protection des fonds avec stockage à froid et authentification 2FA.' },
  { id: '3', icon: '📊', text: 'Analyse en temps réel : Graphiques interactifs et outils de suivi des tendances.' },
  { id: '4', icon: '🪙', text: 'Large choix de cryptos : Accédez à des centaines d\'actifs numériques.' },
  { id: '5', icon: '📱', text: 'Application mobile : Gérez vos investissements où que vous soyez.' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    }
  }
};
export default function Home() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);

  return (
    <main ref={ref} className="flex-1 flex flex-col gap-6">
      <BackgroundPaths title="Bienvenue sur Voltix" />
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-2xl font-bold text-center w-full"
      >
        💡 Pourquoi choisir Voltix ?
      </motion.h2>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex flex-col md:flex-row justify-center"
      >
        <div className="space-y-8 w-1/2 h-full">
          <TiltedScroll
            items={features}
            className="mt-8"
          />
        </div>
        <motion.div 
          className="w-1/2"
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <HeroText />
        </motion.div>
      </motion.div>

      <motion.div 
        style={{ opacity, scale }}
        className="py-40 bg-background w-full"
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.p 
            className="font-bold text-xl md:text-4xl text-foreground p-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Tradez de n'importe où vos{" "}
            <span className="text-foreground-muted">
              {"Crypto".split("").map((word, idx) => (
                <motion.span
                  key={idx}
                  className="inline-block"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: idx * 0.1,
                    type: "spring",
                    stiffness: 100 
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </motion.p>
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
      </motion.div>
      <BackgroundPaths title="Je souhaite commencer à trader" description="" />  
    </main>
  );
}
