import moize from 'moize';
import { Idl, Program, BN, web3 } from '@project-serum/anchor';
import { LAMPORTS_PER_SOL, SYSVAR_INSTRUCTIONS_PUBKEY, TransactionInstruction } from '@solana/web3.js';

import idl from '../interfaces/dcf.idl.json';
import { getSolanaProvider } from "../services/solana";
import { INITIALIZER_ID, AUTHORITY_ID, MEMO_ID } from '../utils/program-constants';

import {
  getDegenCoinFlipDegenerateAccount,
  getDegenCoinFlipHouseState,
  getDegenCoinFlipHouseTreasury,
  getDegenCoinFlipRewardsAccount
} from '../utils/accounts';
import { memoize } from '../utils/helpers';

const {
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
  PublicKey,
} = web3;

let programID: any;
let program: any;
let provider: any;

const init = moize((wallet: any = null, commitment = "processed") => {
  programID = new PublicKey(idl.metadata.address);
  provider = getSolanaProvider(wallet, commitment);
  program = new Program(idl as Idl, programID, provider);
});

const getProvider = moize(() => {
  if ("solana" in window) {
    const anyWindow: any = window;
    const provider = anyWindow.solana;
    if (provider.isPhantom && provider.isConnected) {
      return provider;
    }
  }
  if ("solflare" in window) {
    const anyWindow: any = window;
    const provider = anyWindow.solflare;
    if (provider.isSolflare && provider.isConnected) {
      return provider;
    }
  }
  window.open("https://phantom.app/", "_blank", "noopener,noreferrer");
});

export const signMessage = async (nonce: string) => {
  const message = `I am signing my one-time nonce: ${nonce}`;
  const provider = getProvider();
  const data = new TextEncoder().encode(message);
  try {
    const signedMessage = await provider?.signMessage(data);
    return signedMessage;
  } catch (err) {
    console.warn(err);
  }
};

export const initDegeneracy = async (wallet: any = null, amount: any) => {
  init(wallet);

  const [_house_treasury_account_pda] = await getDegenCoinFlipHouseTreasury(
    INITIALIZER_ID, AUTHORITY_ID
  );

  const [_house_state_account_pda] = await getDegenCoinFlipHouseState(
    INITIALIZER_ID, AUTHORITY_ID
  );

  try {
    await program.rpc.genesis(
      new BN(amount * LAMPORTS_PER_SOL),
      {
        accounts: {
          initializer: provider.wallet.publicKey,
          authority: AUTHORITY_ID,
          houseTreasury: _house_treasury_account_pda,
          houseState: _house_state_account_pda,
          systemProgram: SystemProgram.programId,
          rent: SYSVAR_RENT_PUBKEY
        }
      }
    );
  }
  catch (er) {
    console.log(er);
  }

  const houseAmount = await provider.connection.getBalance(_house_treasury_account_pda);
  return houseAmount;
};

export const getRewards = async (wallet: any = null, id: any, amount: any, side: any) => {
  init(wallet, "processed");

  const [_house_state_account_pda] = await getDegenCoinFlipHouseState(
    INITIALIZER_ID, AUTHORITY_ID
  );

  const [_rewards_account_pda] = await getDegenCoinFlipRewardsAccount(
    provider.wallet.publicKey, INITIALIZER_ID, AUTHORITY_ID
  );

  await program.rpc.sendRewards(
    {
      accounts: {
        degenerate: provider.wallet.publicKey,
        initializer: INITIALIZER_ID,
        authority: AUTHORITY_ID,
        houseState: _house_state_account_pda,
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
};

export const rewardExists = async (wallet: any) => {
  init(wallet);

  const [_rewards_account_pda] = await getDegenCoinFlipRewardsAccount(
    provider.wallet.publicKey, INITIALIZER_ID, AUTHORITY_ID
  );
  const rewardsAmount = await provider.connection.getBalance(_rewards_account_pda, "processed");
  return rewardsAmount > 0;
}


export const rewardExistsById = async (walletId: any) => {
  init();

  const [_rewards_account_pda] = await getDegenCoinFlipRewardsAccount(
    new PublicKey(walletId), INITIALIZER_ID, AUTHORITY_ID
  );
  const rewardsAmount = await provider.connection.getBalance(_rewards_account_pda, "processed");
  return rewardsAmount > 0;
}

export const enableMoreDegeneracy = async (wallet: any = null, amount: any) => {
  init(wallet);

  const [_house_treasury_account_pda] = await getDegenCoinFlipHouseTreasury(
    INITIALIZER_ID, AUTHORITY_ID
  );

  const [_house_state_account_pda] = await getDegenCoinFlipHouseState(
    INITIALIZER_ID, AUTHORITY_ID
  );

  await program.rpc.boost(
    new BN(amount * LAMPORTS_PER_SOL),
    {
      accounts: {
        initializer: INITIALIZER_ID,
        authority: AUTHORITY_ID,
        payer: provider?.wallet?.publicKey,
        houseTreasury: _house_treasury_account_pda,
        houseState: _house_state_account_pda,
        systemProgram: SystemProgram.programId,
        rent: SYSVAR_RENT_PUBKEY
      }
    }
  )
};

export const getCurrentBalance = async (wallet: any) => {
  init(wallet);
  const balance = await provider.connection.getBalance(provider.wallet.publicKey, "processed");
  return balance / LAMPORTS_PER_SOL;
}

export const getBalance = async (wallet: any, accountId: any) => {
  init(wallet);
  const balance = await provider.connection.getBalance(accountId, "processed");
  return balance / LAMPORTS_PER_SOL;
}

export const getDegenerateAccountBalance = async (wallet: any) => {
  init(wallet);
  const [_degenerate_account_pda] = await getDegenCoinFlipDegenerateAccount(
    provider.wallet.publicKey, INITIALIZER_ID, AUTHORITY_ID
  );
  const balance = await provider.connection.getBalance(_degenerate_account_pda, "processed");
  return balance / LAMPORTS_PER_SOL;
}
