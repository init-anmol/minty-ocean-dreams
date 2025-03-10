
import React from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';

const Header = () => {
  const { connected } = useWallet();

  return (
    <header className="w-full py-4 px-6 md:px-8 flex items-center justify-between relative z-10">
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-xl mr-3">
          S
        </div>
        <h1 className="text-2xl font-semibold">Solana NFT Studio</h1>
      </div>
      
      <nav className="flex items-center space-x-4">
        <WalletMultiButton />
      </nav>
    </header>
  );
};

export default Header;
