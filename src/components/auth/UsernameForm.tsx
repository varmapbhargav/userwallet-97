import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface UsernameFormProps {
  onSuccess: (username: string) => void;
}

export const UsernameForm = ({ onSuccess }: UsernameFormProps) => {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Here we would typically check username availability with a backend service
      // For now, we'll just simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      if (username.length < 3) {
        throw new Error("Username must be at least 3 characters long");
      }

      onSuccess(username);
      toast.success("Username set successfully!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="username">Choose a username</Label>
        <Input
          id="username"
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="h-12"
          required
          minLength={3}
        />
      </div>
      <Button
        type="submit"
        className="w-full h-12 text-base font-medium transition-all"
        disabled={isLoading}
      >
        {isLoading ? "Checking availability..." : "Continue"}
      </Button>
    </form>
  );
};