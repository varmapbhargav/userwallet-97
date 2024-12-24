import { useState } from "react";
import { AuthCard } from "@/components/auth/AuthCard";
import { EmailForm } from "@/components/auth/EmailForm";
import { UsernameForm } from "@/components/auth/UsernameForm";
import { WalletCreation } from "@/components/auth/WalletCreation";
import { WalletSuccess } from "@/components/auth/WalletSuccess";

type AuthStep = "email" | "username" | "wallet-creation" | "wallet-success";

const Index = () => {
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
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            {currentStep === "email" && "Welcome"}
            {currentStep === "username" && "Choose Username"}
            {currentStep === "wallet-creation" && "Creating Wallet"}
            {currentStep === "wallet-success" && "Setup Complete"}
          </h1>
          <p className="text-gray-500">
            {currentStep === "email" && "Sign in to access your wallet"}
            {currentStep === "username" && "Pick a unique username for your account"}
            {currentStep === "wallet-creation" && "Setting up your secure wallet"}
            {currentStep === "wallet-success" && "Your wallet is ready to use"}
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
    </div>
  );
};

export default Index;