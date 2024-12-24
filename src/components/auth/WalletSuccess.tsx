import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

interface WalletSuccessProps {
  walletAddress: string;
  onComplete: () => void;
}

export const WalletSuccess = ({ walletAddress, onComplete }: WalletSuccessProps) => {
  return (
    <div className="space-y-6 text-center">
      <div className="flex justify-center">
        <CheckCircle2 className="w-16 h-16 text-success animate-fadeIn" />
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Wallet Created Successfully!</h3>
        <p className="text-sm text-gray-500">
          Your wallet address:
        </p>
        <code className="block p-3 text-sm bg-gray-50 rounded-lg break-all">
          {walletAddress}
        </code>
      </div>
      <Button
        onClick={onComplete}
        className="w-full h-12 text-base font-medium"
      >
        Continue to Dashboard
      </Button>
    </div>
  );
};