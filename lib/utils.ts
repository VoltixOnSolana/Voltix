import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { z } from "zod"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formSchema = z.object({
  name: z.string().min(2, "Votre nom doit contenir au moins 2 caractères"),
  email: z.string().email("S'il vous plaît, mettez une adresse email valide"),
  message: z.string().min(10, "Votre message doit contenir au moins 10 caractères"),
})

export type FormData = z.infer<typeof formSchema>

export const url = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://voltix-phi.vercel.app"