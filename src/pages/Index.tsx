import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { AuthCard } from "@/components/auth/AuthCard";
import { EmailForm } from "@/components/auth/EmailForm";
import { UsernameForm } from "@/components/auth/UsernameForm";
import { WalletCreation } from "@/components/auth/WalletCreation";
import { WalletSuccess } from "@/components/auth/WalletSuccess";
import { Shield, Smartphone, Microchip, Globe, Key } from "lucide-react";
import { motion } from "framer-motion";

type AuthStep = "email" | "username" | "wallet-creation" | "wallet-success";

const Index = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<AuthStep>("email");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [walletAddress, setWalletAddress] = useState("");

  const features = [
    {
      icon: Shield,
      title: "ERC-4337 Integration",
      description: "Smart contract-based profile provisioning with non-custodial wallets for decentralized identity management."
    },
    {
      icon: Key,
      title: "Zero-Knowledge Proofs",
      description: "Privacy-preserving authentication without exposing sensitive subscription data."
    },
    {
      icon: Globe,
      title: "Whisper Protocol",
      description: "Encrypted, decentralized peer-to-peer communication for secure profile management."
    },
    {
      icon: Smartphone,
      title: "Enhanced eSIM Architecture",
      description: "Modern approach to profile management with secure authentication and hardware protection."
    },
    {
      icon: Microchip,
      title: "Secure eUICC",
      description: "Tamper-resistant hardware ensuring the highest level of profile data protection."
    }
  ];

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
        >
          Next-Gen eSIM Solution
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
        >
          Experience the future of mobile connectivity with our decentralized eSIM platform powered by ERC-4337, ZKP, and Whisper Protocol.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Button 
            size="lg"
            className="text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => setIsOpen(true)}
          >
            Connect Wallet
          </Button>
        </motion.div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.5 }}
              className="p-6 bg-white bg-opacity-50 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <feature.icon className="w-12 h-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Authentication Dialog */}
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