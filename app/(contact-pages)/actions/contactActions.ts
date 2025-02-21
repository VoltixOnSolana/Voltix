import { FormData } from '@/lib/utils'

export async function submitForm(data: FormData) {
  try {
    const response = await fetch('/resend', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || "Échec de l'envoi du message")
    }

    return await response.json()
  } catch (error) {
    console.error("Error in submitForm:", error)
    throw error
  }
}