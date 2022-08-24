import React, { useContext, useState } from "react"
import RangeSlider from 'react-bootstrap-range-slider';
import { Form } from "react-bootstrap";
import { StyleThemeContext } from "../../contexts/style-theme.context";
import { useInterval } from "../../hooks/useInterval";
import {
  promo,
  entries
} from './data.json';
import { confetti } from '../../utils/confetti';

import './jackpot-roullete.css';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import { AudioContext } from "../../contexts/audio.context";
import { EntryCheckerModal } from "../../components/modals/EntryCheckerModal";
import { useWallet } from "@solana/wallet-adapter-react";

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const buildData = () => {
  const keys = Object.keys(entries);
  const allNormalEntries = [].concat(...keys.map(walletId => Array(entries[walletId].normal).fill(walletId)));
  const allWhaleEntries = [].concat(...keys.map(walletId => Array(entries[walletId].whale).fill(walletId)));
  return {
    allNormalEntries,
    allWhaleEntries,
    distinctNormalEntries: Object.keys(entries).map(e => e).filter(walletId => entries[walletId].normal > 0),
    distinctWhaleEntries: Object.keys(entries).map(e => e).filter(walletId => entries[walletId].whale > 0),
    data: entries
  };
};

const IntervalText = ({ distinctWhaleEntries, onDraw }) => {
  const [displayedText, setDisplayedText] = useState();
  const [i, setI] = useState(0);
  const [interval, setInterval] = useState(50);
  useInterval(async () => {
    setDisplayedText(distinctWhaleEntries[i]);
    const r = randomNumber(0, distinctWhaleEntries.length);
    setI(r);
  }, interval);
  return (<>
    <div className="row">
      <div className="col-6">
        <button className="btn btn-warning btn-lg px-4 gap-3" onClick={() => onDraw(false)}>DRAW RAFFLE</button>
      </div>
      <div className="col-6">
        <button className="btn btn-primary btn-lg px-4 gap-3" onClick={() => onDraw(true)}>DRAW WHALE</button>
      </div>
    </div>
    <Form>
      <Form.Group>
        <RangeSlider
          value={interval}
          onChange={e => setInterval(e.target.value)}
        />
      </Form.Group>
    </Form>
    <span id="cycle">{displayedText}</span>

  </>
  )
}

export const JackpotRoulettePage = () => {
  const wallet = useWallet();

  const { allNormalEntries, allWhaleEntries, distinctNormalEntries } = buildData();
  const { style } = useContext(StyleThemeContext);
  const [selected, setSelected] = useState(null);
  const { play } = useContext(AudioContext);
  const [isLoading, setIsLoading] = useState(null);
  const [history, setHistory] = useState([]);
  const [whaleHistory, setWhaleHistory] = useState([]);

  const onDraw = (isWhale) => {
    const confettiAnimation = confetti;
    const playConfettiAnimation = (defaultTimeout = 5000, min, max) => {
      confettiAnimation?.start(defaultTimeout, min, max);
      setTimeout(function () {
        confettiAnimation?.stop()
      }, defaultTimeout);
    };

    if (isWhale) {
      var walletId = allWhaleEntries[Math.floor(Math.random() * allWhaleEntries.length)];
      setIsLoading(true);
      setTimeout(function () {
        play(13);
      }, 3800);
      setTimeout(function () {
        setIsLoading(false);
        playConfettiAnimation(10000, 420, 690);
        const whaleHistories = [walletId, ...whaleHistory];
        setWhaleHistory(whaleHistories);
        setSelected(walletId);
      }, 4200);

    }
    else {
      var wallet = allNormalEntries[Math.floor(Math.random() * allNormalEntries.length)];
      setIsLoading(true);
      setTimeout(function () {
        play(13);
      }, 3800);
      setTimeout(function () {
        setIsLoading(false);
        playConfettiAnimation(10000, 420, 690);
        const newHistory = [wallet, ...history];
        console.log(newHistory);
        setHistory(newHistory);
        setSelected(wallet);
      }, 4200);

    }

  }


  const [showJackpotModal, setShowJackpotModal] = useState(false);
  // const handleJackpotModalOpen = () => setShowJackpotModal(true);
  const handleJackpotModalClose = () => setShowJackpotModal(false);

  return (
    <React.Fragment>
      <div className={style}>
        <div className="text-center d-flex main-header h-100vh-desktop">
          <div className="play step2">
            <h3 className="text-center">
              {
                promo
              }
            </h3>
            {
              !isLoading &&
              <div className="shake-it">
                <h1 className="fw-bold blink_me"><br />{selected}</h1>
              </div>
            }
            <div className={"form-signin" + (isLoading ? " shake-it" : "")}>
              <IntervalText distinctWhaleEntries={distinctNormalEntries} onDraw={onDraw}></IntervalText>
              <br />
              <br />
              ____
              <br />
              <br />
              <br />
            </div>
            <div className="row">
              <div className="col-6">
                <div className="card">
                  <div className="card-body">
                    <h3>WINNERS</h3>
                    {
                      history?.map(a => {
                        return <h6>{a}</h6>
                      })
                    }
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="card">
                  <div className="card-body">
                    <h3>🐳 WINNER</h3>
                    {
                      whaleHistory?.map(a => {
                        return <h6>{a}</h6>
                      })
                    }
                  </div>
                </div>
              </div>
            </div>
            {isLoading &&
              <div id="demo"></div>
            }
          </div>
        </div>
      </div>
      {
        showJackpotModal &&
        <EntryCheckerModal
          wallet={wallet}
          show={showJackpotModal}
          entries={entries}
          styleCss={style}
          onClose={() => handleJackpotModalClose()}
        />
      }
    </React.Fragment>
  );
};