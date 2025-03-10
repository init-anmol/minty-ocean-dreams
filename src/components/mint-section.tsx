
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NumberInput } from "@/components/ui/number-input";
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import { Loader2, Plus } from "lucide-react";

type MintSectionProps = {
  onMint: () => Promise<void>;
  isMinting: boolean;
};

const MintSection = ({ onMint, isMinting }: MintSectionProps) => {
  const [mintCount, setMintCount] = useState(1);
  const { connected } = useWallet();
  
  const handleMint = () => {
    if (connected && !isMinting) {
      onMint();
    }
  };
  
  return (
    <Card className="p-6 glass-card border border-white/50 relative overflow-hidden">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <div className="inline-flex items-center space-x-2">
            <div className="h-6 w-1 bg-primary rounded-full" />
            <span className="text-sm font-medium uppercase tracking-wide text-primary">
              NFT Collection
            </span>
          </div>
          <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">
            Mint Your Exclusive NFT
          </h2>
          <p className="text-muted-foreground max-w-lg">
            Join our collection with a unique NFT living on the Solana blockchain. Each piece is individually crafted with premium digital artistry.
          </p>
        </div>
        
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-1">
            {connected ? (
              <>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="w-32">
                    <NumberInput
                      value={mintCount}
                      onChange={setMintCount}
                      min={1}
                      max={20}
                      disabled={isMinting}
                      aria-label="Number of NFTs to mint"
                    />
                  </div>
                  <Button
                    onClick={handleMint}
                    disabled={isMinting}
                    className="px-6 py-6 flex-1 bg-primary text-white hover:bg-primary/90 transition-all duration-200 relative overflow-hidden"
                  >
                    {isMinting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Minting...
                      </>
                    ) : (
                      <>
                        <Plus className="mr-2 h-4 w-4" />
                        Mint NFT
                      </>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] animate-[shimmer_2s_infinite]" />
                  </Button>
                </div>
                {mintCount > 20 && (
                  <p className="text-sm text-destructive">
                    You can mint a maximum of 20 NFTs at a time.
                  </p>
                )}
              </>
            ) : (
              <div className="flex items-center justify-center">
                <WalletMultiButton />
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MintSection;
