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
// ** REACT Query
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
// ** Contexts
import authContext from './contexts/authContext'

const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        useErrorBoundary: true,
        refetchOnWindowFocus: false,
        retryDelay: 500,
        retry: (failureCount, error: any) => {
          if (error.status === 404) return false
          else if (error.status === 401) return false
          else if (failureCount > 3) return false
          else return true
        },
      },
      mutations: {
        useErrorBoundary: false,
        // refetchOnWindowFocus: false,
        retryDelay: 500,
        retry: 1,
        // mutation options
      },
    },
  })

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

/**
 * This function is two fold in NetflixHeader.tsx
 */
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
        queryClient.clear()
        // setAuthUser(null)
        setData(null)
    }

    const props = {authUser, authError, login, register, logout}
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <authContext.Provider value={props}>
                {status === 'fetching' ? (
                    <Backdrop open={true}>
                        <CircularProgress color="primary" />
                    </Backdrop>
                ) : authUser ? (
                    <AuthApp
                        // logout={logout}
                    />
                ) : (
                    <UnauthApp
                        // login={login}
                        // register={register}
                        // error={authError}
                    />
                )}
                </authContext.Provider>
            </ThemeProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}

export default App
