import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useWalletContext } from "@/contexts/WalletContext";

interface WalletCreationProps {
  onSuccess: (walletAddress: string) => void;
}

export const WalletCreation = ({ onSuccess }: WalletCreationProps) => {
  const [isGenerating, setIsGenerating] = useState(true);
  const [progress, setProgress] = useState(0);
  const { connectWallet, isConnecting } = useWalletContext();

  useEffect(() => {
    const generateWallet = async () => {
      try {
        // Simulate initial progress
        for (let i = 0; i <= 50; i += 10) {
          setProgress(i);
          await new Promise((resolve) => setTimeout(resolve, 200));
        }

        // Connect real wallet
        const account = await connectWallet();
        
        if (account) {
          // Complete progress
          for (let i = 60; i <= 100; i += 20) {
            setProgress(i);
            await new Promise((resolve) => setTimeout(resolve, 200));
          }
          
          onSuccess(account.address);
        } else {
          throw new Error("Failed to connect wallet");
        }
      } catch (error) {
        toast.error("Failed to generate wallet. Please try again.");
        setIsGenerating(false);
      }
    };

    generateWallet();
  }, [onSuccess, connectWallet]);

  return (
    <div className="space-y-6 text-center">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Creating your wallet</h3>
        <p className="text-sm text-gray-500">
          Please wait while we securely connect your wallet
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