import { useEffect, useState } from "react";
import useSWR from "swr";
import { SocialLinks } from "../../components/SocialLink";
import { fetcher } from "../../utils/fetcher";

interface SocialProps {
    social: JSX.Element | any;
}

const uri = "https://api.solscan.io/chaininfo";
const SLOW_INTERVAL = 42000;

const InfoBar = ({ social }: SocialProps) => {
    const [tps, setTps] = useState(0);
    const { data, error } = useSWR(
        uri,
        fetcher,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            refreshInterval: SLOW_INTERVAL
        }
    );

    useEffect(() => {
        if (!error && !!data) {
            setTps(data?.data?.networkInfo?.tps ?? -1);
        }
    }, [data, error]);
    return (
        <div className="social-icons-bottom-left">
            <div className="d-flex flex-row flex-sm-column justify-content-start align-items-center h-100">
                <div className="mb-3 mb-lg-0 d-flex flex-column shortcut-row text-center text-lg-start">
                    <small className={tps < 1500 ? "text-danger" : ""}>
                        <SocialLinks social={social}></SocialLinks>
                        Solana Network: {tps.toFixed(0)} TPS {tps < 1500 ? <i className="fa fa-exclamation-triangle" aria-hidden="true"></i> : <></>}
                    </small>
                </div>
            </div>
        </div>
    );
}
export default InfoBar;