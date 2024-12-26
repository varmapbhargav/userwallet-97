import { useState, useEffect } from 'react';
import { createWalletClient, custom, type WalletClient, type Account } from 'viem';
import { mainnet } from 'viem/chains';
import { toast } from 'sonner';

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const useWallet = () => {
  const [walletClient, setWalletClient] = useState<WalletClient | null>(null);
  const [account, setAccount] = useState<Account | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    if (window.ethereum) {
      const client = createWalletClient({
        chain: mainnet,
        transport: custom(window.ethereum)
      });
      setWalletClient(client);
    }
  }, []);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', () => window.location.reload());
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }, []);

  const handleAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) {
      setAccount(null);
      toast.error('Please connect to MetaMask');
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      toast.error('Please install MetaMask');
      return null;
    }

    try {
      setIsConnecting(true);
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      if (accounts[0]) {
        const newAccount: Account = {
          address: accounts[0] as `0x${string}`,
          type: 'json-rpc'
        };
        setAccount(newAccount);
        toast.success('Wallet connected successfully');
        return newAccount;
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      toast.error('Failed to connect wallet');
    } finally {
      setIsConnecting(false);
    }
    return null;
  };

  const disconnectWallet = () => {
    setAccount(null);
    toast.success('Wallet disconnected');
  };

  return {
    walletClient,
    account,
    isConnecting,
    connectWallet,
    disconnectWallet
  };
};