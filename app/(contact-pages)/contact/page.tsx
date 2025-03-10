"use server"

import ContactForm from '@/components/contact-form'
import { Spacer } from "@heroui/react";

export default async function ContactPage() {
  return (
    <div className="flex flex-col w-full h-screen space-y-4 items-center margin-bottom-128">
      <Spacer y={10} />
      <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl text-foreground">Contactez-nous</h1>
      <br />
      <p className="text-foreground/80 md:text-lg text-center">
        Vous avez une question ou souhaitez nous contacter ? <br />
        Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.
      </p>
      <br />
      <ContactForm />
    </div>
  )
}