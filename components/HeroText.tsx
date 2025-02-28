"use client"

import { LayoutGroup, motion } from "motion/react"

import { TextRotate } from "@/components/ui/text-rotate"

function HeroText() {
  return (
    <div className="w-full h-full flex flex-col items-start font-overusedGrotesk pt-8 font-light overflow-hidden bg-background text-base sm:text-xl md:text-2xl leading-tight dark:text-foreground-muted text-foreground">
      <LayoutGroup>
        <TextRotate
          texts={[
            "Voltix révolutionne l'échange crypto avec une plateforme rapide, sécurisée et intuitive. Découvrez un trading fluide, accessible aux débutants comme aux experts.",
            "L'innovation rencontre la finance décentralisée avec Voltix, une plateforme pensée pour la performance et la simplicité. Achetez, vendez et gérez vos actifs en toute sérénité.",
          ]}
          staggerFrom={"first"}
          staggerDuration={0.01}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ type: "spring", damping: 30, stiffness: 400 }}
          rotationInterval={4000}
          splitBy="words"
        />
        <motion.div
          className="bg-primary w-2 h-2 sm:w-3 sm:h-3 rounded-full my-6"
          layout
        />
        <TextRotate
          texts={["Giovanni Salcuni", "Voltix"]}
          staggerFrom={"first"}
          staggerDuration={0.025}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ type: "spring", damping: 30, stiffness: 400 }}
          rotationInterval={4000}
          splitBy="characters"
        />
      </LayoutGroup>
    </div>
  )
}

export { HeroText }
