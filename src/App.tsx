import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WalletProvider } from "@/contexts/WalletContext";
import { MessageProvider } from "@/contexts/MessageContext";
import Index from "./pages/Index";
import UserDashboard from "./pages/UserDashboard";

const queryClient = new QueryClient();

const App = () => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <WalletProvider>
        <MessageProvider>
          <TooltipProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<UserDashboard />} />
            </Routes>
            <Toaster />
            <Sonner />
          </TooltipProvider>
        </MessageProvider>
      </WalletProvider>
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;