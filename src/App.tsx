import React, {useState, useEffect} from 'react'
// ** MSW **
import './mocks'
// ** utils **
import {clientAuth} from './utils/clientAPI'
import {useFetchData} from './utils/hooks'
import * as authNetflix from './utils/authNetflixProvider'
// ** Components **
import AuthApp from './AuthApp'
import UnauthApp from './UnauthApp'
// ** MUI **
import {ThemeProvider, createTheme} from '@mui/material/styles'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

const theme = createTheme({
    palette: {
        // mode: 'dark',
        primary: {
            main: '#E50914',
        },
        secondary: {
            main: '#E50914',
        },
    },
})

// interface Error {
//     name?: string
//     message?: string
//     stack?: string
//     status?: number
//     // code?: number;
// }

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
    // const [authUser, setAuthUser] = useState(null)
    const {data: authUser, status, execute, setData} = useFetchData()
    const [authError, setAuthError] = useState()

    useEffect(() => {
        execute(getUserByToken())
    }, [execute])

    const login = ({
        userName,
        password,
    }: {
        userName: string
        password: string
    }) => {
        console.log(userName, password)
        // authNetflix.login({userName, password}).then(user => setAuthUser(user))
        authNetflix
            .login({userName, password})
            .then(user => setData(user))
            .catch(error => setAuthError(error))
    }

    const register = (data: {userName: string; password: string}) => {
        // authNetflix.register(data).then(user => setAuthUser(user))
        authNetflix
            .register(data)
            .then(user => setData(user))
            .catch(error => setAuthError(error))
        // const user = await authNetflix.register(data)
        // setAuthUser(user)
    }

    const logout = () => {
        authNetflix.logout()
        // setAuthUser(null)
        setData(null)
    }

    return (
        <ThemeProvider theme={theme}>
            {status === 'fetching' ? (
                <Backdrop open={true}>
                    <CircularProgress color="primary" />
                </Backdrop>
            ) : authUser ? (
                <AuthApp logout={logout} />
            ) : (
                <UnauthApp
                    login={login}
                    register={register}
                    error={authError}
                />
            )}
        </ThemeProvider>
    )
}

export default App
