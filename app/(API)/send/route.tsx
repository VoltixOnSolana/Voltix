import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json()

    // console.log("Received data:", { name, email, message })
    // console.log("RESEND_API_KEY:", process.env.RESEND_API_KEY ? "Set" : "Not set")

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

    // console.log("Resend API response:", data)

    return NextResponse.json(data)
  } catch (error) {
    console.error("Erreur dans la route de l'API :", error)
    return NextResponse.json(
      { error: "Échec de l'envoi de l'E-mail", details: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    )
  }
}

