


import { get, post } from "../utils/http.util";

const BASE_URL = 'https://us-central1-degencoinflip.cloudfunctions.net/';
const DEFAULT_PROMO_ID = '2433100d-59d9-4434-9bbb-cd658cf5ac0f';

export const getJackpotPromotion = async () => {
    const url = `${BASE_URL}/promos/jackpots`
    const response = await get(url);
    return response;
}

export const getJackpotEligibility = async (walletId: any, promoId: string = DEFAULT_PROMO_ID) => {
    const url = `${BASE_URL}promos/check-eligibility?clientId=dcf`
    const response = await post(url, { walletId, promoId });
    return response?.data;
}

export const getCoinFlipWLReward = async (flipId: any) => {
    const url = `${BASE_URL}whitelist?flipId=${flipId}`
    const response = await get(url);
    return response;
}

export const getCoinFlipWLRewardCount = async (walletId: any) => {
    const url = `${BASE_URL}whitelist?walletId=${walletId}`
    const response = await get(url);
    return response;
}

export const getCoinFlipPaymentKickback = async (flipId: any) => {
    const url = `${BASE_URL}payment/${flipId}`
    const response = await get(url);
    return response;
}

export const getRiskFreeFlip = async (walletId: any) => {
    const url = `${BASE_URL}risk-free-flips/${walletId}`
    const response = await get(url);
    return response;
}