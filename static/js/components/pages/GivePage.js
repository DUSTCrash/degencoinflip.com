import giveWorkflowSteps from "../../workflows/donateSol/index";
import { constants } from "../../utils/constants"
import { runWorkflow } from "../../utils/workflow";
import { useContext, useEffect, useState } from "react";
import { PostModal } from "../modals/PostModal";
import { getBalance } from "../../api-smart-contracts/dcf";
import { DonorsTabs } from "../containers/DonorsTabs";
import { ProgressBar } from "react-bootstrap";
import { FUNDS_ID } from "../../utils/program-constants";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { CommunityContext } from "../../contexts/community.context";
import { Link } from "react-router-dom";
import { payload as Donors } from './GivePageDonors.json';
import { payload as Sponsors } from './GivePageSponsors.json';

const PREV_DONATED = 140;

export const GivePage = ({ wallet, style, profileImageUrl, nickname, onConfetti }) => {
    const { community } = useContext(CommunityContext);


    const [price, setPrice] = useState(0.05);
    const [tx, setTx] = useState(null);
    const [selectedTab, selectTab] = useState("SPONSOR");
    const [donationBalance, setDonationBalance] = useState(0);

    const [sponsorPosts, setSponsorPosts] = useState([]);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if (!sponsorPosts?.length) {
            // const ps = await getDonationPosts("SPONSOR");
            const ps = Sponsors;
            setSponsorPosts(ps);
        }
        if (!donationBalance) {
            fetchDonationBalance();
        }
    // eslint-disable-next-line
    }, []);

    useEffect(() => {
        fetchDonationBalance();
        // eslint-disable-next-line
    }, [tx]);

    const fetchDonationBalance = async () => {
        const bal = await getBalance(wallet, FUNDS_ID);
        setDonationBalance(bal);
    }

    const handleSelectDonorTab = async (newPost) => {
        selectTab("DONOR");
        let ps = posts;
        if (!ps?.length) {
            // ps = await getDonationPosts("DONOR");
            ps = Donors;
        }
        if (newPost !== null) {
            ps = [newPost, ...ps];
        }
        setPosts(ps);
    };
    const handleSelectSponsorTab = async () => {
        selectTab("SPONSOR");
    };

    const [loading, setLoading] = useState(false);
    const [showPostModal, setShowPostModal] = useState(false);
    const handlePostClose = () => setShowPostModal(false);
    // const handlePostOpen = () => setShowPostModal(true);

    const handleChangePrice = (e) => {
        e.preventDefault(); // prevent the default action
        setPrice(e.target.value); // set name to e.target.value (event)
    }

    const give = async () => {
        setLoading(true);
        const workflowParams = {
            give: {
                amount: price
            }
        };
        try {
            const response = await runWorkflow(giveWorkflowSteps, workflowParams, wallet);
            const {
                give: {
                    tx
                }
            } = response;
            setTx(tx);
            // if (price >= 0.05) {
            //     handlePostOpen();
            // } else {
            recordDonation('', '', true, tx);
            // }
        }
        catch (err) {
            setLoading(false);
        }
    }

    const recordDonation = async (message, twitter, hideAmount, transaction = tx) => {
        // const nonceResponse = await getNonce(wallet?.publicKey?.toString());
        // const nonce = nonceResponse?.nonce;
        // const signedMessage = await signMessage(nonce);
        // const { post, donation } = await donate(
        //     wallet?.publicKey?.toString(),
        //     price,
        //     transaction,
        //     message,
        //     twitter,
        //     hideAmount,
        //     profileImageUrl,
        //     nickname,
        //     authToken
        // );
        // handleSelectDonorTab(post);
        // handlePostClose();
        onConfetti();
        setLoading(false);
    }

    return (
        <>
            {
                showPostModal &&
                <PostModal
                    show={showPostModal}
                    amount={price}
                    tx={tx}
                    wallet={wallet}
                    profileImageUrl={profileImageUrl}
                    nickname={nickname}
                    onClose={() => handlePostClose()}
                    onDonate={({ twitter, message, hideAmount }) => recordDonation(message, twitter, hideAmount)}
                    styleCss={style}
                />
            }
            <div className="play step2">
                <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between pb-3 py-sm-3 mb-4 border-bottom">
                    <Link to={`/${community?.slug}`} className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-decoration-none">
                        {
                            wallet?.connected &&
                            <><span className="fas fa-chevron-left me-2"></span> GO HOME</>
                        }
                    </Link>
                    <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                        <li><h2>DONATE TO UKRAINE</h2></li>
                        <img src="https://flagicons.lipis.dev/flags/4x3/ua.svg" alt="ukraine" height="32px" className="ms-2"></img>
                    </ul>
                    <div className="col-md-3 text-end">
                        {/* <img src="https://flagicons.lipis.dev/flags/4x3/ua.svg" height="48px" className=""></img> */}
                    </div>
                </header>
                <h6 className="my-sm-5">"Pay tribute to the coin gods for good karma."</h6>
                <div className="bountiful-container">
                    <img className="bountiful-logo" src="https://i.imgur.com/3e4TfaB.png" alt="bountiful"></img>
                </div>
                <div className="mt-3">
                    <span className="d-inline-flex">
                        <h3>I'LL GIVE<input className="inp mx-2" placeholder="0.05"
                            value={price}
                            onChange={handleChangePrice}
                        />SOL</h3>
                    </span>
                    <div>
                        {
                            !wallet.connected &&
                            <WalletMultiButton style={{ marginLeft: 'auto', marginRight: 'auto' }} />
                        }
                        {
                            wallet.connected &&
                            <>
                                {
                                    loading &&
                                    <div className="fa-2x my-3">
                                        <i className="fas fa-circle-notch fa-spin"></i>
                                    </div>
                                }
                                {
                                    !loading &&
                                    <>
                                        <div className="d-inline-block">
                                            <img onClick={() => price > 0 && give()} className="cursor-pointer give-button mt-3" src={constants.BUTTONS.Donate} alt="double or nothing" width="100%" height="100%" />
                                            <ProgressBar animated className={"h-1rem my-3 rounded-0 rounded border-start border-end border border-sm " + (style === "light" ? 'bg-light text-dark' : 'bg-dark text-light')} variant={style === "light" ? "dark" : "light"} now={donationBalance + PREV_DONATED} max={200} min={0} label={`${(PREV_DONATED + donationBalance)?.toFixed(2)}/200 ◎`} />
                                        </div> {
                                            tx?.length > 0 &&
                                            <h6 className="mt-2">
                                                <a href={`https://solscan.io/tx/${tx}`} target="_blank" rel="noopener noreferrer">View on Solscan</a>
                                                <a href={`https://solscan.io/tx/${tx}`} target="_blank" rel="noopener noreferrer"><i className="ms-2 fa-solid fa-sm fa-up-right-from-square"></i></a>
                                            </h6>
                                        }
                                    </>
                                }
                            </>
                        }
                    </div>
                    <h5 className="my-4">Together we can be degens for good. We've donated over $18,000. <br />100% of all donations will go to helping our friends in&nbsp;
                        <a href="https://donate.thedigital.gov.ua/" target="_blank" rel="noopener noreferrer">Ukraine</a>&nbsp;
                        <a href="https://donate.thedigital.gov.ua/" target="_blank" rel="noopener noreferrer"><i className="fa-solid fa-sm fa-up-right-from-square"></i></a>&nbsp;
                        <a href="https://donate.thedigital.gov.ua/" target="_blank" rel="noopener noreferrer"><img src="https://flagicons.lipis.dev/flags/4x3/ua.svg" alt="ukraine flag" height="17px" className="mb-1"></img></a>
                        .
                    </h5>
                </div>
                <ul className="nav nav-tabs mt-5">
                    <li className="nav-item">
                        <a className={"nav-link cursor-pointer" + (selectedTab === "SPONSOR" ? " active" : " text-secondary")} aria-current="page" href="#!" onClick={ev => { ev.preventDefault(); handleSelectSponsorTab() }}><h4 className="mb-0">SPONSORS</h4></a>
                    </li>
                    <li className="nav-item">
                        <a className={"nav-link cursor-pointer" + (selectedTab === "DONOR" ? " active" : " text-secondary")} href="#!" onClick={ev => { ev.preventDefault(); handleSelectDonorTab() }}><h4 className="mb-0">DONORS<small> (0.05 & UP)</small></h4></a>
                    </li>
                </ul>
                {
                    selectedTab === "SPONSOR" && sponsorPosts?.length > 0 &&
                    <DonorsTabs
                        posts={sponsorPosts}
                        style={style}>
                    </DonorsTabs>
                }
                {
                    selectedTab !== "SPONSOR" && posts?.length > 0 &&
                    <DonorsTabs
                        posts={posts}
                        style={style}>
                    </DonorsTabs>
                }
            </div>
        </>
    )
}