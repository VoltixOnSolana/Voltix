"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Loader2, Send, RefreshCcw, MailCheck, MailWarning, 
  LucideMessageCircle, LucideMessageCircleX, UserCheck, UserRoundX
} from 'lucide-react'
import { Input, Textarea, Form, Button } from "@/utils/HeroUI"
import { useToast } from "@/hooks/use-toast"
import { formSchema, FormData } from '@/lib/utils'
import { submitForm } from '../app/(contact-pages)/actions/contactActions'
import {Spacer} from "@heroui/spacer";
            

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const watchedFields = watch()
  const isValidEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(watchedFields.email || "")
  const isValidName = (watchedFields.name || "").length >= 2
  const isValidMessage = (watchedFields.message || "").length >= 10

  const getIconColor = (isValid: boolean, hasError: boolean) => {
    if (hasError) return "text-red-500"
    if (isValid) return "text-green-500"
    return "text-white"
  }

  const resetForm = () => reset()

  async function onSubmit(data: FormData) {
    try {
      setIsSubmitting(true)
      await submitForm(data)
      toast({
        title: "Succès",
        description: "Votre message a été envoyé avec succès !",
      })
      reset()
    } catch (error) {
      console.error("Error submitting form:", error)
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Échec de l'envoi du message. Veuillez réessayer plus tard.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form
      className="w-[350px] text-white display:inline-block space-y-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        endContent={
          isValidName ? (
            <UserCheck className={`w-5 h-5 ${getIconColor(isValidName, !!errors.name)}`} />
          ) : (
            <UserRoundX className={`w-5 h-5 ${getIconColor(isValidName, !!errors.name)}`} />
          )
        }
        isRequired
        label="Nom"
        labelPlacement="outside"
        id="name"
        placeholder="Entrez votre nom"
        {...register("name")}
      />
      {errors.name && <p className="text-[12px] text-red-500">{errors.name.message}</p>}
      <Spacer y={4} />

      <Input
        endContent={
          isValidEmail ? (
            <MailCheck className={`w-5 h-5 ${getIconColor(isValidEmail, !!errors.email)}`} />
          ) : (
            <MailWarning className={`w-5 h-5 ${getIconColor(isValidEmail, !!errors.email)}`} />
          )
        }
        isRequired
        label="Email"
        labelPlacement="outside"
        id="email"
        placeholder="Entrez votre E-mail"
        type="email"
        {...register("email")}
      />
      {errors.email && <p className="text-[12px] text-red-500">{errors.email.message}</p>}
      <Spacer y={4} />
      <Textarea
        endContent={
          isValidMessage ? (
            <LucideMessageCircle className={`w-5 h-5 ${getIconColor(isValidMessage, !!errors.message)}`} />
          ) : (
            <LucideMessageCircleX className={`w-5 h-5 ${getIconColor(isValidMessage, !!errors.message)}`} />
          )
        }
        isRequired
        label="Message"
        labelPlacement="outside"
        id="message"
        placeholder="Entrez votre message"
        {...register("message")}
      />
      {errors.message && <p className="text-[12px] text-red-500">{errors.message.message}</p>}
      <Spacer y={4} />
      <div className="flex gap-4 w-full">
        <Button className="w-full" color="primary" disabled={isSubmitting} type="submit">
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Envoyer <Send className="w-5 h-5" />
        </Button>
        <Button
          type="button"
          onPress={resetForm}
          className="bg-primary text-primary-foreground hover:bg-red-500 hover:text-primary-foreground/90"
        >
          <RefreshCcw className="w-5 h-5" />
        </Button>
      </div>
    </Form>
  )
}
