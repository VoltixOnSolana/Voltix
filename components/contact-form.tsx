"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
  name: z.string().min(2, "Votre nom doit contenir au moins 2 caractères  "),
  email: z.string().email("S'il vous plaît, mettez une adresse email valide"),
  message: z.string().min(10, "Votre message doit contenir au moins 10 caractères"),
})

type FormData = z.infer<typeof formSchema>

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  async function onSubmit(data: FormData) {
    try {
      setIsSubmitting(true)
      const response = await fetch(`/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Échec de l'envoi du message")
      }

      toast({
        title: "Succès",
        description: "Votre message a été envoyé avec succès !",
      })
      reset()
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Échec de l'envoi du message. Veuillez réessayer plus tard.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader className="space-y-1"></CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Entrez votre nom" {...register("name")} />
            {errors.name && <p className="text-sm text-destructive">{errors.name.message || "Error"}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="Entrez votre E-mail" type="email" {...register("email")} />
            {errors.email && <p className="text-sm text-destructive">{errors.email.message || "Error"}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Entrez votre message"
              className="min-h-[150px]"
              {...register("message")}
            />
            {errors.message && <p className="text-sm text-destructive">{errors.message.message || "Error"}</p>}
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Envoyer un message
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}

