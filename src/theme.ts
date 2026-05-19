import { createContext, useContext } from 'react';
import { Platform } from 'react-native';

export type SettingsColors = {
  background: string;
  groupedBackground: string;
  card: string;
  cardPressed: string;
  separator: string;
  primaryText: string;
  secondaryText: string;
  tertiaryText: string;
  accent: string;
  destructive: string;
  inputBackground: string;
  placeholder: string;
};

export type SettingsTheme = {
  colors: SettingsColors;
  radius: number;
  sectionSpacing: number;
  rowMinHeight: number;
  rowPaddingHorizontal: number;
  rowPaddingVertical: number;
  fontFamily?: string;
};

export const lightColors: SettingsColors = {
  background: '#FFFFFF',
  groupedBackground: '#F2F2F7',
  card: '#FFFFFF',
  cardPressed: '#E5E5EA',
  separator: '#C6C6C8',
  primaryText: '#000000',
  secondaryText: '#3C3C43',
  tertiaryText: '#8E8E93',
  accent: '#007AFF',
  destructive: '#FF3B30',
  inputBackground: '#FFFFFF',
  placeholder: '#C7C7CC',
};

export const darkColors: SettingsColors = {
  background: '#000000',
  groupedBackground: '#000000',
  card: '#1C1C1E',
  cardPressed: '#2C2C2E',
  separator: '#38383A',
  primaryText: '#FFFFFF',
  secondaryText: '#EBEBF5',
  tertiaryText: '#8E8E93',
  accent: '#0A84FF',
  destructive: '#FF453A',
  inputBackground: '#1C1C1E',
  placeholder: '#48484A',
};

export const defaultTheme: SettingsTheme = {
  colors: lightColors,
  radius: 10,
  sectionSpacing: 32,
  rowMinHeight: 44,
  rowPaddingHorizontal: 16,
  rowPaddingVertical: 11,
  fontFamily: Platform.select({ ios: 'System', android: 'sans-serif' }),
};

export const SettingsThemeContext = createContext<SettingsTheme>(defaultTheme);

export function useSettingsTheme(): SettingsTheme {
  return useContext(SettingsThemeContext);
}

export function buildTheme(
  mode: 'light' | 'dark' = 'light',
  overrides?: Partial<SettingsTheme> & { colors?: Partial<SettingsColors> }
): SettingsTheme {
  const base: SettingsTheme = {
    ...defaultTheme,
    colors: mode === 'dark' ? darkColors : lightColors,
  };
  if (!overrides) return base;
  const { colors: colorOverrides, ...rest } = overrides;
  return {
    ...base,
    ...rest,
    colors: { ...base.colors, ...(colorOverrides ?? {}) },
  };
}
