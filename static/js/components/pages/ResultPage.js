import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useEffect, useState } from "react";
import { ProgressBar } from "react-bootstrap";
import { getDegenerateAccountBalance, rewardExists } from "../../api-smart-contracts/dcf";
import { useInterval } from "../../hooks/useInterval";
import { constants } from "../../utils/constants";
import { timeAgo } from "../../utils/dates";
import { FullScreenImageModal } from "../modals/FullScreenImageModal";

const constantsMsgs = {
    PROCESSING_MSG: "SOLANA IS PROCESSING YOUR FLIP",
    RUGGED_MSG: "RUGGING YOU ON-CHAIN",
    DOUBLED_MSG: "DOUBLING YOUR SOL ON-CHAIN",
    STILL_WORKING_MSG: "SOLANA STILL WORKING"
};

const HEADS = "H";

const getCoinLogo = (winner, coinHeadsImageUrl, coinTailsImageUrl) => {
    if (winner === HEADS) {
        return coinHeadsImageUrl;
    } else {
        return coinTailsImageUrl;
    }
};

const PleaseWaitButton = ({ setShowPleaseWaitButton, isWinner }) => {
    const MAX = 15;
    const [counter, setCounter] = useState(0);
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (counter > MAX + 5) {
                setShowPleaseWaitButton(false);
            }
            setCounter(1 + counter);
        }, 100);

        return () => {
            clearTimeout(timeout);
        };
        // eslint-disable-next-line
    }, [counter]);

    return (
        <>
            <h5 className={"mt-2 fst-italic " + (isWinner ? "text-success" : "text-danger")}>{constantsMsgs.PROCESSING_MSG}<span className="dot dot1">.</span><span className="dot dot2">.</span><span className="dot dot3">.</span></h5>
            <img src={constants.BUTTONS.PleaseWait} alt="please wait..." width="100%" height="100%" />
            <ProgressBar animated className="rounded-0 mt-3" now={counter} max={MAX} min={0} />
        </>

    )
}

const RewardsButton = ({ wallet, buttonClaimReward, buttonConstants, rewardLoading, claimRewards, showPleaseWaitButton, setShowPleaseWaitButton, coinFlipId }) => {
    const [awaiting, setWaiting] = useState(true);
    const [message, setMessage] = useState(constantsMsgs.DOUBLED_MSG);
    useInterval(async () => {
        if (wallet?.publicKey?.toString() && awaiting) {
            const exists = await rewardExists(wallet);
            if (exists) {
                setWaiting(false);
            }
        }
    }, 3000);
    useInterval(async () => {
        if (message === constantsMsgs.DOUBLED_MSG) {
            setMessage(constantsMsgs.STILL_WORKING_MSG);
        }
        else if (message === constantsMsgs.STILL_WORKING_MSG) {
            setMessage(constantsMsgs.PROCESSING_MSG)
        }
        else {
            setMessage(constantsMsgs.DOUBLED_MSG)
        }

    }, 8000);


    if (!awaiting && !rewardLoading) {
        if (wallet.connected) {
            return (
                <>
                    <img onClick={() => claimRewards()} className="cursor-pointer double-button" src={buttonClaimReward ?? buttonConstants.ClaimReward} alt="claim reward" width="100%" height="100%" />
                </>
            );
        } else {
            return (
                <WalletMultiButton style={{ marginLeft: 'auto', marginRight: 'auto' }} />
            )
        }
    }

    else if (awaiting) {
        return (
            <>
                <h5 className="mt-2 text-success fst-italic">
                    {message}
                    <span className="dot dot1">.</span><span className="dot dot2">.</span><span className="dot dot3">.</span>
                    {message === constantsMsgs.STILL_WORKING_MSG && <img src="https://i.imgur.com/1pmDwMC.gif" alt="pepe" className="img-fluid mb-1" style={{ maxWidth: '24px' }} />}
                </h5>
                <img src={constants.BUTTONS.PleaseWait} alt="please wait..." width="100%" height="100%" />
                <ProgressBar animated className="rounded-0 mt-3" now={100} max={100} min={0} />
            </>
        );
    }

    return (
        <>
            <div className="d-flex justify-content-center py-4">
                <div className="la-ball-8bits">
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                </div>
            </div>
        </>
    );
}

const TryAgainButton = ({ wallet, buttonDoubleOrNothing, buttonConstants, onClickTryAgain }) => {
    const [awaiting, setWaiting] = useState(true);
    const [message, setMessage] = useState(constantsMsgs.RUGGED_MSG);

    useInterval(async () => {
        if (wallet?.publicKey?.toString() && awaiting) {
            const degenBalance = await getDegenerateAccountBalance(wallet);
            if (!degenBalance) {
                setWaiting(false);
            }
        }
    }, 3000);

    useInterval(async () => {
        if (message === constantsMsgs.RUGGED_MSG) {
            setMessage(constantsMsgs.STILL_WORKING_MSG);
        }
        else if (message === constantsMsgs.STILL_WORKING_MSG) {
            setMessage(constantsMsgs.PROCESSING_MSG)
        }
        else {
            setMessage(constantsMsgs.RUGGED_MSG)
        }

    }, 8000);

    if (awaiting) {
        return (
            <>
                <h5 className="mt-2 text-danger fst-italic">
                    {message}
                    <span className="dot dot1">.</span><span className="dot dot2">.</span><span className="dot dot3">.</span>
                    {message === constantsMsgs.STILL_WORKING_MSG && <img src="https://i.imgur.com/1pmDwMC.gif" alt="pepe" className="img-fluid mb-1" style={{ maxWidth: '24px' }} />}
                </h5>
                <img src={constants.BUTTONS.PleaseWait} alt="please wait..." width="100%" height="100%" />
                <ProgressBar animated className="rounded-0 mt-3" now={100} max={100} min={0} />
            </>
        );
    }

    return (
        <>
            <h3 className="">TRY AGAIN?</h3>
            <img onClick={() => onClickTryAgain()} className="cursor-pointer double-button" src={buttonDoubleOrNothing ?? buttonConstants.DoubleOrNothing} alt="try again" width="100%" height="100%" />
        </>
    );
}

