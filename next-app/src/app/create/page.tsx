"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

type BlipType = "memecoin" | "nft" | "other" | null;

export default function CreateBlipPage() {
  const { toast } = useToast();
  const [blipType, setBlipType] = useState<BlipType>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    description: "",
    shortUrl: "",
    parentContract: "",
  });

  const handleTypeSelect = (type: BlipType) => {
    setBlipType(type);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call with 1 minute delay
    await new Promise((resolve) => setTimeout(resolve, 60000));

    setIsLoading(false);
    toast({
      title: "Blip Created",
      description: "Your Blip has been successfully created!",
    });

    // Reset form
    setBlipType(null);
    setFormData({
      id: "",
      title: "",
      description: "",
      shortUrl: "",
      parentContract: "",
    });
  };

  const getContractLabel = () => {
    switch (blipType) {
      case "memecoin":
        return "Memecoin Contract Address";
      case "nft":
        return "NFT Contract Address";
      default:
        return "Parent Contract Address";
    }
  };

  return (
    <div className="min-h-screen bg-white text-black p-4">
      <Card className="max-w-2xl mx-auto border-4 border-black rounded-2xl overflow-hidden">
        <CardHeader className="bg-yellow-400 border-b-4 border-black">
          <CardTitle className="text-2xl font-bold text-center text-black">
            Create a New Blip
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-64">
              <Loader2 className="w-12 h-12 animate-spin text-yellow-400" />
              <p className="mt-4 text-lg font-semibold text-black">
                Creating Blip...
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    type: "memecoin",
                    icon: "/memecoin.svg",
                    label: "Memecoin",
                  },
                  { type: "nft", icon: "/nft.svg", label: "NFT Mint" },
                  { type: "other", icon: "/other.svg", label: "Other" },
                ].map(({ type, icon, label }) => (
                  <Button
                    key={type}
                    onClick={() => handleTypeSelect(type as BlipType)}
                    className={`h-32 flex flex-col items-center justify-center text-lg font-bold border-4 ${
                      blipType === type
                        ? "bg-yellow-400 border-black text-black"
                        : "bg-white border-black text-black hover:bg-yellow-100"
                    }`}
                  >
                    <Image
                      src={icon}
                      alt={label}
                      width={64}
                      height={64}
                      className="mb-2"
                    />
                    {label}
                  </Button>
                ))}
              </div>

              {blipType && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="id" className="text-black">
                      Blip ID
                    </Label>
                    <Input
                      id="id"
                      name="id"
                      value={formData.id}
                      onChange={handleChange}
                      className="border-2 border-black rounded-xl text-black"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="title" className="text-black">
                      Title
                    </Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className="border-2 border-black rounded-xl text-black"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="description" className="text-black">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="border-2 border-black rounded-xl text-black"
                      rows={3}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="shortUrl" className="text-black">
                      Short URL
                    </Label>
                    <Input
                      id="shortUrl"
                      name="shortUrl"
                      value={formData.shortUrl}
                      onChange={handleChange}
                      className="border-2 border-black rounded-xl text-black"
                      required
                    />
                  </div>
                  {(blipType === "memecoin" || blipType === "nft") && (
                    <div>
                      <Label htmlFor="parentContract" className="text-black">
                        {getContractLabel()}
                      </Label>
                      <Input
                        id="parentContract"
                        name="parentContract"
                        value={formData.parentContract}
                        onChange={handleChange}
                        className="border-2 border-black rounded-xl text-black"
                        placeholder="0x..."
                        required
                      />
                    </div>
                  )}
                  <Button
                    type="submit"
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 rounded-xl border-2 border-black transition-colors"
                  >
                    Create Blip
                  </Button>
                </form>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
