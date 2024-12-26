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

const UserDashboard = () => {
  // State management
  const [profiles, setProfiles] = useState<any[]>([]);
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [showAddProfileModal, setShowAddProfileModal] = useState(false);
  const [showAddSubscriptionModal, setShowAddSubscriptionModal] = useState(false);
  const [showSendMessageModal, setShowSendMessageModal] = useState(false);
  const [showReceiveConfigModal, setShowReceiveConfigModal] = useState(false);
  const [showMintNFTModal, setShowMintNFTModal] = useState(false);

  // Web3 Client and Contract
  const [walletClient, setWalletClient] = useState<any | null>(null);
  const [contractAddress, setContractAddress] = useState<Hex>("0xYourContractAddress"); // Replace with your contract address
  const UserSmartWalletABI = []
  // Mock data for profiles, subscriptions, notifications, and messages
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

  // Mock data for eSIM activation details
  const mockNetworkConfig = {
    iccid: '8991000012345678901',
    apn: 'internet.provider.com',
    authenticationKey: 'auth1234',
    encryptionKey: 'enc5678',
    activated: true,
  };

  // Mock data for NFT metadata
  const mockNFTMetadata = {
    iccid: '8991000012345678901',
    qrCodeUri: 'https://example.com/qrcode.png',
    networkConfigUri: 'https://example.com/network-config.json',
  };

  useEffect(() => {
    // Initialize mock data
    setProfiles(mockProfiles);
    setSubscriptions(mockSubscriptions);
    setNotifications(mockNotifications);
    setMessages(mockMessages);

    // Initialize Viem wallet client
    const initViem = async () => {
      if ((window as any).ethereum) {
        const walletClient = createWalletClient({
          chain: mainnet,
          transport: http(),
        });
        setWalletClient(walletClient);
      }
    };
    initViem();
  }, []);

  // Register a new profile (mock implementation)
  const registerProfile = async (eid: string, iccid: string, msisdn: string, imei: string, deviceModel: string, osVersion: string, mcc: string, mnc: string, proof: Hex) => {
    const newProfile = {
      id: profiles.length + 1,
      iccid,
      operator: 'Mock Operator',
      status: 'Active',
    };
    setProfiles([...profiles, newProfile]);
    setShowAddProfileModal(false);
  };

  // Update profile status (mock implementation)
  const updateProfileStatus = (id: number, status: string) => {
    const updatedProfiles = profiles.map((profile) =>
      profile.id === id ? { ...profile, status } : profile
    );
    setProfiles(updatedProfiles);
  };

  // Add a new subscription (mock implementation)
  const addSubscription = (plan: string, renewalDate: string) => {
    const newSubscription = {
      id: subscriptions.length + 1,
      plan,
      status: 'Active',
      renewalDate,
    };
    setSubscriptions([...subscriptions, newSubscription]);
    setShowAddSubscriptionModal(false);
  };

  // Delete a profile (mock implementation)
  const deleteProfile = (id: number) => {
    const updatedProfiles = profiles.filter((profile) => profile.id !== id);
    setProfiles(updatedProfiles);
  };

  // Delete a subscription (mock implementation)
  const deleteSubscription = (id: number) => {
    const updatedSubscriptions = subscriptions.filter((subscription) => subscription.id !== id);
    setSubscriptions(updatedSubscriptions);
  };

  // Mark notification as read (mock implementation)
  const markNotificationAsRead = (id: number) => {
    const updatedNotifications = notifications.filter((notification) => notification.id !== id);
    setNotifications(updatedNotifications);
  };

  // Send a message (mock implementation)
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

  // Receive network configuration (mock implementation)
  const receiveNetworkConfig = (iccid: string, apn: string, authenticationKey: string, encryptionKey: string) => {
    const newConfig = {
      iccid,
      apn,
      authenticationKey,
      encryptionKey,
      activated: true,
    };
    // Simulate updating the profile with network config
    const updatedProfiles = profiles.map((profile) =>
      profile.iccid === iccid ? { ...profile, networkConfig: newConfig } : profile
    );
    setProfiles(updatedProfiles);
    setShowReceiveConfigModal(false);
  };

  // Mint NFT with metadata (mock implementation)
  const mintNFT = (iccid: string, qrCodeUri: string, networkConfigUri: string) => {
    const newNFT = {
      id: profiles.length + 1,
      iccid,
      qrCodeUri,
      networkConfigUri,
    };
    // Simulate updating the profile with NFT metadata
    const updatedProfiles = profiles.map((profile) =>
      profile.iccid === iccid ? { ...profile, nftMetadata: newNFT } : profile
    );
    setProfiles(updatedProfiles);
    setShowMintNFTModal(false);
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
