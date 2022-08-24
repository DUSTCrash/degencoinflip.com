import { useState } from "react";
import { getRewards } from "../../api-smart-contracts/dcf";
import { CHALLENGES, constants, opposite } from "../../utils/constants";
import { ResultPage } from "../pages/ResultPage";

const DCF_ID = CHALLENGES[0].id;

const CoinFlipWizardStepThree = ({
  wallet,
  community,
  currentWinStreak,
  winStreakImageUrl,
  amount,
  won,
  side,
  id,
  isFinalized,
  isSuperStreak,
  depositTxn,
  skipReward,
  createdAt,
  coinWalletId,
  onNext,
  onOpenShareModal
}: any) => {
  const [rewardLoading, setRewardLoading] = useState(false);


  const claimRewards = async () => {
    setRewardLoading(true);
    try {
      await getRewards(wallet, id, amount, side);
      setRewardLoading(false);
      onNext();
    } catch {
      setRewardLoading(false);
    }
  }

  return (
    <ResultPage
      wallet={wallet}
      coinHeadsImageUrl={community?.assets?.coinHeadsImageUrl ?? constants.BUTTONS.BabyCoin}
      coinTailsImageUrl={community?.assets?.coinTailsImageUrl ?? constants.BUTTONS.BabyCoinButt}
      buttonClaimReward={community?.assets?.buttonClaimReward ?? constants.BUTTONS.ClaimReward}
      buttonDoubleOrNothing={community?.assets?.buttonDoubleOrNothing ?? constants.BUTTONS.DoubleOrNothing}
      winningImageUrl={winStreakImageUrl}
      buttonConstants={constants.BUTTONS}
      isWhitelabel={community.id !== DCF_ID}
      currentWinStreak={currentWinStreak}
      price={amount}
      winner={won ? side : opposite(side)}
      side={side}
      isFinalized={isFinalized}
      claimRewards={claimRewards}
      goBack={onNext}
      rewardLoading={rewardLoading}
      isSuperStreak={isSuperStreak}
      coinFlipId={id}
      skipReward={skipReward}
      createdAt={createdAt}
      isOwner={wallet?.publicKey?.toString() === coinWalletId}
      depositTxn={depositTxn}
      onOpenShareModal={onOpenShareModal} />
  );
};

export default CoinFlipWizardStepThree;