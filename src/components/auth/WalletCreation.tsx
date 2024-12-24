import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface WalletCreationProps {
  onSuccess: (walletAddress: string) => void;
}

export const WalletCreation = ({ onSuccess }: WalletCreationProps) => {
  const [isGenerating, setIsGenerating] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const generateWallet = async () => {
      try {
        // Simulate wallet generation progress
        for (let i = 0; i <= 100; i += 20) {
          setProgress(i);
          await new Promise((resolve) => setTimeout(resolve, 500));
        }

        // Simulate wallet address generation
        const mockWalletAddress = "0x" + Math.random().toString(16).substr(2, 40);
        onSuccess(mockWalletAddress);
        toast.success("Wallet created successfully!");
      } catch (error) {
        toast.error("Failed to generate wallet. Please try again.");
        setIsGenerating(false);
      }
    };

    generateWallet();
  }, [onSuccess]);

  return (
    <div className="space-y-6 text-center">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Creating your wallet</h3>
        <p className="text-sm text-gray-500">
          Please wait while we securely generate your wallet
        </p>
      </div>
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="relative w-16 h-16">
          <Loader2 className="w-16 h-16 animate-spin text-primary" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-medium">{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};