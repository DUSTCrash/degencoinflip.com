import { Idl, Program, BN, web3 } from '@project-serum/anchor';
import { getSolanaProvider } from "../../services/solana";
import idl from './op_bountiful.json';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { FUNDS_ID } from '../../utils/program-constants';
import moize from 'moize';
import { ERRORS } from '../../utils/constants';

const {
    SystemProgram,
    PublicKey,
} = web3;

let programID: any;
let program: any;
let provider: any;

const init = moize((wallet: any = null) => {
    if (program) return;
    programID = new PublicKey(idl.metadata.address);
    provider = getSolanaProvider(wallet);
    program = new Program(idl as Idl, programID, provider);
});

export const handler = async (event: any, wallet: any) => {
    init(wallet);
    const amount = event?.give?.amount;
    let tx;
    try {
        tx = await program.rpc.give(
            new BN(amount * LAMPORTS_PER_SOL),
            {
                accounts: {
                    payer: provider.wallet.publicKey,
                    fund: FUNDS_ID,
                    systemProgram: SystemProgram.programId
                }
            }
        );
    }
    catch (e) {
        throw ERRORS.DONATION_FAILED;
    }

    return {
        ...event,
        give: {
            amount,
            tx
        }
    };
};
