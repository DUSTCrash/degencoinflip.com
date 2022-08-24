import { createContext, useState } from 'react';

interface WhaleModeContextValue {
  whaleMode: boolean | any,
  toggleWhaleMode(): void;
}

const WhaleModeContext = createContext<WhaleModeContextValue>({
  whaleMode: false,
  toggleWhaleMode() { }
});

const WhaleModeProvider = (props: any) => {
  const [whaleMode, setWhaleMode] = useState<boolean>(false);
  const toggleWhaleMode = () => setWhaleMode(!whaleMode);

  return (
    <div>
      <WhaleModeContext.Provider value={{ whaleMode, toggleWhaleMode }}>
        {props.children}
      </WhaleModeContext.Provider>
    </div>
  )
};

export { WhaleModeContext, WhaleModeProvider };