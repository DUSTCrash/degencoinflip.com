import { get } from "../utils/http.util";

const BASE_URL = process.env.REACT_APP_API_URL ?? 'https://dev-api.degencoinflip.com/v2';

export const getCommunity = async (slug: any) => {
  const url = `${BASE_URL}/communities/${slug}`
  const response = await get(url);
  return response?.payload;
};
