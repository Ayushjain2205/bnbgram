"use client";

import { useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  ArrowDownLeft,
  RefreshCw,
  CreditCard,
  Coins,
  ArrowLeftRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
// Mock data for recent transactions
const mockTransactions = [
  {
    id: 1,
    type: "send",
    amount: "0.5 BNB",
    to: "0x1234...5678",
    date: "2024-11-10",
  },
  {
    id: 2,
    type: "receive",
    amount: "1.2 BNB",
    from: "0x8765...4321",
    date: "2024-11-10",
  },
  {
    id: 3,
    type: "buy",
    amount: "2.0 BNB",
    method: "Credit Card",
    date: "2024-11-10",
  },
  {
    id: 4,
    type: "mint",
    amount: "1 NFT",
    collection: "CryptoPunks",
    date: "2024-11-10",
  },
  { id: 5, type: "swap", amount: "0.5 BNB", to: "10 CAKE", date: "2024-11-09" },
  {
    id: 6,
    type: "bridge",
    amount: "1.0 BNB",
    from: "BSC",
    to: "Ethereum",
    date: "2024-11-09",
  },
  {
    id: 7,
    type: "send",
    amount: "0.3 BNB",
    to: "0x2468...1357",
    date: "2024-11-09",
  },
  {
    id: 8,
    type: "receive",
    amount: "0.8 BNB",
    from: "0x1357...2468",
    date: "2024-11-09",
  },
  {
    id: 9,
    type: "buy",
    amount: "1.5 BNB",
    method: "Bank Transfer",
    date: "2024-11-09",
  },
  {
    id: 10,
    type: "mint",
    amount: "2 NFT",
    collection: "Bored Apes",
    date: "2024-11-09",
  },
  {
    id: 11,
    type: "swap",
    amount: "1.0 BNB",
    to: "20 BUSD",
    date: "2024-11-08",
  },
  {
    id: 12,
    type: "bridge",
    amount: "2.0 BNB",
    from: "Ethereum",
    to: "BSC",
    date: "2024-11-08",
  },
];

export default function ActivityPage() {
  const router = useRouter();
  const [transactions, setTransactions] = useState(mockTransactions);

  const refreshTransactions = () => {
    // In a real app, this would fetch new transactions from an API
    console.log("Refreshing transactions...");
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "send":
        return <ArrowUpRight className="h-6 w-6 text-red-500" />;
      case "receive":
        return <ArrowDownLeft className="h-6 w-6 text-green-500" />;
      case "buy":
        return <CreditCard className="h-6 w-6 text-blue-500" />;
      case "mint":
        return <Coins className="h-6 w-6 text-purple-500" />;
      case "swap":
        return <ArrowLeftRight className="h-6 w-6 text-orange-500" />;
      case "bridge":
        return <ArrowLeftRight className="h-6 w-6 text-indigo-500" />;
      default:
        return <ArrowLeftRight className="h-6 w-6 text-gray-500" />;
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case "send":
        return "bg-red-100";
      case "receive":
        return "bg-green-100";
      case "buy":
        return "bg-blue-100";
      case "mint":
        return "bg-purple-100";
      case "swap":
        return "bg-orange-100";
      case "bridge":
        return "bg-indigo-100";
      default:
        return "bg-gray-100";
    }
  };

  const getTransactionDetails = (tx: any) => {
    switch (tx.type) {
      case "send":
        return `Sent to ${tx.to}`;
      case "receive":
        return `Received from ${tx.from}`;
      case "buy":
        return `Bought with ${tx.method}`;
      case "mint":
        return `Minted from ${tx.collection}`;
      case "swap":
        return `Swapped for ${tx.to}`;
      case "bridge":
        return `Bridged from ${tx.from} to ${tx.to}`;
      default:
        return "";
    }
  };

  return (
    <div className="container max-w-md mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <Button variant="ghost" className="" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>

        <Button variant="ghost" className="p-2" onClick={refreshTransactions}>
          <RefreshCw className="h-6 w-6" />
        </Button>
      </div>

      <Card className="border-4 border-black rounded-2xl overflow-hidden">
        <CardHeader className="bg-yellow-400 border-b-4 border-black">
          <CardTitle className="text-xl font-bold text-center">
            Your Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between py-3 border-b-2 border-black last:border-b-0"
            >
              <div className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${getTransactionColor(
                    tx.type
                  )} border-2 border-black mr-3`}
                >
                  {getTransactionIcon(tx.type)}
                </div>
                <div>
                  <p className="font-bold capitalize">{tx.type}</p>
                  <p className="text-sm text-gray-600">
                    {getTransactionDetails(tx)}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p
                  className={`font-bold ${
                    tx.type === "send" ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {tx.type === "send" ? "-" : ""}
                  {tx.amount}
                </p>
                <p className="text-sm text-gray-600">{tx.date}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
