import { DateTime } from 'luxon';
import { createContext, useState } from 'react';
import { queryLatestCoinFlips } from '../api/queries.service';

interface TopCoinFlipsContextValue {
  topCoinFlips: any[];
  fetchTop(): void;
}

const TopCoinFlipsContext = createContext<TopCoinFlipsContextValue>({
  topCoinFlips: [],
  fetchTop() { }
});

const TopCoinFlipsProvider = (props: any) => {
  const [queryParams] = useState({
    sortBy: 'WIN_STREAK',
    timeFrame: 'today'
  });
  const [topCoinFlips, setTopCoinFlips] = useState([]);

  const fetchTop = async () => {
    const hourAgo = DateTime.utc().minus({ days: 1 });
    const coinFlips = await queryLatestCoinFlips(hourAgo, queryParams.sortBy, 42);
    let cleanedTopFlips: any = [...new Map(coinFlips.slice().reverse().map((v: any) => [v.walletId, v])).values()].reverse();
    setTopCoinFlips(cleanedTopFlips.sort((a: any, b: any) => b.winStreak - a.winStreak).slice(0, 12));
  };

  return (
    <TopCoinFlipsContext.Provider value={{ topCoinFlips, fetchTop }}>
      {props.children}
    </TopCoinFlipsContext.Provider>
  );
};

export { TopCoinFlipsContext, TopCoinFlipsProvider };
