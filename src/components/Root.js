import React, { useEffect, useState } from 'react'
import ThemeContext from '../context/theme'
import theme from '../jh-ui/theme'
import { addAlert } from '../helpers'

const Root = ({ children }) => {
  const [themeName, setThemeName] = useState()

  useEffect(() => {
    setThemeName(window.__theme)

    window.addEventListener('themeChange', event => {
      setThemeName(event.detail)
    })
  }, [])

  const setTheme = themeName => {
    window.__setPreferredTheme(themeName)
    addAlert(`Theme set to ${themeName}`)
  }

  return (
    <ThemeContext.Provider value={{ theme, themeName, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default Root