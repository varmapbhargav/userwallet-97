import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { motion } from "framer-motion";

interface ReceiveConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReceive: (config: { apn: string; authKey: string; encKey: string }) => void;
}

export const ReceiveConfigModal = ({ isOpen, onClose, onReceive }: ReceiveConfigModalProps) => {
  const [apn, setApn] = useState("");
  const [authKey, setAuthKey] = useState("");
  const [encKey, setEncKey] = useState("");

  const handleReceive = () => {
    onReceive({ apn, authKey, encKey });
    setApn("");
    setAuthKey("");
    setEncKey("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white/90 backdrop-blur-lg border border-gray-200 shadow-xl">
        <DialogHeader>
          <DialogTitle>Receive Network Configuration</DialogTitle>
        </DialogHeader>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <Input
            value={apn}
            onChange={(e) => setApn(e.target.value)}
            placeholder="Access Point Name (APN)"
            className="bg-white/50"
          />
          <Input
            value={authKey}
            onChange={(e) => setAuthKey(e.target.value)}
            placeholder="Authentication Key"
            className="bg-white/50"
          />
          <Input
            value={encKey}
            onChange={(e) => setEncKey(e.target.value)}
            placeholder="Encryption Key"
            className="bg-white/50"
          />
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={handleReceive}>Receive</Button>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};