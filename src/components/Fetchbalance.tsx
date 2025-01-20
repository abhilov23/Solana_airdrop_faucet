import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { FC, useEffect, useState } from "react";

const Fetchbalance: FC = () => {
  const [balance, setBalance] = useState(0);
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  useEffect(() => {
    const updateBalance = async () => {
      if (!connection || !publicKey) {
        console.error("Wallet not connected or connection unavailable");
      }
 
      try {
        connection.onAccountChange(
          publicKey,
          updatedAccountInfo => {
            setBalance(updatedAccountInfo.lamports / LAMPORTS_PER_SOL);
          },
          "confirmed",
        );
        // Fetch the account balance using the public key
        const accountInfo = await connection.getAccountInfo(publicKey);
 
        if (accountInfo) {
          setBalance(accountInfo.lamports / LAMPORTS_PER_SOL);
        } else {
          throw new Error("Account info not found");
        }
      } catch (error) {
        console.error("Failed to retrieve account info:", error);
      }
    };
 
    updateBalance();
  }, [connection, publicKey]);
 
  return (
    <>
      <span>{publicKey ? `${balance} SOL` : ""}</span>
    </>
  );
};

export default Fetchbalance;