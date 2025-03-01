"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { lazy } from "react";
const HeroText = lazy(() => import("@/components/HeroText"));
const BackgroundPaths = lazy(() => import("@/components/ui/bg-path"));
const TiltedScroll = lazy(() => import("@/components/ui/tilted-scroll"));
const WorldMap = lazy(() => import("@/components/ui/world-map"));

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
    <main ref={ref} className="flex-1 flex flex-col gap-6 overflow-hidden">
      <BackgroundPaths title="Bienvenue sur Voltix" />
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-xl sm:text-2xl md:text-3xl font-bold text-center w-full px-4"
      >
        💡 Pourquoi choisir Voltix ?
      </motion.h2>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex flex-col lg:flex-row justify-center items-center gap-8 px-4 md:px-6"
      >
        <div className="space-y-8 w-full lg:w-1/2 h-full">
          <TiltedScroll
            items={features}
            className="mt-4 sm:mt-8"
          />
        </div>
        <motion.div 
          className="w-full lg:w-1/2"
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
        className="py-20 sm:py-28 md:py-40 bg-background w-full"
      >
        <div className="max-w-7xl mx-auto text-center px-4 md:px-6">
          <motion.p 
            className="font-bold text-lg sm:text-xl md:text-3xl lg:text-4xl text-foreground p-2 sm:p-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="block sm:inline">Tradez de n'importe où</span>{" "}
            <span className="block sm:inline">vos{" "}</span>
            <span className="text-foreground-muted">
              {"Crypto".split("").map((word, idx) => (
                <motion.span
                  key={idx}
                  className="inline-block whitespace-nowrap"
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
        <div className="w-full overflow-hidden">
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
      </motion.div>
      <BackgroundPaths title="Je souhaite commencer à trader" description="" />  
    </main>
  );
}
