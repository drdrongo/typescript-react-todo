import { createContext } from 'react';

interface Theme {
	foreground: String;
	background: String;
}
interface Themes {
	light: Theme;
	dark: Theme;
}

export const themes: Themes = {
	light: {
		foreground: '#000000',
		background: '#eeeeee',
	},
	dark: {
		foreground: '#ffffff',
		background: '#222222',
	},
};

interface InitialContextValue {
  isLight: Boolean;
  theme: Theme;
  toggleTheme: Function;
}
const initialContextValue: InitialContextValue = {
  isLight: true,
  theme: themes.light,
  toggleTheme: () => {}
};

export const ThemeContext = createContext(initialContextValue);
