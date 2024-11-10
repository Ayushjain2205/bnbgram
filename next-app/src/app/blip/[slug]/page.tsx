"use client";

import { useState, useMemo } from "react";
import { DollarSign, X, Image as ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { notFound } from "next/navigation";

interface BlipData {
  id: string;
  title: string;
  description: string;
}

const timeButtons = ["LIVE", "4H", "1D", "1W", "1M", "3M", "MAX"];

// Mock data for the graph
const generateMockData = (points: number) => {
  const data = [];
  let value = 0.01;
  for (let i = 0; i < points; i++) {
    value += (Math.random() - 0.5) * 0.002;
    data.push({ x: i, y: Math.max(0.001, value) });
  }
  return data;
};

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
  const blipData = await getBlipData(params.slug);

  if (!blipData) {
    notFound();
  }

  const isMemecoin = blipData.id === "memecoin";

  const handleMint = () => {
    console.log(`Minting NFT`);
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
              <MemecoinBuy />
            ) : (
              <>
                <div className="flex items-center justify-center mb-4">
                  <img
                    src="https://images.playground.com/cm0phjmbv01ya3u09qypa4o37_original.jpeg"
                    alt=""
                    className="w-64"
                  />
                </div>

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

function MemecoinBuy() {
  const [selectedTime, setSelectedTime] = useState("MAX");
  const mockData = useMemo(() => generateMockData(100), []);

  const currentPrice = mockData[mockData.length - 1].y;
  const startPrice = mockData[0].y;
  const priceChange = currentPrice - startPrice;
  const percentageChange = (priceChange / startPrice) * 100;

  // Function to generate the SVG path
  const generatePath = (data: { x: number; y: number }[]) => {
    const maxY = Math.max(...data.map((d) => d.y));
    const minY = Math.min(...data.map((d) => d.y));
    const yRange = maxY - minY;

    return data
      .map((d, i) => {
        const x = (d.x / (data.length - 1)) * 100;
        const y = 100 - ((d.y - minY) / yRange) * 80; // 80% of height, leaving room for padding
        return `${i === 0 ? "M" : "L"} ${x} ${y}`;
      })
      .join(" ");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <img
          src="/meme-logo.png"
          alt="MEME Token"
          className="w-10 h-10 rounded-full border-2 border-black"
        />
        <span className="font-bold text-lg">$MEME</span>
      </div>

      <div className="space-y-1">
        <div className="text-4xl font-bold">${currentPrice.toFixed(4)}</div>
        <div
          className={`flex items-center gap-2 ${
            priceChange >= 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          <span>
            {priceChange >= 0 ? "+" : "-"}${Math.abs(priceChange).toFixed(4)}
          </span>
          <span>({percentageChange.toFixed(2)}%)</span>
          <span className="text-gray-600 text-sm">All time</span>
        </div>
      </div>

      <div className="h-48 bg-gray-100 rounded-xl border-2 border-black relative overflow-hidden">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <path
            d={generatePath(mockData)}
            fill="none"
            stroke={priceChange >= 0 ? "rgb(22 163 74)" : "rgb(220 38 38)"}
            strokeWidth="0.5"
          />
        </svg>
      </div>

      <div className="flex justify-between bg-gray-100 rounded-xl border-2 border-black p-1">
        {timeButtons.map((time) => (
          <Button
            key={time}
            variant="ghost"
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              selectedTime === time
                ? "bg-yellow-400 text-black"
                : "text-gray-600 hover:text-black hover:bg-gray-200"
            }`}
            onClick={() => setSelectedTime(time)}
          >
            {time}
          </Button>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Your balance</span>
          <span>0 $MEME</span>
        </div>

        <Button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl border-2 border-black transition-colors">
          <DollarSign className="mr-2 h-5 w-5" /> Buy $MEME
        </Button>
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
