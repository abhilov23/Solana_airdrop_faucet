import { Connection, clusterApiUrl, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';

const Airdrop = ({ token }: { token: number }) => {
  console.log(token)
  const { publicKey } = useWallet(); // Use the public key from the wallet context
  
  const handleAirdrop = async () => {
    console.log(token);
    if (!publicKey) {
      console.error("No public key found. Please connect a wallet first.");
      return;
    }

    try {
      const connection = new Connection(clusterApiUrl('devnet'));
      const airdropSignature = await connection.requestAirdrop(
        publicKey,
        token * LAMPORTS_PER_SOL // Convert SOL to lamports
      );

      // Wait for the airdrop to be confirmed
      await connection.confirmTransaction(airdropSignature);
      console.log('Airdrop successful!');
    } catch (error) {
      console.error('Error requesting airdrop:', error);
    }
  };

  return (
    <div>
      <button onClick={handleAirdrop} className='h-12 px-6 py-2 mb-2 rounded-md bg-transparent text-white hover:bg-purple-500/20 border border-gray-800'>Request Airdrop</button>
    </div>
  );
};

export default Airdrop;