import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CHALLENGES, constants } from "../../utils/constants";
import { loadState } from "../../utils/localStorage";
import { FlipRow } from "../FlipRow";
import { FAQModal } from "../modals/FAQModal";
import { HowToPlayModal } from "../modals/HowToPlayModal";
import { ResponsibleModal } from "../modals/ResponsibleModal";

const DCF_ID = CHALLENGES[0].id;
const COIN_QUESTION_MARK = "https://i.imgur.com/WtWzHUL.png";

const WALLET_NAME_KEY = "walletName";

const WalletNames = {
  PHANTOM: "Phantom",
  SLOPE: "Slope",
  SOL_FLARE: "Solflare",
  SOLLET: "Sollet"
};

const SIGNABLE_WALLETS = [WalletNames.PHANTOM, WalletNames.SOL_FLARE, WalletNames.SOLLET];

const CoinFlipWizardHome = ({
  community,
  style,
  wallet,
  recentCoinFlips,
  loading,
  onNext
}: any) => {

  const [showFAQ, setShowFAQ] = useState(false);
  const handleFAQClose = () => setShowFAQ(false);
  const handleFAQOpen = () => setShowFAQ(true);

  const [walletName, setWalletName] = useState<any>(null);

  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const handleHowToPlayClose = () => setShowHowToPlay(false);
  const handleHowToPlayOpen = () => setShowHowToPlay(true);

  const [showResponsible, setShowResponsible] = useState(false);
  const handleResponsibleClose = () => setShowResponsible(false);
  const handleResponsibleOpen = () => setShowResponsible(true);

  useEffect(() => {
    const key = loadState(WALLET_NAME_KEY);
    if (
      wallet.connected &&
      key !== walletName

    ) {
      setWalletName(key);
    }
    // eslint-disable-next-line
  }, [wallet]);

  const onNextClicked = () => {
    if (SIGNABLE_WALLETS.includes(walletName)) {
      onNext();
    } else {
      onNext(true);
    }
  }

  const Modals = () => {
    return (
      <>
        {
          showFAQ &&
          <FAQModal
            show={showFAQ}
            onHide={() => handleFAQClose()}
            wallet={wallet}
            styleCss={style}
          />
        }
        {
          showHowToPlay &&
          <HowToPlayModal
            show={showHowToPlay}
            onHide={() => handleHowToPlayClose()}
            styleCss={style}
          />
        }
        {
          showResponsible &&
          <ResponsibleModal
            show={showResponsible}
            onHide={handleResponsibleClose}
            styleCss={style}
          />
        }
      </>
    )
  }

  return (
    <div className="play step1 mt-md-5 pt-md-5 pt-4">
      <Modals />
      {
        community.id === DCF_ID &&
        <h3>#1 MOST TRUSTED PLACE TO FLIP</h3>
      }
      {
        community.id !== DCF_ID &&
        <h3>{community.name + ` Coin Flip`}</h3>
      }
      <a href="https://twitter.com/degencoinflip" target="_blank" rel="noopener noreferrer" className={`text-decoration-none ${community.id !== DCF_ID ? '' : 'd-none'}`}><h6 className="text-secondary">Powered by DCF Engine</h6></a>
      <div className="form-signin text-center">
        <img className="logo rounded-circle" src={community.logoUrl} alt="dcf logo" width="256" height="256" />
        <div className="mb-3">
        </div>
        {
          !wallet.connected &&
          <WalletMultiButton style={{ marginLeft: 'auto', marginRight: 'auto' }} />
        }
        {
          wallet.connected &&
          <>
            {
              !loading &&
              <>
                <img onClick={() => onNextClicked()} className="cursor-pointer double-or-nothing-button my-3" src={community?.assets?.buttonDoubleOrNothing ?? constants.BUTTONS.DoubleOrNothing} alt="double or nothing" width="100%" height="100%" />

                {
                  walletName === WalletNames.PHANTOM &&
                  <a href="#!" onClick={ev => { ev.preventDefault(); onNext(true); }} ><h6>USE LEDGER</h6></a>
                }
                {
                  walletName !== WalletNames.PHANTOM &&
                  <h6>CLICK TO SEE OPTIONS</h6>
                }
              </>
            }
            {
              loading &&
              <>
                <div className="d-flex justify-content-center py-5">
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
            }
          </>
        }
      </div>

      <h2 className="mt-5">RECENT PLAYS</h2>
      <div className="form-signin2 text-start">
        <ul className="list-group">
          {
            recentCoinFlips?.map((flip: any) => (
              <FlipRow
                type=''
                flip={flip}
                key={flip.id}
                defaultProfilePicture={COIN_QUESTION_MARK}></FlipRow>))
          }
        </ul>
      </div>
      <div className="accordion text-center mb-5" id="myAccordion">
        <h6 className="mt-3">
          <a href="https://about.degencoinflip.com" target="_blank" rel="noopener noreferrer">ABOUT</a> |&nbsp;
          <a href="#!" onClick={ev => { ev.preventDefault(); handleFAQOpen(); }} >FAQ</a> |&nbsp;
          <a href="#!" onClick={ev => { ev.preventDefault(); handleHowToPlayOpen() }}>HOW TO PLAY</a> |&nbsp;
          <a href="#!" onClick={ev => { ev.preventDefault(); handleResponsibleOpen() }}>FLIP RESPONSIBLY</a> |&nbsp;
          <Link to={`/bug-bounty`} className="">
            BUG BOUNTY
          </Link>
        </h6>
      </div>
    </div>
  );
};

export default CoinFlipWizardHome;