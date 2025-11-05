"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";

type TabType = "email" | "wallet";

export default function SignUpPage() {
  const [activeTab, setActiveTab] = useState<TabType>("email");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate registration
    setTimeout(() => {
      alert("Registration successful! (Demo Mode)");
      setIsLoading(false);
      router.push("/");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-muted flex flex-col">
      <div className="p-4">
        <Link href="/" className="flex items-center gap-2 w-fit">
          <div className="w-10 h-10 bg-gradient-to-br from-[#15949C] to-[#002333] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">H</span>
          </div>
          <span className="text-[#002333] font-bold text-lg">HIRE U</span>
        </Link>
      </div>
      
      <div className="flex flex-col items-center justify-start flex-1 px-4 pt-8">
        <Card className="w-full max-w-md p-6 shadow-lg">
          <h1 className="text-2xl font-semibold text-center mb-2">Create Account</h1>
          <p className="text-center text-sm text-gray-500 mb-6">
            Join HireU and start your journey
          </p>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab("email")}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
                activeTab === "email"
                  ? "bg-white text-[#149A9B] shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Email
            </button>
            <button
              onClick={() => setActiveTab("wallet")}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
                activeTab === "wallet"
                  ? "bg-white text-[#149A9B] shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Wallet
            </button>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {activeTab === "email" ? (
              <>
                <p className="text-sm text-gray-600 mb-4 text-center">
                  Register with your email
                </p>
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" type="text" placeholder="John Doe" required />
                </div>
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" type="text" placeholder="johndoe" required />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john@example.com" required />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="••••••••" required />
                </div>
                <div>
                  <Label htmlFor="bio">Bio (Optional)</Label>
                  <Input id="bio" type="text" placeholder="Tell us about yourself" />
                </div>
              </>
            ) : (
              <>
                <p className="text-sm text-gray-600 mb-4 text-center">
                  Connect your wallet (Demo Mode)
                </p>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-600">
                    Wallet connection is disabled in demo mode
                  </p>
                </div>
              </>
            )}

            <Button 
              type="submit" 
              className="w-full bg-[#15949C] hover:bg-[#15949C]/90"
              disabled={isLoading}
              isLoading={isLoading}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          <Separator className="my-6" />

          {/* Sign In Link */}
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/onboarding/sign-in" className="text-[#149A9B] font-medium hover:underline">
              Sign in
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}

