import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { useWalletContext } from "@/contexts/WalletContext";

interface ChatMessageProps {
  content: string;
  from: string;
  timestamp: number;
}

export const ChatMessage = ({ content, from, timestamp }: ChatMessageProps) => {
  const { account } = useWalletContext();
  const isOwn = account?.address.toLowerCase() === from.toLowerCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[70%] rounded-lg p-3 ${
          isOwn
            ? 'bg-blue-500 text-white'
            : 'bg-gray-100 text-gray-900'
        }`}
      >
        <p className="text-sm">{content}</p>
        <div className={`text-xs mt-1 ${isOwn ? 'text-blue-100' : 'text-gray-500'}`}>
          {formatDistanceToNow(timestamp, { addSuffix: true })}
        </div>
      </div>
    </motion.div>
  );
};