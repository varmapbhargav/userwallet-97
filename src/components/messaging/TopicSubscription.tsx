import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useMessageContext } from '@/contexts/MessageContext';
import { Plus } from 'lucide-react';

export const TopicSubscription = () => {
  const [topic, setTopic] = useState('');
  const { subscribeToTopic } = useMessageContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    await subscribeToTopic(topic);
    setTopic('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2">
      <Input
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter topic to subscribe..."
        className="flex-1"
      />
      <Button type="submit" size="icon">
        <Plus className="h-4 w-4" />
      </Button>
    </form>
  );
};