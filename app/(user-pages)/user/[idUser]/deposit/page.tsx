"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function DepositPage() {
  const [amount, setAmount] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDeposit = async () => {
    setIsLoading(true);
    // Simulate Stripe payment processing
    setTimeout(() => {
      setIsLoading(false);
      alert(`Deposit of $${amount} successful!`);
      setAmount("");
    }, 2000);
  };

  return (
    <main className="flex-1 flex flex-col items-center justify-center p-6 bg-gray-900 text-white">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Deposit Funds</h1>
        <p className="text-sm text-gray-400 mb-8 text-center">
          Add funds to your Voltix account securely using Stripe.
        </p>

        <div className="space-y-6">
          <Input
            id="amount"
            type="number"
            label="Amount (USD)"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <Button
            onClick={handleDeposit}
            disabled={isLoading || !amount}
            isLoading={isLoading}
          >
            Deposit with Stripe
          </Button>
        </div>
      </div>
    </main>
  );
}