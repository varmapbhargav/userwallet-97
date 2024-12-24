import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { AuthCard } from "@/components/auth/AuthCard";
import { EmailForm } from "@/components/auth/EmailForm";
import { UsernameForm } from "@/components/auth/UsernameForm";
import { WalletCreation } from "@/components/auth/WalletCreation";
import { WalletSuccess } from "@/components/auth/WalletSuccess";

type AuthStep = "email" | "username" | "wallet-creation" | "wallet-success";

const Index = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<AuthStep>("email");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [walletAddress, setWalletAddress] = useState("");

  const handleEmailSuccess = (email: string) => {
    setEmail(email);
    setCurrentStep("username");
  };

  const handleUsernameSuccess = (username: string) => {
    setUsername(username);
    setCurrentStep("wallet-creation");
  };

  const handleWalletSuccess = (address: string) => {
    setWalletAddress(address);
    setCurrentStep("wallet-success");
  };

  const handleComplete = () => {
    // Here you would typically redirect to the dashboard
    console.log("Authentication complete", { email, username, walletAddress });
    setIsOpen(false);
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case "email":
        return "Welcome";
      case "username":
        return "Choose Username";
      case "wallet-creation":
        return "Creating Wallet";
      case "wallet-success":
        return "Setup Complete";
      default:
        return "";
    }
  };

  const getStepDescription = () => {
    switch (currentStep) {
      case "email":
        return "Sign in to access your wallet";
      case "username":
        return "Pick a unique username for your account";
      case "wallet-creation":
        return "Setting up your secure wallet";
      case "wallet-success":
        return "Your wallet is ready to use";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <Button 
        size="lg"
        className="text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
        onClick={() => setIsOpen(true)}
      >
        Connect Wallet
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <div className="w-full space-y-8">
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">
                {getStepTitle()}
              </h1>
              <p className="text-gray-500">
                {getStepDescription()}
              </p>
            </div>

            <AuthCard>
              {currentStep === "email" && <EmailForm onSuccess={handleEmailSuccess} />}
              {currentStep === "username" && <UsernameForm onSuccess={handleUsernameSuccess} />}
              {currentStep === "wallet-creation" && <WalletCreation onSuccess={handleWalletSuccess} />}
              {currentStep === "wallet-success" && (
                <WalletSuccess walletAddress={walletAddress} onComplete={handleComplete} />
              )}
            </AuthCard>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;