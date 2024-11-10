"use client";
import type React from "react";
import { getNFT, balanceOf, claimTo } from "thirdweb/extensions/erc721";
import {
  MediaRenderer,
  PayEmbed,
  useActiveAccount,
  useReadContract,
} from "thirdweb/react";
import { client, oeNFTContract } from "../constants";
import { bsc } from "thirdweb/chains";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const PayHome: React.FC = () => {
  const router = useRouter();
  const smartAccount = useActiveAccount();
  const { data: nft, isLoading: isNftLoading } = useReadContract(getNFT, {
    contract: oeNFTContract,
    tokenId: 1n,
  });
  const { data: ownedNfts } = useReadContract(balanceOf, {
    contract: oeNFTContract,
    owner: smartAccount?.address!,
    queryOptions: { enabled: !!smartAccount },
  });
  return (
    <div className="h-screen items-center gap-8 container max-w-md mx-auto p-4">
      <Button variant="ghost" className="mb-4" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      <PayEmbed
        client={client}
        payOptions={{
          prefillBuy: {
            chain: bsc,
            amount: "1",
          },
        }}
      />
    </div>
  );
};

export default PayHome;
