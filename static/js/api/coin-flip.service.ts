

import { post } from "../utils/http.util";
import { randoSig } from "../utils/helpers";

const BASE_URL = process.env.REACT_APP_API_URL ?? 'https://dev-api.degencoinflip.com/v2';

export const processCoinFlip = async (coinFlip: any, Authorization: any) => {
    const url = `${BASE_URL}/coinFlips/${coinFlip?.signature ?? randoSig()}`
    const { data } = await post(url, { ...coinFlip }, { Authorization });
    return data?.payload;
}

export const initCoinFlip = async (coinFlip: any, Authorization: any) => {
    const url = `${BASE_URL}/coinFlips`
    const { data } = await post(url, { ...coinFlip }, { Authorization });
    return data?.payload;
}


export const processCoinFlipWithMemo = async (id: any, signature: any, Authorization: any) => {
    const url = `${BASE_URL}/coinFlips/${id}`
    const { data } = await post(url, { signature }, { Authorization });
    return data?.payload;
}