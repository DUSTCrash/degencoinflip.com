import { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { ProfileContext } from "../../contexts/profile.context";
import { CHALLENGES } from "../../utils/constants";

import '../../@hivemind/styles/animations.scss'
import { isMobile } from "react-device-detect";
import { getTopGains } from "../../api/dashboard.service";

const constants = {
  DEGEN_BG: 'https://i.imgur.com/z7Fsi3h.png',
  ROSE_GOLD_BG: 'https://i.imgur.com/TeKfLtm.png',
  BASED_BG: 'https://i.imgur.com/6kYRPdU.png'
};

export const ShareCardModal = ({ styleCss, amount, walletId, winStreak, playConfetti, ...props }) => {
  const { profile } = useContext(ProfileContext);
  const [top, setTop] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTopGains(walletId);
  }, [walletId])


  const fetchTopGains = async (walletId) => {
    const topGains = await getTopGains();
    const { top10 } = topGains;
    const res = top10?.find(t => t.walletId === walletId);
    if (res) {
      setTop(res);
    }
    setLoading(false);
  }

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        contentClassName={styleCss + `-color`}
        centered
      >
        <Modal.Body className={"p-0"}>
          <div className="card card-user pt-5 shadow-lg gradient-border" onMouseEnter={playConfetti}
            style={{
              backgroundImage: `url(${constants.ROSE_GOLD_BG})`,
              backgroundSize: `cover`
            }}>
            <div className={"card-body p-2 p-lg-5" + (styleCss === 'dark' ? ' pb-0' : '')}>
              <div className="row align-items-center">
                <div className="col-lg-3 d-flex justify-content-center">
                  <img src={profile?.profileImageUrl ?? CHALLENGES[0].profileImageUrl} className="d-block mx-lg-auto img-fluid rounded-circle border border-2" alt="Bootstrap Themes" width={120} height={120} loading="lazy" />
                </div>
                <div className="col-12 col-lg-9 d-flex justify-content-center">
                  {
                    loading &&
                    <h3 className="fst-italic">LOADING<small><span className="dot dot1">.</span><span className="dot dot2">.</span><span className="dot dot3">.</span></small></h3>
                  }
                  {
                    !loading && top === null &&
                    <h4 className={"fw-bold py-3 py-lg-0 text-dark text-center " + (isMobile ? "h6" : "h4")}><span className="text-danger">{profile?.nickname ?? `Wallet (${walletId?.slice(0, 4)})`}</span> just won <span className="text-success">{amount} sol</span>{winStreak > 1 ? <> {`&`} <span className="text-success">doubled {winStreak} times</span></> : ``}.</h4>
                  }
                  {
                    !loading && top !== null &&
                    <h3 className={"fw-bold py-3 py-lg-0 text-dark text-center " + (isMobile ? "h6" : "h3")}><span className="text-danger">{profile?.nickname ?? `Wallet (${walletId?.slice(0, 4)})`}</span> is the <span className="fw-bolder"><u>#{top?.rank + 1}</u></span> degen today,<br /> with a profit of <span className="text-success">{top?.netGains} sol</span>.</h3>
                  }
                </div>
              </div>
            </div>
            <div className="w-100 mb-2">
              <div className="container">
                <div className="d-flex justify-content-end">
                  <div className="row me-1">
                    <div className="col-9 text-end">
                      <span className="fw-bold text-dark"><small>Flip your sol</small>
                        {
                          !isMobile &&
                          <>
                            <br /><small>degencoinflip.com</small>
                          </>
                        }
                      </span>
                    </div>
                    <div className="col-3 px-0">
                      <img src={CHALLENGES[0].profileImageUrl} className="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width={48} height={48} loading="lazy" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
