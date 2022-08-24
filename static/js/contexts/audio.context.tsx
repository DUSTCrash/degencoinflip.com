import React, { createContext, useState } from 'react';
import { useMultiAudio } from '../hooks/useAudio';

interface AudioContextValue {
  muted: boolean;
  toggleMute(event: React.ChangeEvent<HTMLInputElement>): void;
  play(key: any): void;
}

const AudioContext = createContext<AudioContextValue>({
  muted: false,
  toggleMute() { },
  play() { }
});

const AudioProvider = (props: any) => {
  const [muted, setMuted] = useState(false);
  const [toggle] = useMultiAudio();

  const toggleMute = () => {
    setMuted(!muted);
  };

  const play = (audioKey: any) => {
    if (muted) return;
    toggle(audioKey);
  }

  return (
    <div>
      <AudioContext.Provider value={{ muted, toggleMute, play }}>
        {props.children}
      </AudioContext.Provider>
    </div>
  )
};

export { AudioContext, AudioProvider };
