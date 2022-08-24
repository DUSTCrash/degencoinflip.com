import { useContext } from "react";
import { Link } from "react-router-dom";
import { StyleThemeContext } from "../../contexts/style-theme.context";
import { WhaleModeContext } from "../../contexts/whale-mode.context";
import { VALID_AMOUNTS } from "../../utils/constants";
// import { JackpotPromo } from "../JackpotPromo";
import CoinFlipWizardStepOneDefault from "./CoinFlipWizardStepOneDefault";
import CoinFlipWizardStepOneWhale from "./CoinFlipWizardStepOneWhale";

const CoinFlipWizardStepOne = ({
  community,
  style,
  whaleMode,
  currentWinStreak,
  price,
  setPrice,
  setSide,
  side,
  loading,
  onNext
}: any) => {
  const { toggleWhaleMode } = useContext(WhaleModeContext);
  const { toggleDarkBlack } = useContext(StyleThemeContext);

  const enableWhaleMode = () => {
    toggleWhaleMode();
    toggleDarkBlack();
  };
  const flipCoin = () => {
    if (!VALID_AMOUNTS.includes(price)) {
      return;
    }

    if (whaleMode && ![1, 2, 3, 4, 5].includes(price)) {
      return;
    }

    onNext({
      side,
      amount: price
    });
  }

  return (

    <div className="play step1 py-4 py-md-0">
      <div className="form-signin">
        {
          currentWinStreak > 1 &&
          <h3>Congrats!<br /> You're on a {currentWinStreak} win streak</h3>
        }
        {
          loading &&
          <div className="my-5 my-lg-0 py-5 py-lg-0">
            <div className="cssload-container py-5 py-lg-0">
              <div className="cssload-zenith"></div>
            </div>
          </div>
        }
        {
          !loading &&
          <>
            {
              !whaleMode &&
              <CoinFlipWizardStepOneDefault
                loading={loading}
                community={community}
                side={side}
                price={price}
                setSide={(s: any) => !loading && setSide(s)}
                setPrice={(p: any) => !loading && setPrice(p)}
                onDoubleOrNothing={flipCoin} />
            }
            {
              whaleMode &&
              <CoinFlipWizardStepOneWhale
                loading={loading}
                community={community}
                side={side}
                price={price}
                setSide={(s: any) => !loading && setSide(s)}
                setPrice={(p: any) => !loading && setPrice(p)}
                onDoubleOrNothing={flipCoin} />
            }
            <h6 className="mt-3 text-secondary">
              <a href="#!" onClick={ev => { ev.preventDefault(); enableWhaleMode() }} className="ms-sm-2 ms-1 no-decoration">
                { !whaleMode ? `ENTER` : `EXIT` } WHALE MODE
              </a>
              &nbsp;|&nbsp;
              <Link to="/ukraine" className="ms-sm-2 ms-1 no-decoration">
                FEELING GENEROUS?&nbsp;<img src="https://flagicons.lipis.dev/flags/4x3/ua.svg" height="17px" className="mb-1" alt="ukraine"></img>
              </Link>
            </h6>
          </>
        }
      </div>
    </div>
  );
};

export default CoinFlipWizardStepOne;
