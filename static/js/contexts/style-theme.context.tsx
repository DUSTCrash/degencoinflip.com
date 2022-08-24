import React, { createContext, useContext, useEffect, useState } from 'react';
import { CHALLENGES } from '../utils/constants';
import { CommunityContext } from './community.context';

const DEFAULT_COMMUNITY = CHALLENGES[0];

interface StyleThemeContextValue {
  style: string | any;
  canToggle: boolean | any;
  toggleTheme(event: React.ChangeEvent<HTMLInputElement>): void;
  toggleDarkBlack(): void;
}

const StyleThemeContext = createContext<StyleThemeContextValue>({
  style: 'light',
  canToggle: true,
  toggleTheme() { },
  toggleDarkBlack() { },
});

const StyleThemeProvider = (props: any) => {
  const [style, setStyle] = useState(localStorage.getItem('style') ?? 'light');
  const [canToggle, setCanToggle] = useState(true);
  const { community } = useContext(CommunityContext);

  useEffect(() => {
    if (community.slug === DEFAULT_COMMUNITY.slug) return;
    const [PRIMARY_THEME] = community.themes;
    setStyle(PRIMARY_THEME);
    setCanToggle(community?.themes?.length > 1);
  }, [community]);

  const toggleTheme = () => {
    const [PRIMARY_THEME, SECONDARY_THEME] = community.themes;
    const theme = style === PRIMARY_THEME ? SECONDARY_THEME : PRIMARY_THEME;
    localStorage.setItem('style', theme);
    setStyle(theme);
  };

  const toggleDarkBlack = () => {
    if (style === 'dark-black') {
      toggleTheme();
    } else {
      setStyle('dark-black');
    }
  };

  return (
    <div>
      <StyleThemeContext.Provider value={{ style, canToggle, toggleTheme, toggleDarkBlack }}>
        {props.children}
      </StyleThemeContext.Provider>
    </div>
  )
};

export { StyleThemeContext, StyleThemeProvider };
