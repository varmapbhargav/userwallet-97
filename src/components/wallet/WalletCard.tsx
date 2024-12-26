import { motion } from "framer-motion";
import { Copy, ExternalLink, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { useWalletContext } from "@/contexts/WalletContext";

export const WalletCard = () => {
  const { account } = useWalletContext();
  const [copied, setCopied] = useState(false);

  const copyAddress = () => {
    if (account?.address) {
      navigator.clipboard.writeText(account.address);
      setCopied(true);
      toast.success("Address copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const openEtherscan = () => {
    if (account?.address) {
      window.open(`https://etherscan.io/address/${account.address}`, '_blank');
    }
  };

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-white/30 backdrop-blur-lg border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Your Wallet</CardTitle>
          <CardDescription>
            Manage your wallet and view your account details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-500">
              Wallet Address
            </label>
            <div className="flex items-center space-x-2">
              <code className="flex-1 p-3 bg-gray-100/50 rounded-lg font-mono text-sm">
                {account?.address ? shortenAddress(account.address) : 'Not connected'}
              </code>
              <Button
                variant="ghost"
                size="icon"
                onClick={copyAddress}
                className="hover:bg-gray-100/50"
              >
                {copied ? (
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={openEtherscan}
                className="hover:bg-gray-100/50"
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-500">
              Network
            </label>
            <div className="p-3 bg-gray-100/50 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-sm">Ethereum Mainnet</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};