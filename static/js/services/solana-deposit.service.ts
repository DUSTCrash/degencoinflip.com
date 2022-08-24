import { Idl, Program, BN, web3 } from '@project-serum/anchor';
import { getSolanaProvider } from "../services/solana";
import idl from '../interfaces/dcf.idl.json';
import { LAMPORTS_PER_SOL, SYSVAR_INSTRUCTIONS_PUBKEY, TransactionInstruction } from '@solana/web3.js';
import { getDegenCoinFlipDegenerateAccount, getDegenCoinFlipHouseState, getDegenCoinFlipHouseTreasury, getDegenCoinFlipRewardsAccount } from '../utils/accounts';
import { INITIALIZER_ID, AUTHORITY_ID, MEMO_ID } from '../utils/program-constants';
import moize from 'moize';
import { ERRORS } from '../utils/constants';
import { memoize } from '../utils/helpers';

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

export const depositSol = async (wallet: any, amount: any, id?: any, side?: any) => {
  init(wallet);

  const [_house_treasury_account_pda] = await getDegenCoinFlipHouseTreasury(
    INITIALIZER_ID, AUTHORITY_ID
  );

  const [_house_state_account_pda] = await getDegenCoinFlipHouseState(
    INITIALIZER_ID, AUTHORITY_ID
  );

  const [_degenerate_account_pda] = await getDegenCoinFlipDegenerateAccount(
    provider.wallet.publicKey, INITIALIZER_ID, AUTHORITY_ID
  );

  const [_rewards_account_pda] = await getDegenCoinFlipRewardsAccount(
    provider.wallet.publicKey, INITIALIZER_ID, AUTHORITY_ID
  );

  let tx;
  try {
    tx = await program.rpc.goDegen(
      new BN(amount * LAMPORTS_PER_SOL),
      {
        accounts: {
          degenerate: provider.wallet.publicKey,
          initializer: INITIALIZER_ID,
          authority: AUTHORITY_ID,
          houseTreasury: _house_treasury_account_pda,
          houseState: _house_state_account_pda,
          degenerateAccount: _degenerate_account_pda,
          rewardsAccount: _rewards_account_pda,
          systemProgram: SystemProgram.programId,
          instructions: SYSVAR_INSTRUCTIONS_PUBKEY
        },
        instructions: [
          new TransactionInstruction({
            keys: [{ pubkey: provider.wallet.publicKey, isSigner: true, isWritable: true }],
            data: memoize(id, amount, side),
            programId: MEMO_ID
          })
        ]
      }
    );
  }
  catch (e) {
    throw ERRORS.DEPOSIT_FAILED;
  }

  return tx;
};