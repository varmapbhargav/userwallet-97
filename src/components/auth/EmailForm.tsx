import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface EmailFormProps {
  onSuccess: (email: string) => void;
}

export const EmailForm = ({ onSuccess }: EmailFormProps) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Here we would typically validate the email with a backend service
      // For now, we'll just simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      if (!email.includes("@")) {
        throw new Error("Please enter a valid email address");
      }

      onSuccess(email);
      toast.success("Email verified successfully!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email">Email address</Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-12"
          required
        />
      </div>
      <Button
        type="submit"
        className="w-full h-12 text-base font-medium transition-all"
        disabled={isLoading}
      >
        {isLoading ? "Verifying..." : "Continue with Email"}
      </Button>
    </form>
  );
};