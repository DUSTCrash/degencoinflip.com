import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { getPhantomWallet, getSlopeWallet, getSolflareWallet, getSolletWallet } from '@solana/wallet-adapter-wallets';
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import LayoutContainer from "./layout/layout";
import { Home } from "./pages/home/home";
import { UkrainePage } from "./pages/ukraine/ukraine";
import { BugBountyPage } from "./components/pages/BugBountyPage";
import { DiscordCallback } from "./pages/discord-callback/discord-callback";
import { JackpotRoulettePage } from "./pages/jackpot-roulette/jackpot-roulette";
import { DiscordLink } from "./pages/discord-link/discord-link";

require('@solana/wallet-adapter-react-ui/styles.css');

const wallets = [getPhantomWallet(), getSlopeWallet(), getSolflareWallet(), getSolletWallet()];

const App = () => (
    <ConnectionProvider endpoint="http://127.0.0.1:8899">
        <WalletProvider wallets={wallets} autoConnect>
            <WalletModalProvider>
                <BrowserRouter>
                    <Routes>
                        <Route element={<LayoutContainer />}>
                            <Route path="/" element={<Home />} />
                            <Route path="/ukraine" element={<UkrainePage />} />
                            <Route path="/jackpot" element={<JackpotRoulettePage />} />
                            <Route path="/bug-bounty" element={<BugBountyPage />} />
                            <Route path="/discord" element={<DiscordLink />} />
                            <Route path="/discord/oauth" element={<DiscordCallback />} />
                            <Route path=":referral" element={<Home />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </WalletModalProvider>
        </WalletProvider>
    </ConnectionProvider>
);

export default App;