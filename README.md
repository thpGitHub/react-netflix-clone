# NetFlix Clone

[![Netlify Status](https://api.netlify.com/api/v1/badges/82ff5f0f-19d3-41e5-a52d-129490ebb381/deploy-status)](https://app.netlify.com/sites/lovely-moxie-7de9f5/deploys)

1. [Point d'entrée `App.tsx`](#app)
1. [Annexes](#annexes)
    - [`./mocks/index.js`](#mocks)
    - [`./contexts/index.tsx`](#contexts)
    - [`./contexts/authContext.tsx`](#authContext)

---

## Point d'entrée de l'application

`App.tsx` <a name="app"></a>

````typescript
import React, {lazy, Suspense} from 'react'
// ** MSW **
import './mocks'
// ** Contexts **
import {useAuthContext} from './contexts/authContext'
import AppProviders from './contexts'
// ** Dynamic imports
const AuthApp = lazy(() => import(/* webpackPrefetch: true */'./AuthApp'))
const UnauthApp = lazy(() => import('./UnauthApp'))

function App() {
    return (
        <AppProviders>
            <AppConsumer />
        </AppProviders>
    )
}

const AppConsumer = () => {
    const {authUser} = useAuthContext()
    return (
        <Suspense fallback={<div role="alert">Chargement...</div>} >
            {authUser ? <AuthApp /> : <UnauthApp />}
        </Suspense>
    )
}

export default App
````

### Intercepte les requêtes réseau avec `MSW` en fonction de l'environement

````typescript
import './mocks'
````

[détails : `./mocks/index.js`](#mocks)

### Import de tous les providers de l'application : `QueryClientProvider`, `ThemeProvider`, `AuthContextProvider`

````typescript
import AppProviders from './contexts'
````

[détails : `./contexts/index.tsx`](#contexts)

### Import du hook personnalisé `useAuthContext`

 Export `authUser, authError, login, register, logout` pour gérer le context d'authentification

````typescript
import {useAuthContext} from './contexts/authContext'
````

[détails : `./contexts/authContext.tsx`](#authContext)

---

## Annexes <a name="annexes"></a>

### ./mocks/index.js <a name="mocks"></a>

````javascript
if (process.env.NODE_ENV === 'development') {
    console.log("%c process.env.NODE_ENV === ", "color: green;", process.env.NODE_ENV)
    module.exports = require('./browser')
} else if (process.env.NODE_ENV === 'test') {
    console.log("%c process.env.NODE_ENV === ", "color: tomato;", process.env.NODE_ENV)
    module.exports = require('./server_for_run_tests')
} else {
    console.log("%c process.env.NODE_ENV === ", "color: yellow;", process.env.NODE_ENV )
    module.exports = require('./browser')
}
````

### ./contexts/index.tsx <a name="contexts"></a>

````typescript
import React from 'react'
// ** MUI **
import {ThemeProvider, createTheme} from '@mui/material/styles'
// ** REACT Query
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
// ** Contexts
import {AuthContextProvider} from '../contexts/authContext'

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

function AppProviders({children}: any) {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <AuthContextProvider>
                   {children}
                </AuthContextProvider>
            </ThemeProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}

export default AppProviders
````

### ./contexts/authContext.tsx <a name="authContext"></a>

````typescript
import React, {
    useEffect,
    useState,
    createContext,
    useContext,
} from 'react'
// ** utils **
import {clientAuth} from '../utils/clientAPI'
import {useFetchData} from '../utils/hooks'
import * as authNetflix from '../utils/authNetflixProvider'
// ** REACT Query
import {useQueryClient} from '@tanstack/react-query'
// ** MUI **
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

interface IContext {
    authUser: any
    authError: any
    login: ({userName, password}: {userName: string; password: string}) => void
    register: (data: {userName: string; password: string}) => void
    logout: () => void
}

/**
 * This function is two fold in NetflixHeader.tsx
 */
const getUserByToken = async () => {
    let user = null
    const token = await authNetflix.getTokenInLocalStorage()

    if (token) {
        console.log('Token exist :) === ', token)
        const data = await clientAuth('getUserAuth', token)
        // AxiosResponse
        user = data.data.user
        console.log('data ====', data)
        console.log('user ====', user)
    }

    return user
}

const AuthContext = createContext<IContext | null>(null)

const useAuthContext = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error(
            'useAuthContext doit être wrapper dans <AuthContext.provider>',
        )
    }
    return context
}

const AuthContextProvider = (props: any) => {
    const queryClient = useQueryClient()
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
        authNetflix
            .login({userName, password})
            .then(user => setData(user))
            .catch(error => setAuthError(error))
    }

    const register = (data: {userName: string; password: string}) => {
        authNetflix
            .register(data)
            .then(user => setData(user))
            .catch(error => setAuthError(error))
    }

    const logout = () => {
        authNetflix.logout()
        queryClient.clear()
        setData(null)
    }

    if (status === 'fetching' || status === 'idle') {
        return (
            <div role="alert">
                <Backdrop open={true}>
                    <CircularProgress color="primary" />
                </Backdrop>
            </div>
        )
    }

    if (status === 'done') {
        const value = {authUser, authError, login, register, logout}
        return <AuthContext.Provider value={value} {...props} />
    }
    throw new Error('status invalide')
}

export {AuthContext, useAuthContext, AuthContextProvider}
````
