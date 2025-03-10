
import React from 'react';
import NftCard from './nft-card';
import { Loader2 } from 'lucide-react';

type NFTCollectionProps = {
  nfts: any[];
  isLoading: boolean;
  onTransfer: (nft: any, recipient: string) => Promise<void>;
};

const NFTCollection = ({ nfts, isLoading, onTransfer }: NFTCollectionProps) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[200px] w-full">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Loading your collection...</p>
      </div>
    );
  }

  if (nfts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[200px] w-full bg-muted/20 rounded-xl py-12 border border-dashed border-muted">
        <div className="rounded-full bg-muted/30 p-4">
          <img 
            src="/placeholder.svg" 
            alt="No NFTs" 
            className="w-10 h-10 opacity-40"
          />
        </div>
        <h3 className="mt-4 text-xl font-medium">No NFTs Found</h3>
        <p className="mt-2 text-muted-foreground text-center max-w-md">
          Your NFT collection is empty. Mint your first NFT to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="nft-grid w-full">
      {nfts.map((nft) => (
        <NftCard 
          key={nft.address.toString()} 
          nft={nft} 
          onTransfer={onTransfer} 
        />
      ))}
    </div>
  );
};

export default NFTCollection;
