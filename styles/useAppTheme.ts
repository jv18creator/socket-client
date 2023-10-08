'use client';

import { useCallback, useEffect, useState } from 'react';

export const DARK_THEME = 'dark';
export const LIGHT_THEME = 'light';

export const windowExists: boolean = typeof window !== undefined;

const useAppTheme = () => {
  const [theme, setTheme] = useState(
    (windowExists && localStorage.getItem('theme')) || DARK_THEME
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevState) => {
      const theme = prevState === DARK_THEME ? LIGHT_THEME : DARK_THEME;
      windowExists && localStorage.setItem('theme', theme);
      return theme;
    });
  };

  const setDarkTheme = useCallback(() => {
    windowExists && localStorage.setItem('theme', 'dark');
    setTheme('dark');
  }, []);

  const setLightTheme = () => {
    windowExists && localStorage.setItem('theme', 'light');
    setTheme('light');
  };

  return { activeTheme: theme, toggleTheme, setDarkTheme, setLightTheme };
};

export default useAppTheme;
