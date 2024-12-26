import { WalletCard } from "./WalletCard";
import { WalletStats } from "./WalletStats";

export const WalletTab = () => {
  return (
    <div className="space-y-6">
      <WalletStats />
      <WalletCard />
    </div>
  );
};