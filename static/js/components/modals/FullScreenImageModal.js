import { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { AudioContext } from "../../contexts/audio.context";
import { confetti } from '../../utils/confetti';

export const openInNewTab = (url) => {
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
  if (newWindow) newWindow.opener = null
};

export function FullScreenImageModal({ imageUrl, styleCss, ...props }) {
  const { play } = useContext(AudioContext);
  const [counter, setCounter] = useState(0);
  useEffect(() => {
      const timeout = setTimeout(() => {
          setCounter(1 + counter);
      }, 100);

      return () => {
          clearTimeout(timeout);
      };
  }, [counter]);

  const doAgain = () => {
    const confettiAnimation = confetti;
    const playConfettiAnimation = (defaultTimeout = 5000, min = null, max = null) => {
      confettiAnimation?.start(defaultTimeout, min, max);
      setTimeout(function () {
        confettiAnimation?.stop()
      }, defaultTimeout);
    };

    if (counter > 1000) {
      play(10);
      playConfettiAnimation(5000, 0, 100);
    }

  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      contentClassName={styleCss + `-color`}
      centered
    >
      <Modal.Body className={"p-0"}>
        <img onClick={doAgain} className="img-fluid rounded border border-5 w-100" src={imageUrl} alt="..."/>
      </Modal.Body>
    </Modal>
  );
}