import { useContext, useState } from "react";
import { AudioContext } from "../../contexts/audio.context";
import ThemeToggler from "../../components/ThemeToggler";
import AudioButton from "../../components/AudioButton";
import Roomlio from "../../components/Roomlio";
import { useWallet } from "@solana/wallet-adapter-react";
import { ProfileContext } from "../../contexts/profile.context";
import { isMobile } from 'react-device-detect';
import Konami from "react-konami-code";
import { WhaleModeContext } from "../../contexts/whale-mode.context";
import { StyleThemeContext } from "../../contexts/style-theme.context";

const ToolBar = () => {
  const wallet = useWallet();
  const { profile } = useContext(ProfileContext);
  const { muted, toggleMute } = useContext(AudioContext);
  const { toggleWhaleMode } = useContext(WhaleModeContext);
  const { toggleDarkBlack, canToggle } = useContext(StyleThemeContext);


  const [showChat, setShowChat] = useState(!isMobile);
  const handleShowChat = () => setShowChat(true);

  const enableWhaleMode = () => {
    toggleWhaleMode();
    toggleDarkBlack();
  };

  const WhaleButton = () => {
    return (
      <a href="#!" onClick={ev => ev.preventDefault()} className="ms-sm-2 ms-1">
        <button className="btn btn-outline-dark" onClick={enableWhaleMode}>
          <img src="https://i.imgur.com/FJ88cXP.png" className="img-fluid" alt="whale" style={{ maxHeight: '23px' }} />
        </button>
        <Konami action={enableWhaleMode}></Konami>
      </a>
    );
  };

  return (
    <div className="social-icons-left pb-5 pb-lg-0">
      <div className="d-flex flex-row flex-sm-column justify-content-start align-items-center h-100">
        <div className="mt-3 d-flex flex-column mx-auto">
          <div className="d-flex flex-row z-index-10 toolbar">
            <AudioButton muted={muted} toggleMute={toggleMute}></AudioButton>
            {
              !showChat && wallet?.publicKey?.toString()?.length != null &&
              <button className="btn btn-outline-dark d-block d-sm-flex pb-0 pb-sm-2 ms-sm-2 ms-1" onClick={handleShowChat}>
                <i className={"fas my-auto fa-comment-alt"}></i>
              </button>
            }
            {wallet.connected && <WhaleButton />}
            {
              canToggle && <ThemeToggler></ThemeToggler>
            }
          </div>
        </div>
      </div>
      {
        wallet?.publicKey?.toString()?.length != null && profile != null && showChat &&
        <div>
          <Roomlio
            walletId={wallet?.publicKey?.toString()}
            nickname={profile?.nickname ?? `Wallet ${wallet?.publicKey?.toString()?.slice(0, 4)}`}
            isMobile={isMobile}>
          </Roomlio>
        </div>
      }
    </div>
  );
}

export default ToolBar;