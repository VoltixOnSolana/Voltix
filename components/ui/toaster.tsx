"use client"

import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { CircleCheck, AlertTriangle, AlertCircle, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useEffect, useRef, useState } from "react"

type ToastVariant = "default" | "success" | "warning" | "destructive" | "loading"

export function Toaster() {
  const { toasts } = useToast()
  const [progress, setProgress] = useState<Record<string, number>>({})
  const progressTimers = useRef<Record<string, NodeJS.Timeout>>({})

  useEffect(() => {
    // Nettoyer les timers des toasts qui n'existent plus
    Object.keys(progressTimers.current).forEach((id) => {
      if (!toasts.find((toast) => toast.id === id)) {
        clearInterval(progressTimers.current[id])
        delete progressTimers.current[id]
        setProgress((prev) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { [id]: _, ...rest } = prev
          return rest
        })
      }
    })

    // Créer des timers pour les nouveaux toasts
    toasts.forEach((toast) => {
      if (!progressTimers.current[toast.id]) {
        setProgress((prev) => ({ ...prev, [toast.id]: 100 }))

        const startTime = Date.now()
        const duration = 5000 // Durée par défaut de 5 secondes

        progressTimers.current[toast.id] = setInterval(() => {
          const elapsed = Date.now() - startTime
          const remaining = Math.max(0, 100 - (elapsed / duration) * 100)

          setProgress((prev) => ({ ...prev, [toast.id]: remaining }))

          if (remaining === 0) {
            clearInterval(progressTimers.current[toast.id])
            delete progressTimers.current[toast.id]
          }
        }, 10)
      }
    })

    return () => {
      Object.values(progressTimers.current).forEach(clearInterval)
    }
  }, [toasts])

  const getIcon = (variant?: ToastVariant) => {
    if (!variant) return null

    const iconClasses = {
      success: "text-emerald-700 dark:text-emerald-400",
      warning: "text-yellow-700 dark:text-yellow-400",
      destructive: "text-red-700 dark:text-red-400",
      loading: "text-blue-700 dark:text-blue-400 animate-spin",
      default: "text-foreground"
    }[variant]

    const icons = {
      success: CircleCheck,
      warning: AlertTriangle,
      destructive: AlertCircle,
      loading: Loader2,
      default: null
    }

    const Icon = icons[variant]
    if (!Icon) return null

    return (
      <div className={cn("rounded-full p-1", {
        "bg-emerald-200 dark:bg-emerald-900/50": variant === "success",
        "bg-yellow-200 dark:bg-yellow-900/50": variant === "warning",
        "bg-red-200 dark:bg-red-900/50": variant === "destructive",
        "bg-blue-200 dark:bg-blue-900/50": variant === "loading",
        "bg-gray-200 dark:bg-gray-800": variant === "default"
      })}>
        <Icon className={cn("h-4 w-4", iconClasses)} strokeWidth={2} aria-hidden="true" />
      </div>
    )
  }

  const getTextColor = (variant?: ToastVariant) => {
    return {
      success: "text-emerald-900 dark:text-emerald-200",
      warning: "text-yellow-900 dark:text-yellow-200",
      destructive: "text-red-900 dark:text-red-200",
      loading: "text-blue-900 dark:text-blue-200",
      default: "text-foreground"
    }[variant || "default"]
  }

  const getProgressBarColor = (variant?: ToastVariant) => {
    if (!variant) return "bg-foreground"

    return {
      success: "bg-emerald-700 dark:bg-emerald-400",
      warning: "bg-yellow-700 dark:bg-yellow-400",
      destructive: "bg-red-700 dark:bg-red-400",
      loading: "bg-blue-700 dark:bg-blue-400",
      default: "bg-foreground"
    }[variant]
  }

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, variant, ...props }) {
        const icon = getIcon(variant as ToastVariant)
        const textColor = getTextColor(variant as ToastVariant)
        const progressBarColor = getProgressBarColor(variant as ToastVariant)

        return (
          <Toast key={id} variant={variant as ToastVariant} {...props}>
            <div className="flex w-full justify-between gap-3">
              {icon && <div className="mt-1">{icon}</div>}
              <div className={cn("grid gap-1", { "flex-1": !!icon })}>
                {title && <ToastTitle className={textColor}>{title}</ToastTitle>}
                {description && (
                  <ToastDescription className={cn(textColor)}>{description}</ToastDescription>
                )}
                {action}
              </div>
              <ToastClose />
            </div>
            {/* Progress bar */}
            <div className="contents" aria-hidden="true">
              <div
                className={cn(
                  "pointer-events-none absolute bottom-0 left-0 h-1 w-full transition-all duration-100",
                  progressBarColor
                )}
                style={{
                  width: `${progress[id] ?? 0}%`,
                  transition: "width 10ms linear",
                }}
              />
            </div>
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
