"use client";

import { useState } from "react";
import { ArrowLeft, Copy, Check } from "lucide-react";
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
import { QRCodeSVG } from "qrcode.react";
import { useRouter } from "next/navigation";

export default function ReceiveMoney() {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const walletAddress = "0x1234...5678"; // Replace with actual wallet address

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container max-w-md mx-auto p-4">
      <Button variant="ghost" className="mb-4" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>

      <Card className="border-4 border-black rounded-2xl overflow-hidden">
        <CardHeader className="bg-yellow-400 border-b-4 border-black">
          <CardTitle className="text-2xl font-bold text-center">
            Receive BNB
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="address" className="text-lg font-bold">
              Your BNB Address
            </Label>
            <div className="flex">
              <Input
                id="address"
                type="text"
                value={walletAddress}
                readOnly
                className="flex-grow text-lg border-2 border-black rounded-l-xl"
              />
              <Button
                onClick={handleCopy}
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold border-2 border-l-0 border-black rounded-r-xl transition-colors"
              >
                {copied ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <Copy className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-48 h-48 bg-white border-4 border-black rounded-xl flex items-center justify-center p-2">
              <QRCodeSVG
                value={walletAddress}
                size={168}
                level="H"
                includeMargin={true}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-2">
          <p className="font-bold text-center">
            Scan QR code or copy address to receive BNB
          </p>
          <p className="text-sm text-center text-gray-600">
            Only send BNB to this address
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
