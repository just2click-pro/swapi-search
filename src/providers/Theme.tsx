import { FC, useContext, useMemo } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles'

import { ChosenTheme } from './ChosenTheme'

export const ThemeProvider: FC<any> = ({ children }) => {
  const { theme } = useContext(ChosenTheme)
  const muiTheme = useMemo(() => createThemeHelper(theme), [theme])

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  )
}

const brandColor = 'rgb(255, 227, 0)'
const darkBrandColor = 'rgb(39, 43, 48)'
const createThemeHelper = (theme: 'dark' | 'light') => {
  const isDark = theme === 'dark'
  return createTheme({
    palette: {
      mode: theme,
      background: {
        default: isDark ? '#303030' : '#f0f0f0',
        paper: isDark ? brandColor : darkBrandColor
      },
      primary: {
        main: isDark ? brandColor : darkBrandColor,
        contrastText: isDark ? darkBrandColor : brandColor,
        dark: darkBrandColor,
        light: brandColor
      },
      error: {
        main: 'rgb(232, 51, 51)'
      },
      success: {
        main: 'rgb(76,175,80)'
      }
    }
  })
}
