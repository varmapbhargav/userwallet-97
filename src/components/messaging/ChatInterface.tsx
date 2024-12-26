import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMessageContext } from "@/contexts/MessageContext";
import { ChatHeader } from "./ChatHeader";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { TopicSelector } from "./TopicSelector";
import { Loader2 } from "lucide-react";

export const ChatInterface = () => {
  const { messages, sendMessage, subscribeToTopic, unsubscribeFromTopic, isConnecting } = useMessageContext();
  const [activeTopics, setActiveTopics] = useState<string[]>([]);

  const handleSubscribe = async (topic: string) => {
    await subscribeToTopic(topic);
    setActiveTopics((prev) => [...new Set([...prev, topic])]);
  };

  const handleUnsubscribe = async (topic: string) => {
    await unsubscribeFromTopic(topic);
    setActiveTopics((prev) => prev.filter((t) => t !== topic));
  };

  const handleSendMessage = async (content: string) => {
    if (activeTopics.length === 0) return;
    await sendMessage(content, activeTopics[0]); // Send to first active topic
  };

  if (isConnecting) {
    return (
      <Card className="w-full h-[600px] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <ChatHeader activeUsers={activeTopics.length} />
      <CardContent className="space-y-4">
        <TopicSelector
          onSubscribe={handleSubscribe}
          onUnsubscribe={handleUnsubscribe}
          activeTopics={activeTopics}
        />
        <ScrollArea className="h-[400px] rounded-md border p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                content={message.content}
                from={message.from}
                timestamp={message.timestamp}
              />
            ))}
          </div>
        </ScrollArea>
        <ChatInput
          onSendMessage={handleSendMessage}
          isDisabled={activeTopics.length === 0}
        />
      </CardContent>
    </Card>
  );
};