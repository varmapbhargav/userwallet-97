import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bell, Cpu, Calendar, MessageSquare, Plus, Edit, Trash2 } from 'lucide-react';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { createWalletClient, http, parseAbi, encodeFunctionData, decodeEventLog, type Hex, parseEther } from 'viem';
import { mainnet } from 'viem/chains';
import { ChatInterface } from "@/components/messaging/ChatInterface";

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

  // Dashboard Overview Component
  const DashboardOverview = () => (
    <div className="space-y-6">
      {/* Quick Stats */}
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

      {/* Recent Notifications */}
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

  // Profile Management Component
  const ProfileManagement = () => (
    <Card className="bg-white bg-opacity-40 backdrop-blur-lg border-0 shadow-lg">
      <CardHeader>
        <CardTitle>Profile Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {profiles.map((profile) => (
            <div
              key={profile.id}
              className="p-4 rounded-lg bg-white bg-opacity-50 backdrop-blur-sm"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-800">{profile.operator}</p>
                  <p className="text-sm text-gray-600">ICCID: {profile.iccid}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    profile.status === 'Active' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {profile.status}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => updateProfileStatus(profile.id, profile.status === 'Active' ? 'Suspended' : 'Active')}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteProfile(profile.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
          <Button onClick={() => setShowAddProfileModal(true)} className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Add New Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  // Subscription Management Component
  const SubscriptionManagement = () => (
    <Card className="bg-white bg-opacity-40 backdrop-blur-lg border-0 shadow-lg">
      <CardHeader>
        <CardTitle>Subscription Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {subscriptions.map((subscription) => (
            <div
              key={subscription.id}
              className="p-4 rounded-lg bg-white bg-opacity-50 backdrop-blur-sm"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-800">{subscription.plan}</p>
                  <p className="text-sm text-gray-600">
                    Renewal: {new Date(subscription.renewalDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    subscription.status === 'Active' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {subscription.status}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteSubscription(subscription.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
          <Button onClick={() => setShowAddSubscriptionModal(true)} className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Add New Subscription
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  // Messaging Interface
  const MessagingInterface = () => (
    <ChatInterface />
  );

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
            <TabsTrigger value="profiles">Profile Management</TabsTrigger>
            <TabsTrigger value="subscriptions">Subscription Management</TabsTrigger>
            <TabsTrigger value="messages">Messaging</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <DashboardOverview />
          </TabsContent>

          <TabsContent value="profiles">
            <ProfileManagement />
          </TabsContent>

          <TabsContent value="subscriptions">
            <SubscriptionManagement />
          </TabsContent>

          <TabsContent value="messages">
            <MessagingInterface />
          </TabsContent>
        </Tabs>

        {/* Modals */}
        {showAddProfileModal && (
          <AddProfileModal
            onClose={() => setShowAddProfileModal(false)}
            onSubmit={registerProfile}
          />
        )}
        {showAddSubscriptionModal && (
          <AddSubscriptionModal
            onClose={() => setShowAddSubscriptionModal(false)}
            onSubmit={addSubscription}
          />
        )}
        {showSendMessageModal && (
          <SendMessageModal />
        )}
        {showReceiveConfigModal && (
          <ReceiveConfigModal />
        )}
        {showMintNFTModal && (
          <MintNFTModal />
        )}
      </div>
    </div>
  );
};

// Add Profile Modal
const AddProfileModal = ({ onClose, onSubmit }: { onClose: () => void; onSubmit: (eid: string, iccid: string, msisdn: string, imei: string, deviceModel: string, osVersion: string, mcc: string, mnc: string, proof: Hex) => void }) => {
  const [eid, setEid] = useState('');
  const [iccid, setIccid] = useState('');
  const [msisdn, setMsisdn] = useState('');
  const [imei, setImei] = useState('');
  const [deviceModel, setDeviceModel] = useState('');
  const [osVersion, setOsVersion] = useState('');
  const [mcc, setMcc] = useState('');
  const [mnc, setMnc] = useState('');
  const [proof, setProof] = useState<Hex>('0x0');

  const handleSubmit = () => {
    onSubmit(eid, iccid, msisdn, imei, deviceModel, osVersion, mcc, mnc, proof);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <Card className="bg-white bg-opacity-40 backdrop-blur-lg border-0 shadow-lg p-6 w-96">
        <CardHeader>
          <CardTitle>Add New Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="EID"
              value={eid}
              onChange={(e) => setEid(e.target.value)}
              className="w-full p-2 rounded-lg bg-white bg-opacity-30 backdrop-blur-sm border"
            />
            <input
              type="text"
              placeholder="ICCID"
              value={iccid}
              onChange={(e) => setIccid(e.target.value)}
              className="w-full p-2 rounded-lg bg-white bg-opacity-30 backdrop-blur-sm border"
            />
            <input
              type="text"
              placeholder="MSISDN"
              value={msisdn}
              onChange={(e) => setMsisdn(e.target.value)}
              className="w-full p-2 rounded-lg bg-white bg-opacity-30 backdrop-blur-sm border"
            />
            <input
              type="text"
              placeholder="IMEI"
              value={imei}
              onChange={(e) => setImei(e.target.value)}
              className="w-full p-2 rounded-lg bg-white bg-opacity-30 backdrop-blur-sm border"
            />
            <input
              type="text"
              placeholder="Device Model"
              value={deviceModel}
              onChange={(e) => setDeviceModel(e.target.value)}
              className="w-full p-2 rounded-lg bg-white bg-opacity-30 backdrop-blur-sm border"
            />
            <input
              type="text"
              placeholder="OS Version"
              value={osVersion}
              onChange={(e) => setOsVersion(e.target.value)}
              className="w-full p-2 rounded-lg bg-white bg-opacity-30 backdrop-blur-sm border"
            />
            <input
              type="text"
              placeholder="MCC"
              value={mcc}
              onChange={(e) => setMcc(e.target.value)}
              className="w-full p-2 rounded-lg bg-white bg-opacity-30 backdrop-blur-sm border"
            />
            <input
              type="text"
              placeholder="MNC"
              value={mnc}
              onChange={(e) => setMnc(e.target.value)}
              className="w-full p-2 rounded-lg bg-white bg-opacity-30 backdrop-blur-sm border"
            />
            <input
              type="text"
              placeholder="Proof"
              value={proof}
              onChange={(e) => setProof(e.target.value as Hex)}
              className="w-full p-2 rounded-lg bg-white bg-opacity-30 backdrop-blur-sm border"
            />
            <Button onClick={handleSubmit} className="w-full">
              Add Profile
            </Button>
            <Button variant="outline" onClick={onClose} className="w-full">
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Add Subscription Modal
const AddSubscriptionModal = ({ onClose, onSubmit }: { onClose: () => void; onSubmit: (plan: string, renewalDate: string) => void }) => {
  const [plan, setPlan] = useState('');
  const [renewalDate, setRenewalDate] = useState('');

  const handleSubmit = () => {
    onSubmit(plan, renewalDate);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <Card className="bg-white bg-opacity-40 backdrop-blur-lg border-0 shadow-lg p-6 w-96">
        <CardHeader>
          <CardTitle>Add New Subscription</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Plan Name"
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
              className="w-full p-2 rounded-lg bg-white bg-opacity-30 backdrop-blur-sm border"
            />
            <input
              type="date"
              placeholder="Renewal Date"
              value={renewalDate}
              onChange={(e) => setRenewalDate(e.target.value)}
              className="w-full p-2 rounded-lg bg-white bg-opacity-30 backdrop-blur-sm border"
            />
            <Button onClick={handleSubmit} className="w-full">
              Add Subscription
            </Button>
            <Button variant="outline" onClick={onClose} className="w-full">
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDashboard;
