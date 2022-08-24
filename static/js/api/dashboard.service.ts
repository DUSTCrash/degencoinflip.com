

import { get } from "../utils/http.util";
import { DateTime } from "luxon";

const BASE_URL = process.env.REACT_APP_API_URL ?? 'https://dev-api.degencoinflip.com/v2';

export const getTopGains = async (startDate = DateTime.utc().startOf('day'), endDate = DateTime.utc().endOf('day')) => {
    const url = `${BASE_URL}/dashboard/top-gains?startTime=${startDate.toISO()}&endDate=${endDate.toISO()}&limit=10`
    const response = await get(url);
    return response?.payload;
};
