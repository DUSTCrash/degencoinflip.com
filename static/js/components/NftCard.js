import { useState, useEffect } from "react";
import useSWR from "swr";
import { EyeOffIcon } from "@heroicons/react/outline";

import { fetcher } from "../utils/fetcher";

export const NftCard = ({ details, onSelect, onTokenDetailsFetched = () => { }, selected }) => {
  const [fallbackImage, setFallbackImage] = useState(false);
  const { uri } = details?.data ?? {};
  const { data, error } = useSWR(
    uri,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  useEffect(() => {
    if (!error && !!data) {
      onTokenDetailsFetched(data);
    }
    // eslint-disable-next-line
  }, [data, error]);

  const onImageError = () => setFallbackImage(true);
  const { image } = data ?? {};

  return (
    <div className="col-sm-4 pl-0 cursor-pointer" onClick={async () => onSelect({ ...details, data: { ...details.data, metadata: data } })}>
      {!fallbackImage || !error ? (
        <img
          src={image}
          onError={onImageError}
          className={selected ? 'card-img-top mb-3 border border-white' : "card-img-top mb-3"}
          alt="nft-card"
        />
      ) : (
        <div className="card-img-top mb-3">
          <EyeOffIcon className="h-16 w-16 text-white-500" />
        </div>
      )}
    </div>
  );
};