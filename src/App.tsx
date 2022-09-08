import React, {useState, useEffect} from 'react'
// ** MSW **
import './mocks'
// ** utils **
import * as authNetflix from './utils/authNetflixProvider'
import {clientAuth} from './utils/clientAPI'
// ** Components **
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

const getUserByToken = async () => {
    let user = null
    const token = await authNetflix.getTokenInLocalStorage()

    if (token) {
        console.log('Token exist :)')
        const data = await clientAuth('getUserAuth', token)
        // AxiosResponse
        user = data.data.user
        console.log('data ====', data)
        console.log('user ====', user)
    }

    return user
}

function App() {
    const [authUser, setAuthUser] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const user = await getUserByToken()
            setAuthUser(user)
        }
        fetchData()
    }, [])

    const login = ({
        userName,
        password,
    }: {
        userName: string
        password: string
    }) => {
        console.log(userName, password)
        authNetflix.login({userName, password}).then(user => setAuthUser(user))
    }

    const register = (data: {userName: string; password: string}) => {
        authNetflix.register(data).then(user => setAuthUser(user))
        // const user = await authNetflix.register(data)
        // setAuthUser(user)
    }

    const logout = () => {
        authNetflix.logout()
        setAuthUser(null)
    }

    return (
        <ThemeProvider theme={theme}>
            {authUser ? (
                <AuthApp logout={logout} />
            ) : (
                <UnauthApp login={login} register={register} />
            )}
        </ThemeProvider>
    )
}

export default App
