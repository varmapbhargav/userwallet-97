import { cn } from "@/lib/utils";

interface AuthCardProps {
  children: React.ReactNode;
  className?: string;
}

export const AuthCard = ({ children, className }: AuthCardProps) => {
  return (
    <div
      className={cn(
        "w-full max-w-md p-8 rounded-2xl bg-white/80 backdrop-blur-lg border border-gray-100 shadow-xl animate-fadeIn",
        className
      )}
    >
      {children}
    </div>
  );
};