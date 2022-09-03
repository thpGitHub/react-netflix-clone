import React, {useState} from 'react'
import './mocks'
import * as authNetflix from './utils/authNetflixProvider'
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

    const login = async ({
        userName,
        password,
    }: {
        userName: string
        password: string
    }) => {
        console.log(userName, password)
        await authNetflix.login({userName, password}).then((user)=> setAuthUser(user))
    }

    const register = async (data: {userName: string; password: string}) => {
        // console.log('in register in App.tsx')
        await authNetflix.register(data).then((user) => setAuthUser(user))
    }

    const logout = () => {
        authNetflix.logout()
        setAuthUser(null)
    }

    return (
        <ThemeProvider theme={theme}>
            {authUser ? (
                <AuthApp logout={logout}/>
            ) : (
                <UnauthApp login={login} register={register} />
            )}
        </ThemeProvider>
    )
}

export default App
