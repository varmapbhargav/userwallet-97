import { createContext, useContext, ReactNode } from 'react';
import { 
  SismoConnectClient,
  SismoConnectConfig,
  AuthType,
  SismoConnectResponse,
  ClaimType
} from "@sismo-core/sismo-connect-client";

interface SismoContextType {
  verifyProof: (response: SismoConnectResponse) => Promise<boolean>;
  generateChallenge: () => string;
}

const config: SismoConnectConfig = {
  appId: "0x1234....", // Replace with your Sismo App ID
  vault: {
    impersonate: ["0x1234...."], // Optional: For development
  },
};

const sismoConnect = new SismoConnectClient(config);

const SismoContext = createContext<SismoContextType | undefined>(undefined);

export const SismoProvider = ({ children }: { children: ReactNode }) => {
  const generateChallenge = () => {
    return Math.random().toString(36).substring(7);
  };

  const verifyProof = async (response: SismoConnectResponse): Promise<boolean> => {
    try {
      const verification = await sismoConnect.verify({
        response,
        auths: [{ authType: AuthType.VAULT }],
        claims: [{ claimType: ClaimType.GTE }],
      });
      return verification.success;
    } catch (error) {
      console.error("ZKP verification failed:", error);
      return false;
    }
  };

  return (
    <SismoContext.Provider value={{ verifyProof, generateChallenge }}>
      {children}
    </SismoContext.Provider>
  );
};

export const useSismo = () => {
  const context = useContext(SismoContext);
  if (!context) {
    throw new Error("useSismo must be used within a SismoProvider");
  }
  return context;
};