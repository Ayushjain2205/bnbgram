"use client";

import { useState } from "react";
import { ArrowLeft, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function SendMoney() {
  const router = useRouter();
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");

  const handleSend = () => {
    // Implement send logic here
    console.log("Sending", amount, "BNB to", address);
  };

  return (
    <div className="container max-w-md mx-auto p-4">
      <Button variant="ghost" className="mb-4" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>

      <Card className="border-4 border-black rounded-2xl overflow-hidden">
        <CardHeader className="bg-yellow-400 border-b-4 border-black">
          <CardTitle className="text-2xl font-bold text-center">
            Send BNB
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-lg font-bold">
              Amount
            </Label>
            <div className="relative">
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pr-12 text-lg border-2 border-black rounded-xl"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 font-bold">
                BNB
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="address" className="text-lg font-bold">
              Recipient Address
            </Label>
            <Input
              id="address"
              type="text"
              placeholder="Enter BNB address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="text-lg border-2 border-black rounded-xl"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleSend}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 rounded-xl border-2 border-black transition-colors"
          >
            <Send className="mr-2 h-5 w-5" /> Send BNB
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
