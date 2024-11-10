"use client";

import { useState } from "react";
import { DollarSign, Info, X, Image as ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { notFound } from "next/navigation";

interface BlipData {
  id: string;
  title: string;
  description: string;
}

async function getBlipData(slug: string): Promise<BlipData | null> {
  try {
    return {
      id: slug,
      title: `Blip ${slug}`,
      description: `This is the description for blip ${slug}`,
    };
  } catch (error) {
    console.error("Error fetching blip data:", error);
    return null;
  }
}

export default async function BlipPage({
  params,
}: {
  params: { slug: string };
}) {
  const router = useRouter();
  const [amount, setAmount] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");
  const memePrice = 0.0123;
  const [nftName, setNftName] = useState("");
  const [nftDescription, setNftDescription] = useState("");

  const blipData = await getBlipData(params.slug);

  if (!blipData) {
    notFound();
  }

  const isMemecoin = blipData.id === "memecoin";

  const handleAmountChange = (value: string) => {
    setAmount(value);
    setPaymentAmount((parseFloat(value) * memePrice).toFixed(2));
  };

  const handlePaymentChange = (value: string) => {
    setPaymentAmount(value);
    setAmount((parseFloat(value) / memePrice).toFixed(2));
  };

  const handleBuy = () => {
    console.log(`Buying ${amount} $MEME for $${paymentAmount}`);
  };

  const handleMint = () => {
    console.log(`Minting NFT: ${nftName} - ${nftDescription}`);
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="bg-white border-b-4 border-black p-4 flex justify-between items-center">
        <div className="flex items-center">
          <img src="/blip.svg" alt="Blip" className="w-8 h-8 mr-4" />
          <h1 className="text-xl font-bold">{blipData.title}</h1>
        </div>
        <Button variant="ghost" className="p-2" onClick={() => router.back()}>
          <X className="h-6 w-6" />
        </Button>
      </div>

      <div className="max-w-2xl mx-auto p-4">
        <Card className="border-4 border-black rounded-2xl overflow-hidden">
          <CardHeader className="bg-yellow-400 border-b-4 border-black">
            <CardTitle className="text-xl font-bold text-center">
              {isMemecoin ? "Buy $MEME Token" : "Mint NFT"}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            {isMemecoin ? (
              <>
                <div className="flex items-center justify-center mb-4">
                  <img
                    src="/meme-logo.png"
                    alt="MEME Token"
                    className="w-16 h-16"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="meme-amount" className="text-lg font-bold">
                    Amount of $MEME
                  </Label>
                  <div className="relative">
                    <Input
                      id="meme-amount"
                      type="number"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => handleAmountChange(e.target.value)}
                      className="pr-16 border-2 border-black rounded-xl"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 font-bold">
                      $MEME
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="payment-amount" className="text-lg font-bold">
                    Payment Amount
                  </Label>
                  <div className="relative">
                    <Input
                      id="payment-amount"
                      type="number"
                      placeholder="0.00"
                      value={paymentAmount}
                      onChange={(e) => handlePaymentChange(e.target.value)}
                      className="pr-16 border-2 border-black rounded-xl"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 font-bold">
                      USD
                    </span>
                  </div>
                </div>

                <div className="bg-gray-100 p-4 rounded-xl border-2 border-black">
                  <div className="flex justify-between items-center">
                    <span className="font-bold">Price per $MEME</span>
                    <span>${memePrice.toFixed(4)}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="font-bold">Total Cost</span>
                    <span>${paymentAmount}</span>
                  </div>
                </div>

                <Button
                  onClick={handleBuy}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 rounded-xl border-2 border-black transition-colors"
                >
                  <DollarSign className="mr-2 h-5 w-5" /> Buy $MEME
                </Button>
              </>
            ) : (
              <>
                <div className="flex items-center justify-center mb-4">
                  <img
                    src="https://images.playground.com/cm0phjmbv01ya3u09qypa4o37_original.jpeg"
                    alt=""
                    className="w-64"
                  />
                </div>

                {/* <div className="bg-gray-100 p-4 rounded-xl border-2 border-black">
                  <div className="flex justify-between items-center">
                    <span className="font-bold"> Free Mint</span>
                    <span>0.1 ETH</span>
                  </div>
                </div> */}

                <Button
                  onClick={handleMint}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 rounded-xl border-2 border-black transition-colors"
                >
                  <ImageIcon className="mr-2 h-5 w-5" /> Mint NFT
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      Loading blip...
    </div>
  );
}

export function Error({ error }: { error: Error }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      Error: {error.message}
    </div>
  );
}
