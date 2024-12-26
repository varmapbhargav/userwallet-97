import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  SismoConnectButton,
  SismoConnectResponse,
  AuthType,
  ClaimType,
} from "@sismo-core/sismo-connect-react";
import { useSismo } from "@/contexts/SismoContext";
import { motion } from "framer-motion";

interface ZKPAuthProps {
  onSuccess: () => void;
}

export const ZKPAuth = ({ onSuccess }: ZKPAuthProps) => {
  const [isVerifying, setIsVerifying] = useState(false);
  const { verifyProof } = useSismo();

  const handleResponse = async (response: SismoConnectResponse) => {
    setIsVerifying(true);
    try {
      const isValid = await verifyProof(response);
      if (isValid) {
        toast.success("ZKP verification successful!");
        onSuccess();
      } else {
        toast.error("ZKP verification failed");
      }
    } catch (error) {
      toast.error("Error during ZKP verification");
      console.error(error);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="space-y-2 text-center">
        <motion.h3 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg font-medium"
        >
          Verify Your Identity
        </motion.h3>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-sm text-gray-500"
        >
          Use Sismo to verify your identity without revealing sensitive information
        </motion.p>
      </div>
      <div 
        style={{ 
          width: "100%",
          display: "flex",
          justifyContent: "center" 
        }}
      >
        <SismoConnectButton
          config={{
            appId: "0x1234....", // Replace with your Sismo App ID
            vault: {
              impersonate: ["0x1234...."], // Optional: For development
            },
          }}
          auths={[{ authType: AuthType.VAULT }]}
          claims={[{ claimType: ClaimType.GTE }]}
          onResponse={handleResponse}
          text={isVerifying ? "Verifying..." : "Verify with Sismo"}
          overrideStyle={{
            width: "100%",
            padding: "10px 20px",
            borderRadius: "8px",
            backgroundColor: "#3b82f6",
            color: "white",
            cursor: "pointer",
            transition: "all 0.2s",
            "&:hover": {
              backgroundColor: "#2563eb",
            },
          }}
        />
      </div>
    </motion.div>
  );
};