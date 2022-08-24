import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import React, { useContext, useState } from "react"
import { AuthorizationContext } from "../../contexts/auth.context";
import { StyleThemeContext } from "../../contexts/style-theme.context";
import { CHALLENGES } from "../../utils/constants";

const discordUrl = "https://discord.com/api/oauth2/authorize?client_id=958201393087381524&redirect_uri=https%3A%2F%2Fdegencoinflip.com%2Fdiscord%2Foauth&response_type=code&scope=identify%20guilds.members.read";
export const openInNewTab = (url) => {
  // const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
  const newWindow = window.open(url, '_self', 'noopener,noreferrer')
  // console.log(newWindow);
  if (newWindow) newWindow.opener = null
}

export const DiscordLink = () => {
  const wallet = useWallet();
  const { style } = useContext(StyleThemeContext);
  const { signIn } = useContext(AuthorizationContext);

  const [loading, setLoading] = useState(false);
  const enableLoading = () => setLoading(true);
  const disableLoading = () => setLoading(false);

  const authenticate = async (wallet) => {
    await signIn(
      wallet?.publicKey?.toString()
    );
  }

  const linkDiscord = async (wallet) => {
    enableLoading();
    try {
      await authenticate(wallet);
      openInNewTab(discordUrl);
    }
    catch {
      disableLoading();
    }
  }

  return (
    <React.Fragment>
      <div className={style}>
        <div className="text-center body-wrapper h-100vh h-100 main-header">
          <div className="play step1 mt-md-5 pt-md-5 pt-4">
            <div className="form-signin text-center">
              <img className="logo rounded-circle" src={CHALLENGES[0].logoUrl} alt="dcf logo" width="256" height="256" />
              <hr />
              {
                !wallet.connected &&
                <WalletMultiButton style={{ marginLeft: 'auto', marginRight: 'auto' }} />
              }
              {
                wallet.connected &&
                <>
                  {
                    !loading &&
                    <button className="btn btn-sm bg-discord mb-3 button-fx" onClick={() => linkDiscord(wallet)}>
                      LINK DISCORD <i className="fab fa-discord fa-xs"></i>
                    </button>
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
                  <br />
                  <span>
                    <a href="https://discord.gg/degenfatcats" target="_blank" rel="noopener noreferrer">discord.gg/degenfatcats<i className="d-inline-flex ms-1 fas fa-external-link-alt fa-xs"></i></a>
                  </span>
                </>
              }
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};