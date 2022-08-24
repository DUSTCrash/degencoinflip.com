import { useWallet } from "@solana/wallet-adapter-react";
import { useContext, useEffect, useState } from "react";
import { Dropdown, OverlayTrigger, Popover } from "react-bootstrap";

import { useInterval } from "../../hooks/useInterval";
import { getCurrentBalance } from '../../api-smart-contracts/dcf';
import { FlipRow } from "../../components/FlipRow";
import { RecentCoinFlipsContext } from "../../contexts/recent-coin-flips.context";
import { CommunityContext } from "../../contexts/community.context";
import { ProfileModal } from "../../components/modals/ProfileModal";
import { ProfileContext } from "../../contexts/profile.context";
import { StyleThemeContext } from "../../contexts/style-theme.context";
import { TopCoinFlipsContext } from "../../contexts/top-coin-flips.context";
import { FlipRowPlaceholder } from "../../components/FlipRowPlaceholder";
import { AcceptTermsModal } from "../../components/modals/AcceptTermsModal";
import { saveState } from "../../utils/localStorage";
import { AuthorizationContext } from "../../contexts/auth.context";
// import { isMobile } from "react-device-detect";
import { WhaleEventModal } from "../../components/modals/WhaleEventModal";
import { getRiskFreeFlip } from "../../api/live-api.service";
import { RiskFreeFlipModal } from "../../components/modals/RiskFreeFlipModal";
import { ToastDegenHours } from "../../components/toasts/DegenHoursToast";
// import { getJackpotEligibility } from "../../api/live-api.service";
const DEFAULT_INTERVAL = 5000;
// const SLOWER_INTERVAL = 10000;

// const SLOW_INTERVAL = 30000;
// const WHALE_EVENT_KEY = "whale_event_aug";
const RISK_FREE_FLIPS_KEY = "risk_free_flip";
// const REQUIRED_STREAKS = [3, 5, 7];
// const STREAKS_MULTIPLIER: any = {
//   '3': 1,
//   '5': 3,
//   '7': 5
// };

// const USER_TIMEZONE = Intl.DateTimeFormat().resolvedOptions().timeZone;
// const UNBOX_START_1 = DateTime.fromISO(`2022-07-19T18:00:00.000`, { zone: 'UTC' });

// const impl = {
//   reduceToEntriesCount: (eligibilityObject: any) => {
//     return REQUIRED_STREAKS.map(streak => {
//       const multiplier = STREAKS_MULTIPLIER[streak];
//       const [winEntries, lossEntries] = eligibilityObject[streak];
//       return (winEntries + lossEntries) * multiplier;
//     }).reduce((previousValue, currentValue) => previousValue + currentValue);
//   }
// };


