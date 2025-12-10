import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeId, themes, ThemeType } from '../constants/themes';

type ThemeContextType = {
  theme: ThemeType;
  themeId: ThemeId;
  setTheme: (themeId: ThemeId) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeId, setThemeId] = useState<ThemeId>('vocabulary');

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('theme');
      if (savedTheme && savedTheme in themes) {
        setThemeId(savedTheme as ThemeId);
      }
    } catch (error) {
      console.log('Failed to load theme:', error);
    }
  };

  const setTheme = async (newThemeId: ThemeId) => {
    try {
      await AsyncStorage.setItem('theme', newThemeId);
      setThemeId(newThemeId);
    } catch (error) {
      console.log('Failed to save theme:', error);
    }
  };

  const theme = themes[themeId];

  return (
    <ThemeContext.Provider value={{ theme, themeId, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}