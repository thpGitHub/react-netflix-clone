# NetFlix Clone

[![Netlify Status](https://api.netlify.com/api/v1/badges/82ff5f0f-19d3-41e5-a52d-129490ebb381/deploy-status)](https://app.netlify.com/sites/lovely-moxie-7de9f5/deploys)

1. [Point d'entrée `App.tsx`](#app)
1. [Non Authentifié `<UnauthApp />`](#UnauthApp)
1. [Annexes](#annexes)
    - [`./mocks/index.js`](#mocks)
    - [`./contexts/index.tsx`](#contexts)
    - [`./contexts/authContext.tsx`](#authContext)
    - [`useFetchData`](#useFetchData)
    - [`handlers`](#handlers)

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

- ### Intercepte les requêtes réseau avec `MSW` en fonction de l'environement

````typescript
import './mocks'
````

[détails : `./mocks/index.js`](#mocks)

Utilisation de MSW pour simuler un backend et intercepter les requêtes suivantes et renvoyer des données et/ou faire des actions :

- .post('https://auth.service.mock.com/register')
- .post('https://auth.service.mock.com/login')
- .get('https://auth.service.mock.com/getUserAuth')
- .post('https://auth.service.mock.com/bookmark')
- .post('https://auth.service.mock.com/bookmark/movie')
- .post('https://auth.service.mock.com/bookmark/tv')
- .delete('https://auth.service.mock.com/bookmark/tv')
- .delete('https://auth.service.mock.com/bookmark/movie')

[détails : `src/mocks/handlers.js`](#handlers)

- ### Import de tous les providers de l'application : `QueryClientProvider`, `ThemeProvider`, `AuthContextProvider`

````typescript
import AppProviders from './contexts'
````

[détails : `./contexts/index.tsx`](#contexts)

- ### Import du hook personnalisé `useAuthContext`

````typescript
import {useAuthContext} from './contexts/authContext'
````

Ce hook exporte : `authUser, authError, login, register, logout` pour gérer le context d'authentification.

````typescript
interface IContext {
    authUser: any
    authError: any
    login: ({userName, password}: {userName: string; password: string}) => void
    register: (data: {userName: string; password: string}) => void
    logout: () => void
}
````

[détails : `./contexts/authContext.tsx`](#authContext)

````typescript
const {authUser} = useAuthContext()
````

`authUser` est soit `null` si aucun token dans localstorage ou :

````typescript
{
    "id": "5fC5YseaHL_BH3-M9r0FZ",
    "userName": "caro@hot.com",
    "passwordHash": "$2a$10$63mndiqEmgiN0yLHJVRRHOsL7h/63wm0M940Yw0JXJF6M2jZmGKbK",
    "token": "$2a$10$jQ4ZhJXZemoB4Cgx76eq3e",
    "bookmark": {
        "movies": [
            414906
        ],
        "series": [
            414906,
            60574
        ]
    }
}
````

- ### Découpage dynamique de code avec les imports dynamiques

Cela va nous permettre de fractionner notre bundle et de gagner en performence.  
On est authentifié (AuthApp) ou pas (UnauthApp).

````typescript
const AuthApp = lazy(() => import(/* webpackPrefetch: true */'./AuthApp'))
const UnauthApp = lazy(() => import('./UnauthApp'))
````

La fonction `lazy()` permet d’afficher un composant importé dynamiquement et chargera automatiquement le bundle contenant le composant.

```JSX
<Suspense fallback={<div role="alert">Chargement...</div>} >
    {authUser ? <AuthApp /> : <UnauthApp />}
</Suspense>
```

Un composant importé dynamiquement doit être wrapper dans un composant `Suspense`, qui  permet d’afficher un contenu de repli en attendant que ce module soit chargé.

---

## Non Authentifié `<UnauthApp />` <a name="UnauthApp"></a>

````typescript
import React from 'react'
import LoginRegister from './components/LoginRegister'

const UnauthApp = () => {
    const imageURL = '/images/posters.jpg'

    return (
        <div
            style={{
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                overflow: 'auto',
                position: 'fixed',
                backgroundSize: 'cover',
                backgroundImage: `url('${imageURL}')`,
            }}
        >
            <img
                src="/images/netflix-logo.png"
                alt=""
                style={{margin: '30px'}}
                height={50}
            />

            <LoginRegister />
        </div>
    )
}

export default UnauthApp
````

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

### useFetchData in src\utils\hooks.ts <a name="useFetchData"></a>

````typescript
import React, {useReducer, useCallback} from 'react'
// import {sleep} from './helper'

type ACTIONTYPE =
    | {type: 'fetching'}
    | {type: 'done', payload: any}
    | {type: 'fail', error: any}

interface IState {
    data: null
    error: null
    status: string
}

const reducer = (state: any, action: ACTIONTYPE) => {
    switch (action.type) {
        case 'fetching':
            return {status: 'fetching', data: null, error: null}
        case 'done':
            return {status: 'done', data: action.payload, error: null}
        case 'fail':
            return {status: 'error', data: null, error: action.error}
        default:
            throw new Error('Action non supporté')
    }
}
const initialState: IState = {
    data: null,
    error: null,
    status: 'idle',
}
function useFetchData() {
    const [state, dispatch] = useReducer(reducer, initialState)
    const {data, error, status} = state

    const execute = useCallback((promise: Promise<any>) => {
        dispatch({type: 'fetching'})
        // sleep(4000)
        promise
            .then(marvel => dispatch({type: 'done', payload: marvel}))
            .catch(error => dispatch({type: 'fail', error}))
    }, [])

    const setData = useCallback(
        (data: any) => dispatch({type: 'done', payload: data}),
        [dispatch],
    )

    return {data, error, status, execute, setData}
}

export {useFetchData}
````

### handlers <a name="handlers"></a>

````javascript
import {rest} from 'msw'
import * as usersDB from './db'

export const handlers = [
    rest.post(
        'https://auth.service.mock.com/register',
        async (req, res, ctx) => {
            const {userName, password} = req.body
            const userFields = {userName, password}
            const user = await usersDB.createUser(userFields)

            return res(ctx.json(user))
        },
    ),

    rest.post('https://auth.service.mock.com/login', async (req, res, ctx) => {
        const {userName, password} = req.body
        const userFields = {userName, password}
        const userLogin = await usersDB.authenticateUserForLogin(userFields)

        return res(
            ctx.status(202, 'Mocked status'),
            ctx.json(userLogin),
        )
    }),
    rest.get(
        'https://auth.service.mock.com/getUserAuth',
        async (req, res, ctx) => {
            const token = req?.headers
                .get('Authorization')
                .replace('Bearer ', '')

            const user = await usersDB.getUserWithTokenInLocalStorage(token)
            return res(
                ctx.status(202, 'Mocked status'),
                ctx.json({user: user}),
            )
        },
    ),
    rest.post(
        'https://auth.service.mock.com/bookmark',
        async (req, res, ctx) => {
            const authUser = req.body.data

            return res(
                ctx.status(202, 'Mocked status'),
                ctx.json(authUser),
            )
        },
    ),
    rest.post(
        'https://auth.service.mock.com/bookmark/movie',
        async (req, res, ctx) => {
            const authUser = req.body.data
            const {bookmark} = req.body.data
            const {id: movieID} = req.body.movie

            const newAuthUser = await usersDB.addBookmarkMovieInLocalStorage(
                movieID,
                authUser,
            )

            return res(
                ctx.status(202, 'Mocked status'),
                ctx.json(newAuthUser),
            )
        },
    ),
    rest.post(
        'https://auth.service.mock.com/bookmark/tv',
        async (req, res, ctx) => {
            const authUser = req.body.data
            const {id: serieID} = req.body.movie
            const newAuthUser = await usersDB.addBookmarkSerieInLocalStorage(
                serieID,
                authUser,
            )

            return res(ctx.status(202, 'Mocked status'), ctx.json(newAuthUser))
        },
    ),
    rest.delete(
        'https://auth.service.mock.com/bookmark/tv',
        async (req, res, ctx) => {
            const authUser = req.body.data
            const {id: serieID} = req.body.movie
            const newAuthUser = await usersDB.deleteBookmarkSerieInLocalStorage(
                serieID,
                authUser,
            )

            return res(ctx.status(202, 'Mocked status'), ctx.json(newAuthUser))
        },
    ),
    rest.delete(
        'https://auth.service.mock.com/bookmark/movie',
        async (req, res, ctx) => {
            const authUser = req.body.data
            const {id: movieID} = req.body.movie
            const newAuthUser = await usersDB.deleteBookmarkMovieInLocalStorage(
                movieID,
                authUser,
            )

            return res(ctx.status(202, 'Mocked status'), ctx.json(newAuthUser))
        },
    ),
]
````
