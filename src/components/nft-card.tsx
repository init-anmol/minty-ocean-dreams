
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Send, ExternalLink, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/sonner";

type NFTCardProps = {
  nft: any;
  onTransfer: (nft: any, recipient: string) => Promise<void>;
};

const NFTCard = ({ nft, onTransfer }: NFTCardProps) => {
  const [recipient, setRecipient] = useState('');
  const [isTransferring, setIsTransferring] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const nftName = nft.name || "Untitled NFT";
  const mintAddress = nft.address.toString();
  const shortAddress = `${mintAddress.slice(0, 4)}...${mintAddress.slice(-4)}`;
  
  const handleTransfer = async () => {
    if (!recipient.trim()) {
      toast.error("Please enter a recipient address");
      return;
    }
    
    setIsTransferring(true);
    try {
      await onTransfer(nft, recipient);
      toast.success("NFT transferred successfully");
      setRecipient('');
    } catch (error) {
      console.error("Transfer error:", error);
      toast.error("Failed to transfer NFT");
    } finally {
      setIsTransferring(false);
    }
  };
  
  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md glass-card animate-fade-in border border-white/50">
      <CardHeader className="p-0 relative aspect-square overflow-hidden">
        <div className={cn(
          "absolute inset-0 bg-muted/30 flex items-center justify-center",
          imageLoaded ? "opacity-0" : "opacity-100"
        )}>
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
        <img 
          src={nft.image || "/placeholder.svg"} 
          alt={nftName}
          className={cn(
            "object-cover w-full h-full transition-opacity duration-300",
            imageLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageLoaded(true)} // In case of error, still hide loader
        />
      </CardHeader>
      
      <CardContent className="p-4">
        <h3 className="font-medium text-lg truncate">{nftName}</h3>
        <div className="flex items-center mt-1 text-sm text-muted-foreground">
          <span className="truncate">{shortAddress}</span>
          <a 
            href={`https://explorer.solana.com/address/${mintAddress}?cluster=devnet`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="ml-1 text-primary hover:text-primary/80 transition-colors"
          >
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col p-4 pt-0 gap-2">
        <Input
          placeholder="Recipient address"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          className="text-sm"
          disabled={isTransferring}
        />
        <Button 
          onClick={handleTransfer} 
          disabled={isTransferring || !recipient.trim()}
          variant="default"
          className="w-full"
        >
          {isTransferring ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Transferring
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Transfer
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NFTCard;
