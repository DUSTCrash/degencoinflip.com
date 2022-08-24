import { constants } from "../../utils/constants";
import ImageToggleButton from "../ImageToggleButton";



const CoinFlipWizardStepOneDefault = ({
  community,
  side,
  setSide,
  price,
  setPrice,
  loading,
  onDoubleOrNothing
}: any) => {
  return (
    <>
      <img className="mb-3 logo" src={community?.coinImageUrl} alt="coin" width="128" height="128" />
      <h3 className="my-2 mt-sm-5">I LIKE</h3>
      <div className="row mb-2">
        <div className="col-6">
          <ImageToggleButton
            name="Heads"
            buttonImageSrc={community?.assets?.buttonHeads ?? constants.BUTTONS.Heads}
            isSelected={side ==="H"}
            onSelect={() => setSide("H")} />
        </div>
        <div className="col-6">
          <ImageToggleButton
            name="Tails"
            buttonImageSrc={community?.assets?.buttonTails ?? constants.BUTTONS.Tails}
            isSelected={side ==="T"}
            onSelect={() => setSide("T")} />
        </div>
      </div>
      <h3 className="mb-1">FOR</h3>
      <div className="row mb-2">
        <div className="col-4">
          <ImageToggleButton
            name="0.05 SOL"
            buttonImageSrc={community?.assets?.buttonPt05Sol ?? constants.BUTTONS.BabyButton}
            isSelected={price ===0.05}
            onSelect={() => setPrice(0.05)} />
        </div>
        <div className="col-4">
          <ImageToggleButton
            name="0.1 SOL"
            buttonImageSrc={community?.assets?.buttonPt10Sol ?? constants.BUTTONS.PtOneSol}
            isSelected={price ===0.1}
            onSelect={() => setPrice(0.1)} />
        </div>
        <div className="col-4">
          <ImageToggleButton
            name="0.25 SOL"
            buttonImageSrc={community?.assets?.buttonPt25Sol ?? constants.BUTTONS.Pt25Sol}
            isSelected={price ===0.25}
            onSelect={() => setPrice(0.25)} />
        </div>
      </div>
      <div className="row mb-1">
        <div className="col-4">
          <ImageToggleButton
            name="0.5 SOL"
            buttonImageSrc={community?.assets?.buttonPt5Sol ?? constants.BUTTONS.PtFiveSol}
            isSelected={price ===0.5}
            onSelect={() => setPrice(0.5)} />
        </div>
        <div className="col-4">
          <ImageToggleButton
            name="1 SOL"
            buttonImageSrc={community?.assets?.button1Sol ?? constants.BUTTONS.OneSol}
            isSelected={price ===1}
            onSelect={() => setPrice(1)} />
        </div>
        <div className="col-4">
          <ImageToggleButton
            name="2 SOL"
            buttonImageSrc={community?.assets?.button2Sol ?? constants.BUTTONS.TwoSol}
            isSelected={price ===2}
            onSelect={() => setPrice(2)} />
        </div>
      </div>
      <hr />
      <img onClick={onDoubleOrNothing}
        className="cursor-pointer double-or-nothing-button mb-1"
        src={community?.assets?.buttonDoubleOrNothing ?? constants.BUTTONS.DoubleOrNothing}
        alt="double or nothing"
        width="100%"
        height="100%" />
    </>
  );
};

export default CoinFlipWizardStepOneDefault;
