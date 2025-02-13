"use client"
import { Button } from "@heroui/react";
import { paths } from "@/paths";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function SuccessPage() {
  const pathname = usePathname();
  const idUser = pathname.split('/').slice(-3)[0];

  return (
    <main className="flex-1 flex flex-col items-center justify-center p-6 bg-gray-900 text-white h-screen">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg text-center space-y-6">
        {/* Success Icon */}
        <div className="flex justify-center text-green-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* Success Message */}
        <h1 className="text-3xl font-bold text-white">Paiement réussi !</h1>
        <p className="text-gray-400">
          Merci pour votre dépôt. Votre transaction a été traitée avec succès.
        </p>

        {/* Back to Dashboard Button */}
        
        <Button
          as={Link}
          href={paths.userAccount(idUser)}
          color="primary" variant="solid"
        >
          Retour au tableau de bord
        </Button>
      </div>
    </main>
  );
}