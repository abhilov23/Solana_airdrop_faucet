import solanaLogo from "./images/solanaLogo.svg";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { useMemo, useState } from "react";
import "@solana/wallet-adapter-react-ui/styles.css";
import Airdrop from "./components/Airdrop";
import Fetchbalance from "./components/Fetchbalance";

function App() {
  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);
  const [amount, setAmount] = useState<number>(1);

  return (
    <div className="bg-[#0e0c0e] h-screen w-screen flex flex-col">
      <div className="text-center pt-8">
        <img
          src={solanaLogo}
          alt="Solana Logo"
          className="h-10 mx-auto mb-2"
        />
        <p className="text-2xl font-bold text-white tracking-wide">
          Welcome to Solana Devnet Faucet - Get Test SOL for Development
        </p>
      </div>
      <div className="flex justify-center items-center flex-grow">
        <div className="flex items-center justify-center h-2/3 w-4/5 border border-gray-800 rounded-lg">
          <ConnectionProvider endpoint="https://api.devnet.solana.com">
            <WalletProvider wallets={wallets} autoConnect>
              <WalletModalProvider>
                <div className="flex flex-col items-center w-3/4">
                  <div className="flex justify-between items-center mb-5 w-full">
                    <div>
                      <h3 className="text-2xl font-bold text-white">Request Airdrop</h3>
                      <h6 className="text-gray-400">Maximum of 5 requests per hour</h6>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"></path>
                        <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"></path>
                      </svg>
                      <WalletMultiButton/>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mb-5 w-full">
                    <h3 className="text-2xl font-bold text-white">Balance:</h3>
                    <div>
                      <h1 className="px-2 py-1 my-2 font-bold text-2xl text-center text-white">
                        <Fetchbalance />
                      </h1>
                    </div>
                  </div>

                  <div className="flex flex-col justify-center items-center w-full">
                    <input
                      className="border-gray-800 m-2 text-white flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      id="amount"
                      placeholder="Enter amount in SOL" 
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value))}
                    />
                    <Airdrop token={amount} />
                  </div>
                </div>
              </WalletModalProvider>
            </WalletProvider>
          </ConnectionProvider>
        </div>
      </div>
    </div>
  );
}

export default App;