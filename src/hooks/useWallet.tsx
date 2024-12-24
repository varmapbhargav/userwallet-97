import { useState, useEffect } from 'react';
import { createWalletClient, http, custom, type WalletClient, type Account } from 'viem';
import { mainnet } from 'viem/chains';
import { toast } from 'sonner';

export const useWallet = () => {
  const [walletClient, setWalletClient] = useState<WalletClient | null>(null);
  const [account, setAccount] = useState<Account | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const connectWallet = async () => {
    if (!window.ethereum) {
      toast.error('Please install MetaMask to connect your wallet');
      return null;
    }

    try {
      setIsConnecting(true);
      const client = createWalletClient({
        chain: mainnet,
        transport: custom(window.ethereum)
      });

      const [address] = await client.requestAddresses();
      const connectedAccount = { address, type: 'json-rpc' as const };

      setWalletClient(client);
      setAccount(connectedAccount);
      
      toast.success('Wallet connected successfully!');
      return connectedAccount;
    } catch (error) {
      console.error('Error connecting wallet:', error);
      toast.error('Failed to connect wallet');
      return null;
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setWalletClient(null);
    setAccount(null);
    toast.success('Wallet disconnected');
  };

  useEffect(() => {
    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        disconnectWallet();
      } else if (account?.address !== accounts[0]) {
        setAccount({ address: accounts[0], type: 'json-rpc' as const });
      }
    };

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }, [account]);

  return {
    walletClient,
    account,
    isConnecting,
    connectWallet,
    disconnectWallet
  };
};