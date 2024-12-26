import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ChatHeaderProps {
  activeUsers?: number;
}

export const ChatHeader = ({ activeUsers = 0 }: ChatHeaderProps) => {
  return (
    <Card className="border-0 bg-transparent">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">Decentralized Chat</CardTitle>
        <Badge variant="secondary" className="bg-green-100 text-green-800">
          {activeUsers} Active Users
        </Badge>
      </CardHeader>
    </Card>
  );
};