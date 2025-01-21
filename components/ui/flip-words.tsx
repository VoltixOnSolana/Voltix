"use client";
import React, { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Composant pour animer et faire défiler une liste de mots
export const FlipWords = ({
    words,
    duration = 2000,
    className,
}: {
    words: string[];
    duration?: number;
    className?: string;
}) => {
    // État pour le mot actuellement affiché
    const [currentWord, setCurrentWord] = useState(words[0]);
    // État pour savoir si une animation est en cours
    const [isAnimating, setIsAnimating] = useState<boolean>(false);

    // Fonction pour démarrer l'animation et passer au mot suivant
    const startAnimation = useCallback(() => {
        const word = words[words.indexOf(currentWord) + 1] || words[0];
        setCurrentWord(word);
        setIsAnimating(true);
    }, [currentWord, words]);

    // Utilisation de useEffect pour démarrer l'animation après un délai
    useEffect(() => {
        if (!isAnimating)
            setTimeout(() => {
                startAnimation();
            }, duration);
    }, [isAnimating, duration, startAnimation]);

    return (
        <AnimatePresence
            onExitComplete={() => {
                setIsAnimating(false);
            }}
        >
            <motion.div
                // Animation d'entrée
                initial={{
                    opacity: 0,
                    y: 10,
                }}
                // Animation d'affichage
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                // Transition de l'animation
                transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 10,
                }}
                // Animation de sortie
                exit={{
                    opacity: 0,
                    y: -40,
                    x: 40,
                    filter: "blur(8px)",
                    scale: 2,
                    position: "absolute",
                }}
                className={cn(
                    "z-10 inline-block relative text-left text-gray-200 px-2",
                    className
                )}
                key={currentWord}
            >
                {currentWord.split(" ").map((word, wordIndex) => (
                    <motion.span
                        key={word + wordIndex}
                        initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{
                            delay: wordIndex * 0.3,
                            duration: 0.3,
                        }}
                        className="inline-block whitespace-nowrap"
                    >
                        {word.split("").map((letter, letterIndex) => (
                            <motion.span
                                key={word + letterIndex}
                                initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                transition={{
                                    delay: wordIndex * 0.3 + letterIndex * 0.05,
                                    duration: 0.2,
                                }}
                                className="inline-block"
                            >
                                {letter}
                            </motion.span>
                        ))}
                        <span className="inline-block">&nbsp;</span>
                    </motion.span>
                ))}
            </motion.div>
        </AnimatePresence>
    );
};
