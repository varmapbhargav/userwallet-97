import { cn } from "@/lib/utils";

interface AuthCardProps {
  children: React.ReactNode;
  className?: string;
}

export const AuthCard = ({ children, className }: AuthCardProps) => {
  return (
    <div
      className={cn(
        "w-full p-6 rounded-xl bg-white/95 backdrop-blur-sm shadow-sm border border-gray-100 animate-fadeIn",
        className
      )}
    >
      {children}
    </div>
  );
};