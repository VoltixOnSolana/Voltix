import ContactForm from '@/components/contact-form'

export default function ContactPage() {
  return (
    <div className="flex flex-col w-full h-screen space-y-4 items-center margin-bottom-128">
      <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Contactez-nous</h1>
      <br />
      <p className="text-gray-500 md:text-lg text-center">
        Vous avez une question ou souhaitez nous contacter ? <br />
        Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.
      </p>
      <br />
      <ContactForm />
    
    </div>
  )
}