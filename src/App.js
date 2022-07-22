import React, {useState} from 'react'
// **Components **
import AuthApp from './AuthApp'
import UnauthApp from './UnauthApp'
// ** MUI **
import {ThemeProvider, createTheme} from '@mui/material/styles'

const theme = createTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#E50914',
        },
        secondary: {
            main: '#E50914',
        },
    },
})

function App() {
    const [authUser, setAuthUser] = useState(null)

    return (
        <ThemeProvider theme={theme}>
            {authUser ? <AuthApp /> : <UnauthApp />}
        </ThemeProvider>
    )
}

export default App
