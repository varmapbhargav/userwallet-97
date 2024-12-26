import { useMessageContext } from '@/contexts/MessageContext';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatDistanceToNow } from 'date-fns';

export const MessageList = () => {
  const { messages } = useMessageContext();

  return (
    <ScrollArea className="h-[400px] w-full rounded-md border p-4">
      <div className="space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className="flex flex-col space-y-1 rounded-lg bg-white/5 p-4 backdrop-blur-sm"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-200">
                {message.from.slice(0, 6)}...{message.from.slice(-4)}
              </span>
              <span className="text-xs text-gray-400">
                {formatDistanceToNow(message.timestamp, { addSuffix: true })}
              </span>
            </div>
            <p className="text-sm text-gray-300">{message.content}</p>
            <span className="text-xs text-gray-500">Topic: {message.topic}</span>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};