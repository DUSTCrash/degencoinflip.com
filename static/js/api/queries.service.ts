


import { CHALLENGES } from "../utils/constants";
import { get } from "../utils/http.util";
// const BASE_URL = 'http://localhost:3000';
const BASE_URL = process.env.REACT_APP_API_URL ?? 'https://dev-api.degencoinflip.com/v2';

export const queryLatestCoinFlips = async (startTime: any, sortBy: string = '', limit: any = 20, Authorization: any = '') => {
  let url = `${BASE_URL}/coinFlips/history?startTime=${startTime}&limit=${limit}`
  if (sortBy?.length) {
    url = `${url}&sortBy=${sortBy}`;
  }
  const response = await get(url, { Authorization });
  return response?.payload;
}

export const queryTopCoinFlips = async (startTime: any, winStreak: any = 2, limit: any = 20, challengeId: any = CHALLENGES[0].id, Authorization: any) => {
  const url = `${BASE_URL}/coinFlips/top?startTime=${startTime}&limit=${limit}&removeDups=true&winStreak=${winStreak}&challengeId=${challengeId}`
  const response = await get(url, { Authorization });
  return response?.payload;
}

export const queryCoinFlipsByWallet = async (
  walletId: any,
  startTime: any,
  endTime: any,
  minBet: any = 0,
  limit: any = 2000,
  Authorization: any = ''
) => {
  const url = `${BASE_URL}/wallets/${walletId}/coinFlips?startTime=${startTime}&endTime=${endTime}&limit=${limit}&minBet=${minBet}`
  const response = await get(url, { Authorization });
  return response?.payload;
}