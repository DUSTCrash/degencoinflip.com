import { useState } from "react";
import { useInterval } from "../../hooks/useInterval";
import { CHALLENGES, constants } from "../../utils/constants";

const DCF_ID = CHALLENGES[0].id;
const INTERVAL_TIME = 120000;

const CoinFlipWizardStepTwo = ({
  community,
  currentWinStreak,
  side,
  amount,
  status,
  onRetryFlip
}: any) => {

  const [stuck, setStuck] = useState(false);
  useInterval(async () => {
    setStuck(true);
  }, INTERVAL_TIME);

  return (
    <div className="play step2 py-5 py-md-0">
      <div className="form-signin">
        <a href="https://twitter.com/degencoinflip"
          target="_blank"
          rel="noopener noreferrer"
          className={`text-decoration-none ${community.id !== DCF_ID ? '' : 'd-none'}`}>
          <h6 className="text-secondary">Powered by DCF Engine</h6>
        </a>
        {
          !stuck &&
          <>
            {
              currentWinStreak > 1 &&
              <h3>Congrats!<br /> You're on a {currentWinStreak} win streak</h3>
            }
            <>
              <img className={community?.assets?.coinProcessingImageUrlIsSquare ? "coin-flipping-square" : "coin-flipping"} src={community?.assets?.coinProcessingImageUrl ?? constants.BUTTONS.Processing} alt="processing" />
              <h3 className="fst-italic">{status?.split('_').join(' ')}<small><span className="dot dot1">.</span><span className="dot dot2">.</span><span className="dot dot3">.</span></small></h3>
              <h3 className="mb-5 mb-lg-0"><u>{side === "H" ? "HEADS" : "TAILS"}</u> FOR <u>{amount}</u> SOL</h3>
            </>
          </>
        }
        {
          !!stuck &&
          <>
            <h3 className="mb-0">OH SH*T.</h3>
            <img className={community?.assets?.coinSideImageUrl ? "coin-flipping-square" : "coin-flipping"} src={community?.assets?.coinSideImageUrl ?? constants.GIFS.CoinSide} alt="stuck" />
            <h3 className="mb-0 mb-lg-0">COIN IS</h3>
            <h3 className="mb-5 mb-lg-0">STUCK ON THE SIDE</h3>
            <button
              className="btn btn-block w-100 btn-lg my-2 rounded-0 btn-warning"
              onClick={() => { setStuck(false); onRetryFlip({ side, amount }) }}>
              RETRY FLIP
            </button>
          </>
        }
      </div>
    </div>
  );
};

export default CoinFlipWizardStepTwo;
