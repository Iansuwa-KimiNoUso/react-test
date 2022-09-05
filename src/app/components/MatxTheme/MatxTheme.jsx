import React from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import MatxCssVars from './MatxCssVars'
import useSettings from 'app/hooks/useSettings'

const MatxTheme = ({ children }) => {
    const { settings } = useSettings()
    let activeTheme = { ...settings.themes[settings.activeTheme] }

    return (
        <ThemeProvider theme={activeTheme}>
            <CssBaseline />
            <MatxCssVars> {children} </MatxCssVars>
        </ThemeProvider>
    )
}

export default MatxTheme
