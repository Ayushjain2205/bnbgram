"use client";

import { useState } from "react";
import {
  useActiveAccount,
  useActiveWalletChain,
  useWalletBalance,
} from "thirdweb/react";
import { shortenAddress } from "thirdweb/utils";
import { Card, CardContent } from "@/components/ui/card";
import { client, wallet } from "./constants";
import { AutoConnect } from "thirdweb/react";
import Link from "next/link";
import { Eye, EyeOff, User, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const account = useActiveAccount();
  const chain = useActiveWalletChain();
  const { data, isLoading, isError } = useWalletBalance({
    chain,
    address: account?.address,
    client,
  });
  const [showBalance, setShowBalance] = useState(true);
  const [copySuccess, setCopySuccess] = useState(false);
  const [network, setNetwork] = useState("BSC");

  const copyAddress = async () => {
    if (account?.address) {
      await navigator.clipboard.writeText(account.address);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  return (
    <main className="pb-10 min-h-[100vh] flex flex-col container max-w-screen-lg mx-auto bg-white">
      <header className="sticky top-0 z-50 bg-white border-b-4 border-black">
        <div className="container flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-2">
            <img
              src="/binance-wallet.svg"
              className="w-10 h-10"
              alt="bnbgram"
            />
            <span className="font-bold text-xl">BNBGram</span>
          </div>
        </div>
      </header>

      <div className="p-4">
        <AutoConnect client={client} wallets={[wallet]} />
        <div className="flex flex-col gap-4 justify-center mb-6">
          {account ? (
            <>
              <Card className="rounded-2xl border-4 border-black overflow-hidden bg-gradient-to-br from-yellow-400 to-yellow-500 relative">
                <CardContent className="p-6 space-y-6 relative">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-2">
                      <User className="w-5 h-5 text-black" />
                      <div className="font-mono text-lg font-bold text-black break-all">
                        {shortenAddress(account.address)}
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full border-2 border-black bg-white hover:bg-yellow-100 p-1"
                        onClick={copyAddress}
                      >
                        {copySuccess ? (
                          <Check className="w-2 h-2" />
                        ) : (
                          <Copy className="w-2 h-2" />
                        )}
                      </Button>
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full border-2 border-black bg-white hover:bg-yellow-100 absolute top-2 right-2"
                      onClick={() => setShowBalance(!showBalance)}
                    >
                      {showBalance ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <div className="text-lg font-bold text-black">
                      Total Balance
                    </div>
                    <div className="flex items-baseline gap-2">
                      <div className="text-4xl font-black text-black tabular-nums">
                        {showBalance
                          ? data?.displayValue.slice(0, 6)
                          : "••••••"}
                      </div>
                      <div className="text-xl font-bold text-black">BNB</div>
                    </div>
                    <div className="text-lg font-medium text-black/80">
                      ≈ ${showBalance ? "321.45" : "••••••"} USD
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="rounded-full w-10 h-10 p-0 border-2 border-black bg-white hover:bg-yellow-100 overflow-hidden absolute bottom-2 right-2"
                    onClick={() =>
                      setNetwork(network === "BSC" ? "Opbnb" : "BSC")
                    }
                  >
                    <img
                      src={
                        network === "BSC" ? "/bnb-logo.png" : "/opbnb-logo.png"
                      }
                      alt={network}
                      className="w-full h-full object-cover"
                    />
                  </Button>
                </CardContent>
              </Card>

              {/* Simple Quick Action Buttons */}
              <div className="grid grid-cols-3 gap-4 mt-4">
                <Button
                  className="flex flex-col items-center justify-between p-4 h-24 bg-white hover:bg-yellow-100 border-2 border-black rounded-xl"
                  onClick={() => router.push("/send")}
                >
                  <img src="/send.svg" alt="send" className="w-10 h-10" />
                  <span className="text-sm font-bold text-black">Send</span>
                </Button>

                <Button
                  className="flex flex-col items-center justify-between p-4 h-24 bg-white hover:bg-yellow-100 border-2 border-black rounded-xl"
                  onClick={() => router.push("/receive")}
                >
                  <img src="/receive.svg" alt="receive" className="w-10 h-10" />
                  <span className="text-sm font-bold text-black">Receive</span>
                </Button>

                <Button
                  className="flex flex-col items-center justify-between p-4 h-24 bg-white hover:bg-yellow-100 border-2 border-black rounded-xl"
                  onClick={() => router.push("/pay")}
                >
                  <img src="/buy.svg" alt="buy" className="w-12 h-12 " />
                  <span className="text-sm font-bold text-black mt-[10px]">
                    Buy
                  </span>
                </Button>
                <Button
                  className="flex flex-col items-center justify-between p-4 h-24 bg-white hover:bg-yellow-100 border-2 border-black rounded-xl"
                  onClick={() => router.push("/gasless")}
                >
                  <img src="/bridge.svg" alt="bridge" className="w-12 h-12" />
                  <span className="text-sm font-bold text-black">Bridge</span>
                </Button>

                <Button
                  className="flex flex-col items-center justify-between p-4 h-24 bg-white hover:bg-yellow-100 border-2 border-black rounded-xl"
                  onClick={() => router.push("/swap")}
                >
                  <img src="/swap.svg" alt="swap" className="w-14 h-14" />
                  <span className="text-sm font-bold text-black">Swap</span>
                </Button>

                <Button
                  className="flex flex-col items-center justify-between p-4 h-24 bg-white hover:bg-yellow-100 border-2 border-black rounded-xl"
                  onClick={() => router.push("/activity")}
                >
                  <img
                    src="/activity.svg"
                    alt="activity"
                    className="w-10 h-10"
                  />
                  <span className="text-sm font-bold text-black">Activity</span>
                </Button>
              </div>
            </>
          ) : (
            <div className="flex flex-col gap-2 items-center justify-center">
              <img
                src="/binance-wallet.svg"
                className="w-36 h-36 animate-pulse"
                alt="bnbgram"
              />
              Loading wallet...
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