const WinStreakModal = ({ imageUrl, style }) => {
    const [showImageModal, setShowImageModal] = useState(true);
    // const handleImageModalOpen = () => setShowImageModal(true);
    const handleImageModalClose = () => setShowImageModal(false);

    return (
        <>
            {
                imageUrl?.length > 0 && showImageModal &&
                <FullScreenImageModal
                    show={showImageModal}
                    imageUrl={imageUrl}
                    styleCss={style}
                    onHide={() => handleImageModalClose()}
                />
            }
        </>
    );
}

export const ResultPage = ({
    wallet,
    buttonClaimReward,
    buttonDoubleOrNothing,
    coinHeadsImageUrl,
    coinTailsImageUrl,
    buttonConstants,
    isWhitelabel,
    currentWinStreak,
    winningImageUrl,
    price,
    winner,
    side,
    claimRewards,
    goBack,
    isFinalized,
    rewardLoading,
    coinFlipId,
    isSuperStreak,
    skipReward,
    createdAt,
    isOwner,
    depositTxn,
    onOpenShareModal
}) => {
    const [showPleaseWaitButton, setShowPleaseWaitButton] = useState(!isFinalized);
    const isWinner = winner === side;
    const title = isWinner ? `YOU WON` : `YOU LOST`;
    return (
        <div className="play step2 py-5 py-md-0">
            <div className="form-signin">
                <a href="https://twitter.com/degencoinflip" target="_blank" rel="noopener noreferrer" className={`text-decoration-none ${isWhitelabel ? '' : 'd-none'}`}><h6 className="text-secondary">Powered by DCF Engine</h6></a>
                {
                    currentWinStreak > 1 &&
                    <div className={isSuperStreak ? "shake-it" : ""}>
                        <div className={isSuperStreak ? "animate-flicker" : ""}>
                            <h3>Congrats!<br /> You're on a {currentWinStreak} win streak</h3>
                        </div>
                    </div>
                }
                <img className="logo" src={getCoinLogo(winner, coinHeadsImageUrl, coinTailsImageUrl)} alt="coin" width="256" height="256" />
                <h3 className="mt-3">{title}</h3>
                <h3 className={isWinner ? "text-success mt-0" : "mt-0 text-danger"}><b>{price} SOL</b></h3>
                <hr />
                {
                    !wallet.connected &&
                    <>
                        <WalletMultiButton style={{ marginLeft: 'auto', marginRight: 'auto' }} />
                    </>
                }
                {
                    wallet.connected &&
                    <>
                        {
                            (skipReward === true || isOwner === false) &&
                            <><h6> Completed {timeAgo(createdAt)}.</h6>
                                <img onClick={goBack} className="cursor-pointer double-button" src={buttonDoubleOrNothing ?? buttonConstants.DoubleOrNothing} alt="try again" width="100%" height="100%" />
                            </>
                        }
                        {
                            !skipReward && isOwner === true &&
                            <>
                                <WinStreakModal imageUrl={winningImageUrl} />
                                {
                                    showPleaseWaitButton &&
                                    <PleaseWaitButton
                                        setShowPleaseWaitButton={setShowPleaseWaitButton}
                                        isWinner={isWinner}>
                                    </PleaseWaitButton>
                                }
                                {
                                    !showPleaseWaitButton &&
                                    <>
                                        {
                                            (isWinner && !skipReward) &&
                                            <RewardsButton
                                                wallet={wallet}
                                                buttonClaimReward={buttonClaimReward}
                                                buttonConstants={buttonConstants}
                                                rewardLoading={rewardLoading}
                                                claimRewards={claimRewards}
                                                showPleaseWaitButton={showPleaseWaitButton}
                                                setShowPleaseWaitButton={setShowPleaseWaitButton}
                                                coinFlipId={coinFlipId}>
                                            </RewardsButton>
                                        }
                                        {
                                            (!isWinner || skipReward) &&
                                            <TryAgainButton
                                                wallet={wallet}
                                                buttonDoubleOrNothing={buttonDoubleOrNothing}
                                                buttonConstants={buttonConstants}
                                                onClickTryAgain={goBack}>
                                            </TryAgainButton>
                                        }
                                    </>
                                }
                            </>
                        }
                    </>
                }
                {
                    depositTxn?.length > 0 &&
                    <h6 className="mt-2"><small>{depositTxn?.slice(0, 4)}</small></h6>
                }
                {
                    isWinner &&
                    <button className="btn btn-sm btn-transparent" onClick={onOpenShareModal}><i className="fas fa-camera-retro" /></button>
                }
            </div>
        </div>
    );
}