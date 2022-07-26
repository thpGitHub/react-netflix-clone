import React, {useState} from 'react'
import './mocks'
// **Components **
import AuthApp from './AuthApp'
import UnauthApp from './UnauthApp'
// ** MUI **
import {ThemeProvider, createTheme} from '@mui/material/styles'

const theme = createTheme({
    palette: {
        // type: 'dark',
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

    const login = () => {}

    const register = () => {}

    return (
        <ThemeProvider theme={theme}>
            {authUser ? (
                <AuthApp />
            ) : (
                <UnauthApp login={login} register={register} />
            )}
        </ThemeProvider>
    )
}

export default App
