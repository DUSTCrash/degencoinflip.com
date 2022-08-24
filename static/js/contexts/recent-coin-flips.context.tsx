import { DateTime } from 'luxon';
import { createContext, useEffect, useState } from 'react';
import { queryLatestCoinFlips } from '../api/queries.service';

interface RecentCoinFlipsContextValue {
  recentCoinFlips: any[];
  fetch(): void;
}

const RecentCoinFlipsContext = createContext<RecentCoinFlipsContextValue>({
  recentCoinFlips: [],
  fetch() { }
});

const RecentCoinFlipsProvider = (props: any) => {
  const [queryParams] = useState({
    sortBy: '',
    timeFrame: 'today'
  });
  // The observable will be used to set local state, so we also
  // need to use useState.
  const [recentCoinFlips, setRecentCoinFlips] = useState([]);
  // We'll initialize the observable with appState. All subscribers 
  // will have this same initial state.
  // const [observable, setObservableState] = useObservable(recentCoinFlips);

  // useEffect(() => {
  //   const myObservable = observable?.pipe(
  //     // Here is where we'd add RxJs operators to make magic happen.
  //     // https://rxjs-dev.firebaseapp.com/guide/operators
  //   )

  //   myObservable?.subscribe({
  //     next: (v: any) => {
  //       setRecentCoinFlips(v);
  //     }
  //   });

  //   // When the component unmounts we'll unsubscribe from events
  //   return observable?.unsubscribe;
  // }, [observable])


  useEffect(() => {
    fetch();
    // eslint-disable-next-line
  }, [])

  const fetch = async () => {
    const hourAgo = DateTime.utc().minus({ hours: 1 });
    const recentFlips = await queryLatestCoinFlips(hourAgo, queryParams.sortBy, 12);
    // setObservableState(recentFlips);
    setRecentCoinFlips(recentFlips);
  };

  return (
    <RecentCoinFlipsContext.Provider value={{ recentCoinFlips, fetch }}>
      {props.children}
    </RecentCoinFlipsContext.Provider>
  )
};

export { RecentCoinFlipsContext, RecentCoinFlipsProvider };
