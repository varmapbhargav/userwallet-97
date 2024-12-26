import { createContext, useContext, ReactNode } from 'react';
import { SismoConnect, SismoConnectResponse } from '@sismo-core/sismo-connect-client';

interface SismoContextType {
  verifyProof: (response: SismoConnectResponse) => Promise<boolean>;
}

const SismoContext = createContext<SismoContextType | undefined>(undefined);

export const SismoProvider = ({ children }: { children: ReactNode }) => {
  const sismoConnect = new SismoConnect({
    config: {
      appId: "0x1234....", // Replace with your Sismo App ID
      vault: {
        impersonate: ["0x1234...."], // Optional: For development
      },
    }
  });

  const verifyProof = async (response: SismoConnectResponse): Promise<boolean> => {
    try {
      const verification = await sismoConnect.verifyResponse({
        response,
      });
      return verification.success;
    } catch (error) {
      console.error("Error verifying proof:", error);
      return false;
    }
  };

  return (
    <SismoContext.Provider value={{ verifyProof }}>
      {children}
    </SismoContext.Provider>
  );
};

export const useSismo = () => {
  const context = useContext(SismoContext);
  if (context === undefined) {
    throw new Error('useSismo must be used within a SismoProvider');
  }
  return context;
};