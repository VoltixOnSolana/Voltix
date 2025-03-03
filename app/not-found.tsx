"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Bitcoin, Home } from "lucide-react"
import { Button } from "@heroui/react"
import { paths } from "@/paths"

const FallingBitcoin = ({ screenWidth, screenHeight }: { screenWidth: number, screenHeight: number }) => {
  const startX = Math.random() * screenWidth
  const size = Math.random() * 16 + 16
  const duration = Math.random() * 3 + 2

  return (
    <motion.div
      initial={{ x: startX, y: -50 }}
      animate={{
        y: screenHeight + 50,
        x: startX + (Math.random() - 0.5) * 50,
      }}
      transition={{
        y: {
          duration: duration,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          ease: "linear",
        },
        x: {
          duration: duration,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "mirror",
          ease: "easeInOut",
        },
      }}
      style={{
        position: "absolute",
        width: size,
        height: size,
      }}
    >
      <Bitcoin className="text-primary h-full w-full" />
    </motion.div>
  )
}

const PulsingBitcoin = () => {
  return (
    <motion.div
      animate={{
        scale: [1, 1.2, 1],
        opacity: [1, 0.8, 1],
      }}
      transition={{
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
      className="inline-block"
    >
      <Bitcoin className="text-primary h-16 w-16" />
    </motion.div>
  )
}

export default function NotFound() {
  const [mounted, setMounted] = useState(false)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const bitcoinCount = 50

  useEffect(() => {
    setMounted(true)

    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)

    return () => {
      window.removeEventListener("resize", updateDimensions)
    }
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="fixed inset-0 pointer-events-none">
        {dimensions.width > 0 &&
          dimensions.height > 0 &&
          Array.from({ length: bitcoinCount }).map((_, i) => (
            <FallingBitcoin key={i} screenWidth={dimensions.width} screenHeight={dimensions.height} />
          ))}
      </div>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center bg-transparent p-4 text-center">
        <motion.h1
          className="mb-2 text-4xl font-bold md:text-6xl flex items-center justify-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          4<PulsingBitcoin />4
        </motion.h1>

        <motion.h2
          className="mb-6 text-2xl font-semibold md:text-3xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Page Non Trouvée
        </motion.h2>

        <motion.p
          className="mb-8 max-w-md text-muted-foreground"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Les actifs crypto que vous recherchez se sont effondrés comme ces Bitcoins. Ils ont migré vers une autre
          blockchain ou n'ont jamais existé.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button as={Link} href={paths.home()} color="primary">
            <Home className="mr-2 h-4 w-4" />
            Retour à l'Accueil
          </Button>
        </motion.div>
      </div>
    </div>
  )
}

