import { createContext } from 'react'

export const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
  setTheme: () => {},
})

export const THEME_STORAGE_KEY = 'rc-theme'
