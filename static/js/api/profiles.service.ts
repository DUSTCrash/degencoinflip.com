


import { get, post } from "../utils/http.util";

// const BASE_URL = 'http://localhost:3000';
const BASE_URL = process.env.REACT_APP_API_URL ?? 'https://dev-api.degencoinflip.com/v2';

export const getProfile = async (walletId: any) => {
  const url = `${BASE_URL}/profiles/${walletId}`
  const response = await get(url);
  return response?.payload;
}

export const editProfile = async (walletId: any, profileImageUrl = null, nickname = null, signature = '', Authorization = '') => {
  const url = `${BASE_URL}/profiles/${walletId}`
  const response = await post(url, { signature, profileImageUrl, nickname }, { Authorization });
  return response?.data?.payload;
}

export const connectDiscordProfile = async (code: any, Authorization = '') => {
  const url = `${BASE_URL}/profiles/discord/connect`
  const response = await post(url, { code }, { Authorization });
  return response?.data?.payload;
}