import { Button } from "@/components/ui/button";

export default function SuccessPage() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-6 bg-gray-900 text-white">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg text-center space-y-6">
        {/* Success Icon */}
        <div className="mx-auto text-green-500">
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
          // as=""
          // href=""
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          Retour au tableau de bord
        </Button>
      </div>
    </main>
  );
}