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

interface ZKPAuthProps {
  onSuccess: () => void;
}

export const ZKPAuth = ({ onSuccess }: ZKPAuthProps) => {
  const [isVerifying, setIsVerifying] = useState(false);
  const { verifyProof, generateChallenge } = useSismo();

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
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h3 className="text-lg font-medium">Verify Your Identity</h3>
        <p className="text-sm text-gray-500">
          Use Sismo to verify your identity without revealing sensitive information
        </p>
      </div>
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
        className="w-full"
      />
    </div>
  );
};