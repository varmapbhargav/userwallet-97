import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { motion } from "framer-motion";

interface MintNFTModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMint: (data: { iccid: string; qrUri: string; configUri: string }) => void;
}

export const MintNFTModal = ({ isOpen, onClose, onMint }: MintNFTModalProps) => {
  const [iccid, setIccid] = useState("");
  const [qrUri, setQrUri] = useState("");
  const [configUri, setConfigUri] = useState("");

  const handleMint = () => {
    onMint({ iccid, qrUri, configUri });
    setIccid("");
    setQrUri("");
    setConfigUri("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white/90 backdrop-blur-lg border border-gray-200 shadow-xl">
        <DialogHeader>
          <DialogTitle>Mint eSIM NFT</DialogTitle>
        </DialogHeader>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <Input
            value={iccid}
            onChange={(e) => setIccid(e.target.value)}
            placeholder="ICCID"
            className="bg-white/50"
          />
          <Input
            value={qrUri}
            onChange={(e) => setQrUri(e.target.value)}
            placeholder="QR Code URI"
            className="bg-white/50"
          />
          <Input
            value={configUri}
            onChange={(e) => setConfigUri(e.target.value)}
            placeholder="Network Config URI"
            className="bg-white/50"
          />
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={handleMint}>Mint NFT</Button>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};