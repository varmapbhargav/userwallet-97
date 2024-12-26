import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface TopicSelectorProps {
  onSubscribe: (topic: string) => void;
  activeTopics: string[];
  onUnsubscribe: (topic: string) => void;
}

export const TopicSelector = ({
  onSubscribe,
  activeTopics,
  onUnsubscribe,
}: TopicSelectorProps) => {
  const [topic, setTopic] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;
    onSubscribe(topic);
    setTopic("");
  };

  return (
    <div className="space-y-4">
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
      <div className="flex flex-wrap gap-2">
        {activeTopics.map((topic) => (
          <Badge
            key={topic}
            variant="secondary"
            className="cursor-pointer"
            onClick={() => onUnsubscribe(topic)}
          >
            {topic} ×
          </Badge>
        ))}
      </div>
    </div>
  );
};