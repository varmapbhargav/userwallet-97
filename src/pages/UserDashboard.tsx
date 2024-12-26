import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bell } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DashboardOverview } from '@/components/dashboard/DashboardOverview';
import { ProfileManagement } from '@/components/dashboard/ProfileManagement';
import { SubscriptionManagement } from '@/components/dashboard/SubscriptionManagement';
import { ChatInterface } from "@/components/messaging/ChatInterface";
import { WalletTab } from '@/components/wallet/WalletTab';
import { SendMessageModal } from "@/components/modals/SendMessageModal";
import { ReceiveConfigModal } from "@/components/modals/ReceiveConfigModal";
import { MintNFTModal } from "@/components/modals/MintNFTModal";
import { useWalletContext } from '@/contexts/WalletContext';
import { createWalletClient, mainnet, http } from 'viem';

const UserDashboard = () => {
  // State management
  const [profiles, setProfiles] = useState<any[]>([]);
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [showSendMessageModal, setShowSendMessageModal] = useState(false);
  const [showReceiveConfigModal, setShowReceiveConfigModal] = useState(false);
  const [showMintNFTModal, setShowMintNFTModal] = useState(false);

  const { walletClient } = useWalletContext();

  // Mock data initialization
  useEffect(() => {
    const mockProfiles = [
      { id: 1, iccid: '8991000012345678901', operator: 'Verizon', status: 'Active' },
      { id: 2, iccid: '8991000012345678902', operator: 'AT&T', status: 'Suspended' },
    ];

    const mockSubscriptions = [
      { id: 1, plan: 'Premium 5G', status: 'Active', renewalDate: '2024-12-30' },
      { id: 2, plan: 'Global Roaming', status: 'Expired', renewalDate: '2024-12-15' },
    ];

    const mockNotifications = [
      { id: 1, message: 'Profile activation successful', time: '2 hours ago' },
      { id: 2, message: 'Payment processed', time: '1 day ago' },
    ];

    const mockMessages = [
      { id: 1, sender: 'Admin', text: 'Your subscription plan has been approved.', time: '10:30 AM' },
      { id: 2, sender: 'User', text: 'Can I get a refund for my subscription?', time: '9:45 AM' },
    ];

    setProfiles(mockProfiles);
    setSubscriptions(mockSubscriptions);
    setNotifications(mockNotifications);
    setMessages(mockMessages);
  }, []);

  // Mock handlers
  const sendMessage = (receiverAddress: string, message: string) => {
    const newMessage = {
      id: messages.length + 1,
      sender: 'You',
      text: message,
      time: new Date().toLocaleTimeString(),
    };
    setMessages([...messages, newMessage]);
    setShowSendMessageModal(false);
  };

  const receiveNetworkConfig = (config: { apn: string; authKey: string; encKey: string; }) => {
    // Handle network config
    setShowReceiveConfigModal(false);
  };

  const mintNFT = (data: { iccid: string; qrUri: string; configUri: string; }) => {
    // Handle NFT minting
    setShowMintNFTModal(false);
  };

  const markNotificationAsRead = (id: number) => {
    const updatedNotifications = notifications.filter((notification) => notification.id !== id);
    setNotifications(updatedNotifications);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center"
        >
          <h1 className="text-3xl font-bold text-gray-800">User Smart Wallet</h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="p-2 rounded-full bg-white bg-opacity-20 backdrop-blur-lg"
          >
            <Bell className="w-6 h-6 text-gray-600" />
          </motion.button>
        </motion.div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-white bg-opacity-20 backdrop-blur-lg">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="wallet">Wallet</TabsTrigger>
            <TabsTrigger value="profiles">Profile Management</TabsTrigger>
            <TabsTrigger value="subscriptions">Subscription Management</TabsTrigger>
            <TabsTrigger value="messages">Messaging</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <DashboardOverview 
              profiles={profiles}
              subscriptions={subscriptions}
              messages={messages}
              notifications={notifications}
              markNotificationAsRead={markNotificationAsRead}
            />
          </TabsContent>

          <TabsContent value="wallet">
            <WalletTab />
          </TabsContent>

          <TabsContent value="profiles">
            <ProfileManagement />
          </TabsContent>

          <TabsContent value="subscriptions">
            <SubscriptionManagement />
          </TabsContent>

          <TabsContent value="messages">
            <ChatInterface />
          </TabsContent>
        </Tabs>

        {/* Modals */}
        <SendMessageModal
          isOpen={showSendMessageModal}
          onClose={() => setShowSendMessageModal(false)}
          onSend={sendMessage}
        />
        <ReceiveConfigModal
          isOpen={showReceiveConfigModal}
          onClose={() => setShowReceiveConfigModal(false)}
          onReceive={receiveNetworkConfig}
        />
        <MintNFTModal
          isOpen={showMintNFTModal}
          onClose={() => setShowMintNFTModal(false)}
          onMint={mintNFT}
        />
      </div>
    </div>
  );
};

export default UserDashboard;
