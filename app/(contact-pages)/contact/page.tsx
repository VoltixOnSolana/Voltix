"use server"
import { ContactForm } from "../../../components/contact-form"

export default async function ContactPage() {
  return (
    <main className="min-h-screen py-12 bg-muted/50">
      <div className="container max-w-2xl">
        <div className="space-y-6 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Contactez-nous</h1>
          <p className="text-gray-500 md:text-lg">
          Vous avez une question ou souhaitez nous contacter ? Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.
          </p>
        </div>
        <div className="mt-8">
          <ContactForm />
        </div>
      </div>
    </main>
  )
}