const MenuBar = () => {
  const wallet: any = useWallet();

  const { auth } = useContext(AuthorizationContext);
  const { style } = useContext(StyleThemeContext);
  const { recentCoinFlips, fetch } = useContext(RecentCoinFlipsContext);
  const { topCoinFlips, fetchTop } = useContext(TopCoinFlipsContext);
  const { community } = useContext(CommunityContext);
  const { profile, fetchProfile, updateProfile } = useContext(ProfileContext);

  const [listType, setListType] = useState<any>();
  const [currentBalance, setCurrentBalance] = useState(0);
  const [walletCache, setWalletCache] = useState('');

  // const [normalEntries, setNormalEntries] = useState<number>();
  // const [whaleEntries, setWhaleEntries] = useState<number>();

  // const [showDegenHoursModal, setShowDegenHoursModal] = useState(false);
  // const handleDegenHoursModalOpen = () => setShowDegenHoursModal(true);
  // const handleDegenHoursModalClose = () => setShowDegenHoursModal(false);

  const [showProfileModal, setShowProfileModal] = useState(false);
  const handleProfileModalClose = () => setShowProfileModal(false);
  const handleProfileModalOpen = () => setShowProfileModal(true);

  const [showTermsModal, setShowTermsModal] = useState(false);
  // const handleTermsModalOpen = () => setShowTermsModal(true);
  const handleTermsModalClose = () => setShowTermsModal(false);

  // const [showGiveawayModal, setShowGiveawayModal] = useState(false);
  // const handleGiveawayModalOpen = () => setShowGiveawayModal(true);
  // const handleGiveawayModalClose = () => setShowGiveawayModal(false);

  const [showRiskFreeFlipModal, setShowRiskFreeFlipModal] = useState(false);
  const handleRiskFreeFlipModalOpen = () => setShowRiskFreeFlipModal(true);
  const handleRiskFreeFlipModalClose = () => setShowRiskFreeFlipModal(false);

  // const [showJackpotModal, setShowJackpotModal] = useState(false);
  // const handleJackpotModalOpen = () => setShowJackpotModal(true);
  // const handleJackpotModalClose = () => setShowJackpotModal(false);

  const [riskFreeFlips, setRiskFreeFlips] = useState();

  const [degenHoursToastShow, setDegenHoursToastShow] = useState<boolean>(false);


  const [showWhaleEventModal, setShowWhaleEventModal] = useState(false);
  const handleWhaleEventModalOpen = () => setShowWhaleEventModal(true);
  const handleWhaleEventModalClose = () => setShowWhaleEventModal(false);

  useEffect(() => {
    (async () => {
      if (
        !wallet ||
        !wallet.publicKey ||
        !wallet.connected ||
        wallet.publicKey.toString() === walletCache
      ) {
        return;
      }
      setWalletCache(wallet.publicKey.toString());
      fetchProfile(wallet.publicKey.toString());
      // const tdy = DateTime.utc().toLocaleString();
      // if (!loadState(tdy)) {
      //   handleGiveawayModalOpen();
      //   saveState(true, tdy);
      // }
      await checkRiskFreeFlip(wallet.publicKey.toString());
      // if (!showRiskFreeFlip && !loadState("degen_hours_schedule_3")) {
      //   handleDegenHoursModalOpen();
      //   saveState(true, "degen_hours_schedule_3");
      // }
      // fetchJackpotPromo(wallet.publicKey.toString());
      // fetchWlBoxCount(wallet.publicKey.toString());
    })();
    // eslint-disable-next-line
  }, [wallet]);

  const checkRiskFreeFlip = async (walletId: string) => {
    saveState(true, `${RISK_FREE_FLIPS_KEY}-${walletId}`);
    try {
      const payload = await getRiskFreeFlip(walletId);
      console.log(payload);
      if (payload?.results?.length) {
        setRiskFreeFlips(payload?.results);
        handleRiskFreeFlipModalOpen();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  // const fetchJackpotPromo = async (walletId: string) => {
  //   const { normal, whale } = await getJackpotEligibility(walletId);
  //   setNormalEntries(impl.reduceToEntriesCount(normal));
  //   setWhaleEntries(impl.reduceToEntriesCount(whale));
  // }

  // const [boxesCount, setBoxesCount] = useState(0);
  // const fetchWlBoxCount = async (walletId: string) => {
  //   try {
  //     const { count } = await getCoinFlipWLRewardCount(walletId);
  //     setBoxesCount(count);
  //   }
  //   catch {
  //     console.log('its okay..');
  //   }
  // }

  // const JackpotRafflesEntryInfo = () => {
  //   useInterval(async () => {
  //     if (wallet?.publicKey?.toString()) {
  //       fetchJackpotPromo(wallet?.publicKey?.toString());
  //     }
  //   }, SLOW_INTERVAL);
  //   return (
  //     <>
  //       {
  //         normalEntries != null && normalEntries > 0 &&
  //         <h5 className="mt-1 balance-text mb-0">
  //           <img src="https://i.imgur.com/NSU0AQo.png" className="img-fluid mb-1" alt="raffle" style={{ maxWidth: '32px' }} /> {normalEntries}
  //         </h5>
  //       }
  //       {isMobile && !!whaleEntries && <span>&nbsp;·&nbsp;</span>}
  //       {
  //         whaleEntries != null && whaleEntries > 0 &&
  //         <h5 className="mt-1 balance-text mb-0">
  //           🐳 {whaleEntries}
  //         </h5>
  //       }
  //     </>
  //   );
  // };

  // const WlBoxesInfo = () => {
  //   useInterval(async () => {
  //     if (wallet?.publicKey?.toString()) {
  //       fetchWlBoxCount(wallet?.publicKey?.toString());
  //     }
  //   }, SLOWER_INTERVAL);
  //   return (
  //     <>
  //       {
  //         boxesCount > 0 &&
  //         <h5 className="mt-1 balance-text mb-0 cursor-pointer" onClick={handleWhaleEventModalOpen}>
  //           <img src="https://i.imgur.com/sz4iGhl.png" className="img-fluid mb-2" style={{ maxWidth: '20px' }} alt="treasure" /> {boxesCount}
  //         </h5>
  //       }
  //     </>
  //   );
  // };

  const BalanceStatusInfo = () => {
    useInterval(async () => {
      if (wallet?.publicKey?.toString()) {
        const balance = await getCurrentBalance(wallet);
        setCurrentBalance(balance);
      }
    }, DEFAULT_INTERVAL);

    return (
      <>
        {
          currentBalance > 0 &&
          <h5 className="mt-1 balance-text mb-0">
            SOL {currentBalance?.toFixed(5)}
          </h5>
        }
      </>
    );
  };

  const CoinFlipsList = () => {
    const DEFAULT_INTERVAL = 4000;
    useInterval(async () => {
      fetch();
    }, DEFAULT_INTERVAL);

    return (
      <ul className="list-group mt-1 leaderboard-list border ms-auto">
        {
          recentCoinFlips?.map((flip: any) => {
            return (
              <FlipRow
                flip={flip}
                type=''
                key={flip.id}
                defaultProfilePicture={community?.profileImageUrl}></FlipRow>
            )
          })
        }
        {
          !recentCoinFlips?.length && new Array(10).fill(null).map((key) => {
            return <FlipRowPlaceholder key={key} />
          })
        }
      </ul>
    );
  };

  const TopCoinFlipsList = () => {
    return (
      <ul className="list-group mt-1 leaderboard-list border ms-auto">
        {
          topCoinFlips?.map((flip: any) => {
            return (
              <FlipRow
                flip={flip}
                type=''
                key={flip.id}
                defaultProfilePicture={community?.profileImageUrl}></FlipRow>
            )
          })
        }
        {
          !topCoinFlips?.length && new Array(10).fill(null).map((key) => {
            return <FlipRowPlaceholder key={key} />
          })
        }
      </ul>
    );
  };

  const RecentButton = () => {
    return (
      <a className="ms-sm-2 ms-1 cursor-pointer" href="#!" onClick={ev => ev.preventDefault()}>
        <button className={"btn " + (listType === 'recent' ? "btn-outline-dark" : "btn-dark")} onClick={async () => {
          if (listType !== 'recent') {
            fetch();
            setListType('recent');
          }
          else setListType(null)
        }}>
          RECENT <i className="d-none d-sm-inline-flex fas fa-caret-down fa-xs"></i>
        </button>
      </a>
    );
  };

  const WinStreaksButton = () => {
    return (
      <a className="ms-sm-2 ms-1 cursor-pointer" href="#!" onClick={ev => ev.preventDefault()}>
        <button className={"btn " + (listType === 'top' ? "btn-outline-dark" : "btn-dark")} onClick={async () => {
          if (listType !== 'top') {
            fetchTop();
            setListType('top');
          }
          else setListType(null)
        }}>
          TOP <span className="d-none d-sm-inline-flex">STREAKS</span> <i className="d-none d-sm-inline-flex fas fa-trophy fa-xs"></i>
        </button>
      </a>
    );
  };

  const LivePlaysButton = () => {
    return (
      <a
        href={`https://live.degencoinflip.com/`}
        target="_blank" rel="noopener noreferrer"
        className="ms-sm-2 ms-1">
        <button className="btn btn-dark">
          LIVE <i className="d-none d-sm-inline-flex fas fa-external-link-alt fa-xs"></i>
        </button>
      </a>
    );
  };

  const StatsButton = () => {
    return (
      <>
        <Dropdown className="ms-sm-2 ms-1">
          <Dropdown.Toggle variant="dark" id="dropdown-basic">
            STATS <i className="d-none d-sm-inline-flex fas fa-chart-bar fa-xs"></i>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <OverlayTrigger
              trigger={['hover', 'focus']}
              placement="bottom"
              overlay={
                <Popover id="popover-trigger-hover-focus" title="Popover bottom">
                  <img className="" src="https://i.imgur.com/ecVlYa2.png" alt="stats" width="100%" height="100%" />
                </Popover>}
            >
              <Dropdown.Item
                href={`https://mixpanel.com/public/KQMKc744sGRZMq3idvsBmK/`}
                target="_blank" rel="noopener noreferrer">TODAY'S STATS</Dropdown.Item>
            </OverlayTrigger>
            <Dropdown.Item
              href={`https://leaderboard.degencoinflip.com/`}
              target="_blank" rel="noopener noreferrer">LEADERBOARD</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </>
    );
  };

  const ProfileButton = () => {
    const CustomDropdownToggle = ({ onClick }: any) => {
      return <>
        <div className="ms-sm-2 ms-1 profile-picture-md" onClick={onClick}>
          <img className={`image rounded-circle cursor-pointer border border-2`}
            src={profile?.profileImageUrl ?? community?.profileImageUrl}
            alt={'pfp'}
            onError={(e: any) => {
              if (e.target.src !== community?.profileImageUrl) { e.target.onerror = null; e.target.src = community?.profileImageUrl; }
            }} />
        </div>
      </>
    };
    return (
      <>
        <CustomDropdownToggle onClick={handleProfileModalOpen}></CustomDropdownToggle>
        {/* <Dropdown align={{ sm: "end" }} className="ms-sm-2 ms-1">
          <Dropdown.Toggle as={CustomDropdownToggle} id="dropdown-basic">
          </Dropdown.Toggle>

          <Dropdown.Menu  >
            <Dropdown.Item
              onClick={handleProfileModalOpen}
              target="_blank" rel="noopener noreferrer">EDIT PROFILE</Dropdown.Item>
            <Dropdown.Item onClick={() => { wallet.disconnect(); signOut(); }}>DISCONNECT WALLET</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown> */}
      </>
    );
  }

  // const UnboxButton = () => {
  //   return (
  //     <>
  //       {
  //         DateTime.utc() > UNBOX_START_1 &&
  //         <a
  //           href={`https://unbox.degenfatcats.com/`}
  //           target="_blank" rel="noopener noreferrer"
  //           className="ms-sm-2 ms-1">
  //           <button className="btn btn-warning">
  //             UNBOX&nbsp;
  //             <i className="fas fa-external-link-alt fa-xs"></i>
  //           </button>
  //         </a>
  //       }
  //       {
  //         DateTime.utc() <= UNBOX_START_1 &&
  //         <OverlayTrigger
  //           trigger={['hover', 'focus']}
  //           placement="bottom"
  //           overlay={
  //             <Popover id="popover-trigger-hover-focus-2" title="Popover bottom">
  //               Unbox @ {UNBOX_START_1.setZone(USER_TIMEZONE).toLocaleString(DateTime.DATETIME_FULL)}
  //             </Popover>}
  //         >
  //           <button className="btn btn-warning ms-sm-2 ms-1 cursor-ban">
  //             UNBOX&nbsp;
  //             <i className="fas fa-external-link-alt fa-xs"></i>
  //           </button>
  //         </OverlayTrigger>
  //       }
  //     </>
  //   );
  // };

  const ButtonsRow = () => {
    return (
      <div className="d-flex flex-row mb-2 toolbar">
        <RecentButton />
        <WinStreaksButton />
        <StatsButton />
        <LivePlaysButton />
        {wallet?.connected && auth?.username === wallet?.publicKey?.toString() && <ProfileButton />}
      </div>
    );
  }

  return (
    <div className="social-icons" style={{ zIndex: 10 }}>
      <div className="d-flex flex-row flex-sm-column justify-content-start align-items-center">
        <div className="mt-3 d-flex flex-column shortcut-row" style={{ zIndex: 1 }}>
          <ButtonsRow />
          <BalanceStatusInfo />
          {/* <div className={"" + (isMobile ? "d-inline-flex justify-content-center align-items-center" : "")}>
            {wallet?.connected && <BalanceStatusInfo />}
            {isMobile && boxesCount > 0 && <div className="mx-1"> - </div>}
            {wallet?.connected && <WlBoxesInfo />}
          </div> */}
          {listType === 'recent' && <CoinFlipsList />}
          {listType === 'top' && <TopCoinFlipsList />}
          {
            showProfileModal &&
            <ProfileModal
              show={showProfileModal}
              wallet={wallet}
              profile={profile}
              defaultProfilePicture={community?.profileImageUrl}
              onHide={handleProfileModalClose}
              setProfile={updateProfile}
              styleCss={style}
            />
          }
          {
            showTermsModal &&
            <AcceptTermsModal
              show={showTermsModal}
              onClose={handleTermsModalClose}
              styleCss={style}
            />
          }
          {/* {
            showGiveawayModal &&
            <LimitedModal
              show={showGiveawayModal}
              onClose={handleGiveawayModalClose}
              styleCss={style}
            />
          }
          {
            showDegenHoursModal &&
            <DegenHoursModal
              show={showDegenHoursModal}
              styleCss={style}
              onHide={() => handleDegenHoursModalClose()}
            />
          }
         */}
          {/* {
            showJackpotModal &&
            <JackpotModal
              show={showJackpotModal}
              walletId={wallet?.publicKey?.toString()}
              styleCss={style}
              onHide={() => handleJackpotModalClose()}
            />
          } */} 
          {
            showWhaleEventModal &&
            <WhaleEventModal
              show={showWhaleEventModal}
              walletId={wallet?.publicKey?.toString()}
              styleCss={style}
              onHide={() => handleWhaleEventModalClose()}
            />
          }
          {
            showRiskFreeFlipModal &&
            <RiskFreeFlipModal
              show={showRiskFreeFlipModal}
              riskFreeFlips={riskFreeFlips}
              styleCss={style}
              onHide={() => handleRiskFreeFlipModalClose()}
            />
          }
          <ToastDegenHours riskFreeFlips={riskFreeFlips} show={degenHoursToastShow} onOpenModal={handleWhaleEventModalOpen} onClose={() => setDegenHoursToastShow(false)} />
        </div>
      </div>
    </div>
  );
};

export default MenuBar;