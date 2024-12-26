import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Cpu, Calendar, MessageSquare, Trash2 } from "lucide-react";

export const DashboardOverview = ({ 
  profiles, 
  subscriptions, 
  messages, 
  notifications,
  markNotificationAsRead 
}: { 
  profiles: any[];
  subscriptions: any[];
  messages: any[];
  notifications: any[];
  markNotificationAsRead: (id: number) => void;
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Active Profiles', count: profiles.length, icon: Cpu },
          { title: 'Active Subscriptions', count: subscriptions.filter((sub) => sub.status === 'Active').length, icon: Calendar },
          { title: 'Unread Messages', count: messages.length, icon: MessageSquare },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-white bg-opacity-40 backdrop-blur-lg border-0 shadow-lg">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-800">{stat.count}</p>
                </div>
                <stat.icon className="w-8 h-8 text-blue-500" />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="bg-white bg-opacity-40 backdrop-blur-lg border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Recent Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="p-4 rounded-lg bg-white bg-opacity-50 backdrop-blur-sm"
              >
                <div className="flex justify-between items-center">
                  <p className="text-gray-800">{notification.message}</p>
                  <p className="text-sm text-gray-600">{notification.time}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => markNotificationAsRead(notification.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};