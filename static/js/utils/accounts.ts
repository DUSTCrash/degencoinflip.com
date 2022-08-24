import * as anchor from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";
import { DEGENERATE, HOUSE_STATE, DEGEN_COIN_FLIP_PROGRAM_ID, HOUSE_TREASURY, REWARDS } from "./program-constants";
import moize from 'moize';

export const getDegenCoinFlipHouseTreasury = moize(async (
  initializer: anchor.web3.PublicKey,
  authority: anchor.web3.PublicKey,
): Promise<[PublicKey, number]> => {
  return await anchor.web3.PublicKey.findProgramAddress(
    [Buffer.from(HOUSE_TREASURY), initializer.toBuffer(), authority.toBuffer()],
    DEGEN_COIN_FLIP_PROGRAM_ID,
  );
}, { isPromise: true });

export const getDegenCoinFlipHouseState = moize( async (
  initializer: anchor.web3.PublicKey,
  authority: anchor.web3.PublicKey,
): Promise<[PublicKey, number]> => {
  return await anchor.web3.PublicKey.findProgramAddress(
    [Buffer.from(HOUSE_STATE), initializer.toBuffer(), authority.toBuffer()],
    DEGEN_COIN_FLIP_PROGRAM_ID,
  );
}, { isPromise: true });


export const getDegenCoinFlipDegenerateAccount = moize( async (
  degenerate: anchor.web3.PublicKey,
  initializer: anchor.web3.PublicKey,
  authority: anchor.web3.PublicKey,
): Promise<[PublicKey, number]> => {
  return await anchor.web3.PublicKey.findProgramAddress(
    [Buffer.from(DEGENERATE), degenerate.toBuffer(), initializer.toBuffer(), authority.toBuffer()],
    DEGEN_COIN_FLIP_PROGRAM_ID,
  );
}, { isPromise: true });


export const getDegenCoinFlipRewardsAccount = moize( async (
  degenerate: anchor.web3.PublicKey,
  initializer: anchor.web3.PublicKey,
  authority: anchor.web3.PublicKey,
): Promise<[PublicKey, number]> => {
  return await anchor.web3.PublicKey.findProgramAddress(
    [Buffer.from(REWARDS), degenerate.toBuffer(), initializer.toBuffer(), authority.toBuffer()],
    DEGEN_COIN_FLIP_PROGRAM_ID,
  );
}, { isPromise: true });
