import { Button } from "@heroui/react";

export default function CancelPage() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-6 bg-gray-900 text-white">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg text-center space-y-6">
        {/* Cancel Icon */}
        <div className="flex justify-center text-red-500">
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>

        {/* Cancel Message */}
        <h1 className="text-3xl font-bold text-white">Paiement annulé</h1>
        <p className="text-gray-400">
          Votre paiement n'a pas été effectué. Aucun montant n'a été débité.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4">
          <Button
            // as=""
            // href=""
            color="primary" variant="solid"
          >
            Réessayer
          </Button>
        </div>
      </div>
    </main>
  );
}