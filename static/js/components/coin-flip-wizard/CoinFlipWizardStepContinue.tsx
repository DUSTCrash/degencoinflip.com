import { CHALLENGES, constants } from "../../utils/constants";
import { getSideName } from "../../utils/helpers";

const DCF_ID = CHALLENGES[0].id;

const CoinFlipWizardStepContinue = ({
  community,
  side,
  amount,
  loading,
  onDoubleOrNothing
}: any) => {

  return (
    <div className="play step2 py-5 py-md-0">
      <div className="form-signin">
        <a href="https://twitter.com/degencoinflip" target="_blank" rel="noopener noreferrer" className={`text-decoration-none ${community.id !== DCF_ID ? '' : 'd-none'}`}><h6 className="text-secondary">Powered by DCF Engine</h6></a>
        {
          !loading &&
          <>
            <h3 className="my-2 mt-sm-5">CONTINUING PREVIOUS FLIP</h3>
            <img className="mb-0 logo" src={community?.coinImageUrl} alt="coin" width="128" height="128" />
            <h3 className="my-2 mt-sm-5"><b><u>{getSideName(side)}</u></b> for <b><u>{amount}</u></b> SOL </h3>
            <hr />
            <img onClick={() => onDoubleOrNothing({ side, amount })}
              className="cursor-pointer double-button mb-1"
              src={community?.assets?.buttonDoubleOrNothing ?? constants.BUTTONS.DoubleOrNothing}
              alt="double or nothing"
              width="100%"
              height="100%" />
          </>
        }
        {
          loading &&
          <>
            <img className={community?.assets?.coinProcessingImageUrlIsSquare ? "coin-flipping-square" : "coin-flipping"} src={community?.assets?.coinProcessingImageUrl ?? constants.BUTTONS.Processing} alt="processing" />
            <h3 className="fst-italic">FLIPPING<small><span className="dot dot1">.</span><span className="dot dot2">.</span><span className="dot dot3">.</span></small></h3>
            <h3 className="mb-5 mb-lg-0"><u>{side === "H" ? "HEADS" : "TAILS"}</u> FOR <u>{amount}</u> SOL</h3>
          </>
        }
      </div>
    </div>
  );
};

export default CoinFlipWizardStepContinue;