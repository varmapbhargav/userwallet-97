import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { TopicSubscription } from './TopicSubscription';

export const MessagingInterface = () => {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Decentralized Messaging</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <TopicSubscription />
        <MessageList />
        <MessageInput topic="default" />
      </CardContent>
    </Card>
  );
};