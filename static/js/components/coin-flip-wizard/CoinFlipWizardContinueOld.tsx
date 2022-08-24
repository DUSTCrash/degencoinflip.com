
import { CHALLENGES, constants } from "../../utils/constants";
import ImageToggleButton from "../ImageToggleButton";

const DCF_ID = CHALLENGES[0].id;

const CoinFlipWizardStepContinueOld = ({
  community,
  side,
  amount,
  setSide,
  onDoubleOrNothing
}: any) => {
  return (
    <div className="play step2 py-5 py-md-0">
      <div className="form-signin">
        <a href="https://twitter.com/degencoinflip" target="_blank" rel="noopener noreferrer" className={`text-decoration-none ${community.id !== DCF_ID ? '' : 'd-none'}`}><h6 className="text-secondary">Powered by DCF Engine</h6></a>
        <h3 className="my-2 mt-sm-5">CONTINUING <b><u>{amount} SOL</u></b> FLIP</h3>
        <img className="mb-3 logo" src={community?.coinImageUrl} alt="coin" width="128" height="128" />
        <h3 className="my-2 mt-sm-5">I LIKE</h3>
        <div className="row mb-2">
          <div className="col-6">
            <ImageToggleButton
              name="Heads"
              buttonImageSrc={community?.assets?.buttonHeads ?? constants.BUTTONS.Heads}
              isSelected={side === "H"}
              onSelect={() => setSide("H")} />
          </div>
          <div className="col-6">
            <ImageToggleButton
              name="Tails"
              buttonImageSrc={community?.assets?.buttonTails ?? constants.BUTTONS.Tails}
              isSelected={side === "T"}
              onSelect={() => setSide("T")} />
          </div>
        </div>
        <hr />
        <img onClick={() => onDoubleOrNothing({ side, amount })}
          className="cursor-pointer double-button mb-1"
          src={community?.assets?.buttonDoubleOrNothing ?? constants.BUTTONS.DoubleOrNothing}
          alt="double or nothing"
          width="100%"
          height="100%" />
      </div>
    </div>
  );
};
export default CoinFlipWizardStepContinueOld;