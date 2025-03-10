
import React, { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";
import { Metaplex, walletAdapterIdentity } from "@metaplex-foundation/js";
import { toast } from "@/components/ui/sonner";
import MintSection from '@/components/mint-section';
import NFTCollection from '@/components/nft-collection';
import Header from '@/components/header';

const Index = () => {
  const [nfts, setNfts] = useState<any[]>([]);
  const [isMinting, setIsMinting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { publicKey, connected } = useWallet();
  const wallet = useWallet();

  useEffect(() => {
    // When wallet connects, fetch NFTs
    if (connected && publicKey) {
      fetchUserNFTs();
    } else {
      // Clear NFTs when wallet disconnects
      setNfts([]);
    }
  }, [connected, publicKey]);

  // Fetch NFTs owned by the user
  const fetchUserNFTs = async () => {
    if (!publicKey) return;

    setIsLoading(true);
    try {
      const connection = new Connection(clusterApiUrl("devnet"));
      const metaplex = Metaplex.make(connection).use(walletAdapterIdentity(wallet));

      const userNFTs = await metaplex.nfts().findAllByOwner({ owner: publicKey });

      // Fetch metadata JSON and add image URL to each NFT
      const updatedNFTs = await Promise.all(userNFTs.map(async (nft) => {
        if (!nft.uri) return { ...nft, image: null };

        try {
          const response = await fetch(nft.uri);
          const metadata = await response.json();
          return { ...nft, image: metadata.image };
        } catch (error) {
          console.error("Error fetching metadata:", error);
          return { ...nft, image: null };
        }
      }));

      setNfts(updatedNFTs);
    } catch (err) {
      console.error("Error fetching NFTs:", err);
      toast.error("Failed to load your NFTs");
    } finally {
      setIsLoading(false);
    }
  };

  // Mint NFT function
  const mintNFT = async () => {
    if (!publicKey) {
      toast.error("Please connect your wallet");
      return;
    }

    setIsMinting(true);
    try {
      const connection = new Connection(clusterApiUrl("devnet"));
      const metaplex = Metaplex.make(connection).use(walletAdapterIdentity(wallet));

      const metadata = {
        name: "Solana Studio NFT",
        symbol: "SONFT",
        uri: "https://raw.githubusercontent.com/init-anmol/images/refs/heads/main/nft-metadata.json",
        sellerFeeBasisPoints: 500,
      };

      toast.loading("Creating your NFT...");

      const { nft } = await metaplex.nfts().create({
        uri: metadata.uri,
        name: metadata.name,
        sellerFeeBasisPoints: metadata.sellerFeeBasisPoints,
      });

      toast.success("NFT created successfully!");
      console.log("NFT Minted:", nft.address.toString());

      // Refresh the NFT collection
      await fetchUserNFTs();
    } catch (err) {
      console.error("Minting Error:", err);
      toast.error("Failed to create NFT");
    } finally {
      setIsMinting(false);
    }
  };

  // Transfer NFT function
  const transferNFT = async (nft: any, recipient: string) => {
    if (!publicKey) {
      toast.error("Please connect your wallet");
      return;
    }

    try {
      const connection = new Connection(clusterApiUrl("devnet"));
      const metaplex = Metaplex.make(connection).use(walletAdapterIdentity(wallet));

      const recipientPublicKey = new PublicKey(recipient);
      await metaplex.nfts().transfer({
        nftOrSft: nft,
        toOwner: recipientPublicKey,
      });

      toast.success(`NFT transferred successfully`);
      // Refresh the NFT collection
      await fetchUserNFTs();
    } catch (err) {
      console.error("Transfer Error:", err);
      throw err; // Re-throw to handle in the component
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background shapes */}
      <div className="hero-shape-1 animate-float"></div>
      <div className="hero-shape-2 animate-float" style={{ animationDelay: "-3s" }}></div>
      
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid z-0"></div>
      
      <Header />
      
      <main className="container mx-auto px-4 pt-8 pb-20 relative z-1">
        <section className="mb-16">
          <div className="max-w-5xl mx-auto">
            <MintSection onMint={mintNFT} isMinting={isMinting} />
          </div>
        </section>
        
        {connected && (
          <section>
            <div className="max-w-6xl mx-auto">
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">Your Collection</h2>
                <p className="text-muted-foreground">
                  {nfts.length > 0
                    ? `You own ${nfts.length} NFT${nfts.length !== 1 ? 's' : ''}`
                    : "Your collection will appear here after minting"}
                </p>
              </div>
              
              <NFTCollection 
                nfts={nfts} 
                isLoading={isLoading} 
                onTransfer={transferNFT} 
              />
            </div>
          </section>
        )}
      </main>
      
      <footer className="py-6 px-4 border-t border-border/20 text-center text-sm text-muted-foreground mt-auto">
        <p>Solana NFT Studio • Running on Devnet</p>
      </footer>
    </div>
  );
};

export default Index;
