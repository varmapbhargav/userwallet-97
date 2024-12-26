import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Wallet, ArrowUpDown, Clock } from "lucide-react";

export const WalletStats = () => {
  const stats = [
    {
      title: "Balance",
      value: "0.00 ETH",
      icon: Wallet,
      color: "text-blue-500",
    },
    {
      title: "Transactions",
      value: "0",
      icon: ArrowUpDown,
      color: "text-purple-500",
    },
    {
      title: "Last Activity",
      value: "Never",
      icon: Clock,
      color: "text-green-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="bg-white/30 backdrop-blur-lg border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};