import { createContext, useContext, ReactNode } from 'react';
import { useWallet } from '@/hooks/useWallet';
import type { WalletClient, Account } from 'viem';

interface WalletContextType {
  walletClient: WalletClient | null;
  account: Account | null;
  isConnecting: boolean;
  connectWallet: () => Promise<Account | null>;
  disconnectWallet: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const wallet = useWallet();

  return (
    <WalletContext.Provider value={wallet}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWalletContext = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWalletContext must be used within a WalletProvider');
  }
  return context;
};