


import { get, post } from "../utils/http.util";

// const BASE_URL = 'http://localhost:3000';
const BASE_URL = process.env.REACT_APP_API_URL ?? 'https://dev-api.degencoinflip.com/v2';


export const getCoinFlip = async (Authorization: any) => {
  const url = `${BASE_URL}/coinFlips`
  const response = await get(url, { Authorization });
  return response?.payload;
}

export const getCoinFlipById = async (id: any, Authorization: any) => {
  const url = `${BASE_URL}/coinFlips/${id}`;
  const response = await get(url, { Authorization });
  return response?.payload;
}

export const getNonce = async (walletId: any, referral: string, deviceId: string | null = null) => {
  let url = `${BASE_URL}/wallets/${walletId}/nonce`;
  if (referral?.length) {
    url = url + `?referral=${referral}`;
  }
  if (deviceId?.length) {
    url = url + `?deviceId=${deviceId}`;
  }
  const response = await get(url);
  return response?.payload;
}

export const authorize = async (walletId: any, signature: any) => {
  const url = `${BASE_URL}/authorize`
  const { data } = await post(url, { walletId, signature });
  return data?.payload;
}

export const authorizeViaTx = async (walletId: any, signature: any) => {
  const url = `${BASE_URL}/authorize/${walletId}`
  const { data } = await post(url, { signature });
  return data?.payload;
}

export const createCoinFlip = async (coinFlip: any, Authorization: any) => {
  const url = `${BASE_URL}/coinFlips`
  const { data } = await post(url, { ...coinFlip }, { Authorization });
  return data?.payload;
}