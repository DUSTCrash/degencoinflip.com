import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { getSolanaProvider } from "./solana"
export const AUTH_WALLET_ID = new PublicKey('6SyT5GFE1wzRfr3je914PTWrkfjUtKw6tEFyHkMFsZao');

const AUTH_AMOUNT = 0.00001;

export const authTransfer = async (wallet: any) => {
    const provider = getSolanaProvider(wallet);

    const tx = new Transaction();
    tx.add(
        SystemProgram.transfer({
            fromPubkey: provider.wallet.publicKey,
            toPubkey: AUTH_WALLET_ID,
            lamports: +(AUTH_AMOUNT * LAMPORTS_PER_SOL).toFixed(0) //Investing 1 SOL. Remember 1 Lamport = 10^-9 SOL.
        }),
    );

    return await provider.send(tx);
};
