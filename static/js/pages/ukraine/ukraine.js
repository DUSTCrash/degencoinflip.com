import { useWallet } from "@solana/wallet-adapter-react";
import React, { useContext } from "react"
import { GivePage } from "../../components/pages/GivePage";
import { StyleThemeContext } from "../../contexts/style-theme.context";
import { CommunityContext } from "../../contexts/community.context";
import { ProfileContext } from "../../contexts/profile.context";

export const UkrainePage = () => {
  const wallet = useWallet();
  const { style } = useContext(StyleThemeContext);
  const { community } = useContext(CommunityContext);
  const { profile } = useContext(ProfileContext);

  return (
    <React.Fragment>
      <div className={style}>
        <div className="text-center body-wrapper h-100vh h-100 main-header">
          <GivePage
            wallet={wallet}
            profileImageUrl={profile?.profileImageUrl ?? community.coinImageUrl}
            nickname={profile?.nickname ?? `Wallet (${wallet?.publicKey?.toString()?.slice(0, 4)})`}
            style={style}
            onConfetti={() => { }}>
          </GivePage>
        </div>
      </div>
    </React.Fragment>
  )
};