import React, { createContext, useState, useContext, useMemo } from "react";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import grey from '@material-ui/core/colors/grey';
import yellow from '@material-ui/core/colors/yellow';
import red from '@material-ui/core/colors/red';
import lightblue from "@material-ui/core/colors/lightBlue";
import deeporange from "@material-ui/core/colors/deepOrange";

export const ThemeDispatchContext = createContext()
export const ThemeStateContext = createContext()

import createBreakpoints from '@material-ui/core/styles/createBreakpoints'

const commonSettings = {
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
    overrides: {
        MuiCssBaseline: {
            '@global': {
                html: {
                    WebkitFontSmoothing: 'auto',
                },
                ul: {
                    listStyle: 'none',
                }
            },
        },
        MuiTypography: {
            body1: {
                fontSize: "18px",
                lineHeight: 1.2395,
                '@media (min-width:600px)': {
                    fontSize: '14px',
                    lineHeight: 1.2475,
                },
            },
            h6: {
                fontSize: "18px",
                fontWeight: 400,
                lineHeight: 1.2395,
            }
        }
    },

    props: {
        MuiButtonBase: {
            disableRipple: true,
        },
        MuiListRoot: {
            color: "#988534"
        }
    },
}

const lightTheme = createMuiTheme({
    palette: {
        type: 'light',
        primary: {
            main: '#ff3200'
            // main: '#39AB10'
        },
        secondary: {
            main: grey[900]
        }
    },
    ...commonSettings
})

const darkTheme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            main: yellow[600]
        },
        secondary: {
            main: lightblue[500]
        },
        background: {
            default: '#000',
        },
    },
    ...commonSettings
})

export const ThemeContextProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false)
    const [value, setValue] = useState('search')
    const [meta, setMeta] = useState(true)
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    useMemo(
        () =>
            prefersDarkMode ?
                setDarkMode(true)
                : setDarkMode(false),
        [prefersDarkMode],
    );

    return (
        <ThemeDispatchContext.Provider
            value={{
                darkMode,
                setDarkMode,
                value,
                setValue,
                meta,
                setMeta
            }}>
            <ThemeStateContext.Provider
                value={{commonSettings}}
            >
                <ThemeProvider theme={darkMode ?
                    darkTheme
                    : lightTheme}>
                {children}
                </ThemeProvider>
            </ThemeStateContext.Provider>
        </ThemeDispatchContext.Provider>
    )
}

export const useDispatchTheme = () => useContext(ThemeDispatchContext)
export const useThemeState = () => useContext(ThemeStateContext)