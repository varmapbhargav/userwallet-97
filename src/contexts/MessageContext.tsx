import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { createLightNode, waitForRemotePeer } from '@waku/sdk';
import { useWalletContext } from './WalletContext';
import { toast } from 'sonner';

interface Message {
  id: string;
  from: string;
  content: string;
  timestamp: number;
  topic: string;
}

interface MessageContextType {
  messages: Message[];
  sendMessage: (content: string, topic: string) => Promise<void>;
  subscribeToTopic: (topic: string) => Promise<void>;
  unsubscribeFromTopic: (topic: string) => Promise<void>;
  isConnecting: boolean;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const MessageProvider = ({ children }: { children: ReactNode }) => {
  const [wakuNode, setWakuNode] = useState<any | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnecting, setIsConnecting] = useState(false);
  const { account } = useWalletContext();

  useEffect(() => {
    const initWaku = async () => {
      try {
        setIsConnecting(true);
        const node = await createLightNode({ defaultBootstrap: true });
        await node.start();
        await waitForRemotePeer(node);
        setWakuNode(node);
        toast.success('Connected to Waku network');
      } catch (error) {
        console.error('Failed to initialize Waku:', error);
        toast.error('Failed to connect to messaging network');
      } finally {
        setIsConnecting(false);
      }
    };

    if (!wakuNode) {
      initWaku();
    }

    return () => {
      if (wakuNode) {
        wakuNode.stop();
      }
    };
  }, []);

  const sendMessage = async (content: string, topic: string) => {
    if (!wakuNode || !account) {
      toast.error('Not connected to messaging network');
      return;
    }

    try {
      const message: Message = {
        id: `${Date.now()}-${Math.random()}`,
        from: account.address,
        content,
        timestamp: Date.now(),
        topic,
      };

      await wakuNode.relay.send(topic, new TextEncoder().encode(JSON.stringify(message)));
      
      setMessages(prev => [...prev, message]);
      toast.success('Message sent');
    } catch (error) {
      console.error('Failed to send message:', error);
      toast.error('Failed to send message');
    }
  };

  const subscribeToTopic = async (topic: string) => {
    if (!wakuNode) {
      toast.error('Not connected to messaging network');
      return;
    }

    try {
      const callback = (wakuMessage: any) => {
        try {
          const decodedMessage = JSON.parse(new TextDecoder().decode(wakuMessage.payload));
          setMessages(prev => [...prev, decodedMessage]);
        } catch (error) {
          console.error('Failed to decode message:', error);
        }
      };

      await wakuNode.relay.subscribe([topic], callback);
      toast.success(`Subscribed to topic: ${topic}`);
    } catch (error) {
      console.error('Failed to subscribe to topic:', error);
      toast.error('Failed to subscribe to topic');
    }
  };

  const unsubscribeFromTopic = async (topic: string) => {
    if (!wakuNode) return;

    try {
      await wakuNode.relay.unsubscribe([topic]);
      toast.success(`Unsubscribed from topic: ${topic}`);
    } catch (error) {
      console.error('Failed to unsubscribe from topic:', error);
      toast.error('Failed to unsubscribe from topic');
    }
  };

  return (
    <MessageContext.Provider
      value={{
        messages,
        sendMessage,
        subscribeToTopic,
        unsubscribeFromTopic,
        isConnecting,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export const useMessageContext = () => {
  const context = useContext(MessageContext);
  if (context === undefined) {
    throw new Error('useMessageContext must be used within a MessageProvider');
  }
  return context;
};