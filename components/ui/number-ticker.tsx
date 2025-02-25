"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

export default function NumberTicker({
  value,
  direction = "up",
  delay = 0,
  className,
  decimalPlaces = 0,
  isPrimary = false,
  isAccueil = false,
  isBilling = false,
}: {
  value: number;
  direction?: "up" | "down";
  className?: string;
  delay?: number;
  decimalPlaces?: number;
  isPrimary?: boolean;
  isAccueil?: boolean;
  isBilling?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [previousValue, setPreviousValue] = useState(value);
  const [trend, setTrend] = useState<"up" | "down" | null>(null);

  const motionValue = useMotionValue(direction === "down" ? value : 0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });

  useEffect(() => {
    if (value !== previousValue) {
      setTrend(value > previousValue ? "up" : "down");
      setPreviousValue(value);

      // Réinitialiser la tendance après l'animation
      const timer = setTimeout(() => {
        setTrend(null);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [value, previousValue]);

  const isInView = useInView(ref, { once: true, margin: "0px" });

  useEffect(() => {
    isInView && setTimeout(() => {
      motionValue.set(direction === "down" ? 0 : value);
    }, delay * 1000);
  }, [motionValue, isInView, delay, value, direction]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        const formattedNumber = Number.isInteger(latest)
          ? Intl.NumberFormat("fr-FR").format(latest)
          : Intl.NumberFormat("fr-FR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(latest);

        ref.current.textContent = formattedNumber + (isAccueil || isBilling ? "" : " $");
      }
    });
  }, [springValue]);

  return (
    <span
      className={cn(
        "inline-block tabular-nums tracking-wider transition-colors duration-500",
        trend === "up" && !isPrimary && "text-green-500",
        trend === "down" && !isPrimary && "text-red-500",
        !trend && !isPrimary && "text-white",
        isPrimary && "text-primary",
        className,
      )}
      ref={ref}
    />
  );
}
