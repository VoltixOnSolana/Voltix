import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json()

    if (!process.env.RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not set")
    }

    const data = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: ["onboarding@resend.dev"],
      subject: `New message from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
    })

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Erreur dans la route de l'API :", error)
    return NextResponse.json(
      { success: false, error: "Échec de l'envoi de l'E-mail", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
}