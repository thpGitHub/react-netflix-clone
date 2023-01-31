# NetFlix Clone

[![Netlify Status](https://api.netlify.com/api/v1/badges/82ff5f0f-19d3-41e5-a52d-129490ebb381/deploy-status)](https://app.netlify.com/sites/lovely-moxie-7de9f5/deploys)
[![CircleCI](https://dl.circleci.com/status-badge/img/gh/thpGitHub/react-netflix-clone/tree/main.svg?style=shield)](https://dl.circleci.com/status-badge/redirect/gh/thpGitHub/react-netflix-clone/tree/main)
[![CodeFactor](https://www.codefactor.io/repository/github/thpgithub/react-netflix-clone/badge/main)](https://www.codefactor.io/repository/github/thpgithub/react-netflix-clone/overview/main)

1. [Point d'entrée `App.tsx`](#app)
    - [Non Authentifié `<UnauthApp />`](#unauthapp)
    - [Authentifié `<AuthApp />`](#authapp)
        - [`<Route path="/" element={<NetflixApp />} /`>](#netflixapp)
            - [`useGetOneMovie`](#hooksmovies)
                - [`clientUseApiTheMovieDB`](#clientapi)
            - [`<NetflixAppBar />`](#netflixappbar)
                - [`navigate(`/search/${searchQuery}`)`](#search)
            - [`<NetflixHeader />`](#netflixheader)
            - [`<NetflixRow />`](#netflixrow)
            - [`<NetflixFooter />`](#netflixfooter)
1. [Annexes](#annexes)
    - [`./mocks/index.js`](#mocks)
    - [`./contexts/index.tsx`](#contexts)
    - [`./contexts/authContext.tsx`](#authcontext)
    - [`useFetchData`](#usefetchdata)
    - [`handlers`](#handlers)
    - [`src/utils/hooksMovies.tsx`](#hooksmovies)
    - [`src/utils/clientAPI.ts`](#clientapi)

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
    authUser: User
    authError: any
    login: ({userName, password}: {userName: string; password: string}) => void
    register: (data: {userName: string; password: string}) => void
    logout: () => void
}

type User = {
    id: string
    userName: string
    passwordHash: string
    token: string
    bookmark: {
        movies: number[]
        series: number[]
    }
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

Cela va nous permettre de fractionner notre bundle et de gagner en performance.  
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

## Non Authentifié `<UnauthApp />` <a name="unauthapp"></a>

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

- `<LoginRegister />`

Le composant `<LoginRegister />` contient deux composants `<PopupLogin />` qui est le point d'entré et `<FormLogin />`

````typescript
import React, {useState, useContext} from 'react'
// *** MUI ***
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Alert from '@mui/material/Alert'
// ** Contexts **
import {AuthContext} from '../contexts/authContext'

interface IProps {
    signUp?: boolean
    createLoginCount?: boolean
    login: ({userName, password}: {userName: string; password: string}) => void
    register: ({
        userName,
        password,
    }: {
        userName: string
        password: string
    }) => void
    error?: any
}

const FormLogin = ({createLoginCount = true, login, register}: IProps) => {
    const [userName, setUserName] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const labelButton = createLoginCount ? 'Inscrivez-vous' : 'Connexion'

    return (
        // <form autoComplete="off" onSubmit={handleSubmit}>
        <form autoComplete="off">
            <TextField
                id="filled-basic-username"
                type="email"
                label="Email ou numéro de téléphone"
                margin="dense"
                variant="filled"
                onChange={e => setUserName(e.target.value)}
                autoFocus
                fullWidth
            />
            <TextField
                id="filled-basic-password"
                type="password"
                label="Mot de passe"
                margin="dense"
                onChange={e => setPassword(e.target.value)}
                variant="filled"
                fullWidth
            />
            {createLoginCount ? (
                <>
                    <Button
                        variant="contained"
                        fullWidth
                        // type="submit"
                        onClick={() => register({userName, password})}
                    >
                        {labelButton}
                    </Button>
                </>
            ) : (
                <>
                    <Button
                        variant="contained"
                        fullWidth
                        // type="submit"
                        onClick={() => login({userName, password})}
                    >
                        {labelButton}
                    </Button>
                </>
            )}

            <FormGroup>
                <FormControlLabel
                    style={{
                        paddingLeft: '24px',
                        paddingRight: '24px',
                        justifyContent: 'flex-start',
                    }}
                    control={<Checkbox defaultChecked />}
                    label="Se souvenir de moi"
                />
            </FormGroup>
        </form>
    )
}

const PopupLogin = ({signUp = false}) => {
    const {login, register, authError: error}: any = useContext(AuthContext)
    const [createLogin, setCreateLogin] = useState(signUp)
    const [open] = React.useState(true)

    const labelTitle = createLogin ? 'Inscrivez-vous' : 'Connexion'

    const handleSignUp = () => {
        setCreateLogin(true)
    }
    const handleSignIn = () => {
        setCreateLogin(false)
    }

    return (
        <div>
            <Dialog open={open} style={{backgroundColor: 'transparent'}}>
                <DialogTitle>{labelTitle}</DialogTitle>
                <DialogContent>
                    <FormLogin
                        createLoginCount={createLogin}
                        login={login}
                        register={register}
                    />
                    {error ? (
                        <Alert severity="error">Erreur : {error.message}</Alert>
                    ) : null}
                </DialogContent>
                <DialogActions
                    style={{
                        justifyContent: 'flex-start',
                    }}
                >
                    {!createLogin ? (
                        <Button onClick={handleSignUp}>
                            Nouveau sur Netflix ?
                        </Button>
                    ) : (
                        <Button onClick={handleSignIn}>
                            Vous posséder déjà un compte ?
                        </Button>
                    )}
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default PopupLogin
````

---

## Authentifié `<AuthApp />` <a name="authapp"></a>

Le composant `<AuthApp />` contient les routes de l'application.

````typescript
import React from 'react'
import {ErrorBoundary} from 'react-error-boundary'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
// **Components **
import Page404 from './components/Error404'
import NetflixApp from './components/NetflixApp'
import NetflixById from './components/NetflixById'
import NetflixNews from './components/NetflixNews'
import ErrorFallback from './components/ErrorFallback'
import NetflixMovies from './components/NetflixMovies'
import NetflixSearch from './components/NetflixSearch'
import NetflixSeries from './components/NetflixSeries'
import NetflixBookmark from './components/NetflixBookmark'

const AuthApp = () => {
    return (
        <Router>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Routes>
                    <Route path="/" element={<NetflixApp />} />
                    <Route path="/tv/:tvId" element={<NetflixById />}></Route>
                    <Route
                        path="/movie/:movieId"
                        element={<NetflixById />}
                    ></Route>
                    <Route path="/series" element={<NetflixSeries />} />
                    <Route path="/movies" element={<NetflixMovies />} />
                    <Route path="/news" element={<NetflixNews />} />
                    <Route path="/list" element={<NetflixBookmark />} />
                    <Route path="/search/:query" element={<NetflixSearch />} />
                    <Route path="*" element={<Page404 />} />
                </Routes>
            </ErrorBoundary>
        </Router>
    )
}

export default AuthApp
````

- `<Route path="/" element={<NetflixApp />} />` <a name="netflixapp"></a>

````typescript
import React, {useState} from 'react'
import './Netflix.css'
// ** Components **
import NetflixRow from './NetflixRow'
import NetflixAppBar from './NetflixAppBar'
import NetflixFooter from './NetflixFooter'
import NetflixHeader from './NetflixHeader'
// ** Utils **
import {TYPE_MOVIE, TYPE_TV} from '../const'
import {getRandomType, getRandomId} from '../utils/helper'
import {useGetOneMovie} from '../utils/hooksMovies'

const NetflixApp = () => {
    const [type] = useState(getRandomType())
    const [defaultMovieId] = useState(getRandomId(type))
    const headerMovie = useGetOneMovie(type, defaultMovieId)

    return (
        <div>
            <NetflixAppBar />
            <NetflixHeader movie={headerMovie?.data} type={type} />

            <NetflixRow
                type={TYPE_MOVIE}
                title="Films Netflix"
                filter="trending"
                watermark={true}
                wideImage={true}
            />

            <NetflixRow
                type={TYPE_TV}
                title="Séries Netflix"
                filter="trending"
                watermark={true}
                wideImage={false}
            />

            <NetflixRow
                type={TYPE_MOVIE}
                title="Les mieux notés"
                filter="toprated"
                watermark={true}
                wideImage={false}
            />

            <NetflixRow
                type={TYPE_TV}
                param="10759"
                title="Action & aventure"
                filter="genre"
                watermark={true}
                wideImage={false}
            />

            <NetflixRow
                type={TYPE_MOVIE}
                param="53"
                title="Les meilleurs thrillers"
                filter="genre"
                watermark={true}
                wideImage={false}
            />

            <NetflixFooter />
        </div>
    )
}

export default NetflixApp
````

````javascript
const headerMovie = useGetOneMovie(type, defaultMovieId)
````

[détails useGetOneMovie : `src/utils/hooksMovies.tsx`](#hooksmovies)

Exemple de `headerMovie` avec `type = movie`

````JSON
{
    "data": {
        "adult": false,
        "backdrop_path": "/inJjDhCjfhh3RtrJWBmmDqeuSYC.jpg",
        "belongs_to_collection": {
            "id": 535313,
            "name": "Godzilla - Saga",
            "poster_path": "/inNN466SKHNjbGmpfhfsaPQNleS.jpg",
            "backdrop_path": "/oboBn4VYB79uDxnyIri0Nt3U3N2.jpg"
        },
        "budget": 200000000,
        "genres": [
            {
                "id": 28,
                "name": "Action"
            },
            {
                "id": 14,
                "name": "Fantastique"
            },
            {
                "id": 878,
                "name": "Science-Fiction"
            }
        ],
        "homepage": "",
        "id": 399566,
        "imdb_id": "tt5034838",
        "original_language": "en",
        "original_title": "Godzilla vs. Kong",
        "overview": "À une époque où les monstres parcourent la Terre, et alors que l’humanité lutte pour son avenir, Godzilla et King Kong, les deux forces les plus puissantes de la nature, entrent en collision dans une bataille spectaculaire inédite. Alors que Monarch se lance dans une mission périlleuse en terrain inconnu, et qu’il découvre des indices sur les origines des Titans, un complot humain menace d’éradiquer ces créatures – qu’elles soient bonnes ou mauvaises – de la surface de la planète.",
        "popularity": 163.734,
        "poster_path": "/4bTShLVFnVKK31cowgjdAIZV84T.jpg",
        "production_companies": [
            {
                "id": 923,
                "logo_path": "/5UQsZrfbfG2dYJbx8DxfoTr2Bvu.png",
                "name": "Legendary Pictures",
                "origin_country": "US"
            }
        ],
        "production_countries": [
            {
                "iso_3166_1": "US",
                "name": "United States of America"
            }
        ],
        "release_date": "2021-03-24",
        "revenue": 470067014,
        "runtime": 113,
        "spoken_languages": [
            {
                "english_name": "English",
                "iso_639_1": "en",
                "name": "English"
            }
        ],
        "status": "Released",
        "tagline": "Deux rois. Un seul trône.",
        "title": "Godzilla vs. Kong",
        "video": false,
        "vote_average": 7.714,
        "vote_count": 8492
    },
    "status": 200,
    "statusText": "",
    "headers": {
        "access-control-allow-origin": "*",
        "access-control-expose-headers": "*",
        "alt-svc": "h3=\":443\"; ma=86400",
        "cache-control": "public, max-age=28800",
        "content-encoding": "br",
        "content-type": "application/json;charset=utf-8",
        "date": "Mon, 16 Jan 2023 09:39:01 GMT",
        "etag": "W/\"0f495e7edd7a5d4e4ee2bcd6eec7b910\"",
        "server": "openresty",
        "vary": "Accept-Encoding,Accept-Encoding,Accept-Encoding",
        "via": "1.1 ec0e2f034bee82259de23281111aa344.cloudfront.net (CloudFront)",
        "x-amz-cf-id": "kKzO-EpNZa7VHh3DCeihbVJVPk_b8jGUT3oCe5JG1HKo4-7F-k3kFw==",
        "x-amz-cf-pop": "CDG50-C1",
        "x-cache": "Miss from cloudfront",
        "x-memc": "MISS, STORE",
        "x-memc-age": "0",
        "x-memc-expires": "17160",
        "x-memc-key": "035815e165b0443daf3e4f7e901c9f9a6c62ad65"
    },
    "config": {
        "transitional": {
            "silentJSONParsing": true,
            "forcedJSONParsing": true,
            "clarifyTimeoutError": false
        },
        "transformRequest": [
            null
        ],
        "transformResponse": [
            null
        ],
        "timeout": 0,
        "xsrfCookieName": "XSRF-TOKEN",
        "xsrfHeaderName": "X-XSRF-TOKEN",
        "maxContentLength": -1,
        "maxBodyLength": -1,
        "env": {
            "FormData": null
        },
        "headers": {
            "Accept": "application/json, text/plain, */*"
        },
        "method": "get",
        "url": "https://api.themoviedb.org/3/movie/399566?api_key=<<api_key>>c&language=fr-fr&page=1"
    },
    "request": {}
}
````

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

### ./contexts/authContext.tsx <a name="authcontext"></a>

````typescript
import React, {useEffect, useState, createContext, useContext, ReactNode} from 'react'
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
    authUser: User
    authError: any
    login: ({userName, password}: {userName: string; password: string}) => void
    register: (data: {userName: string; password: string}) => void
    logout: () => void
}

type User = {
    id: string
    userName: string
    passwordHash: string
    token: string
    bookmark: {
        movies: number[]
        series: number[]
    }
}

type AuthContextProviderProps = {
    children: ReactNode
}

/**
 * This function is two fold in NetflixHeader.tsx
 */
const getUserByToken = async () => {
    let user: User | null = null
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

// const AuthContext = createContext<IContext | null>(null)
const AuthContext = createContext<IContext>(null!)

const useAuthContext = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error(
            'useAuthContext doit être wrapper dans <AuthContext.provider>',
        )
    }
    return context
}

// const AuthContextProvider = (props: any) => {
const AuthContextProvider = ({children}: AuthContextProviderProps) => {
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

    console.log('status === ', status)

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
        return <AuthContext.Provider value={value} children={children} />
    }
    throw new Error('status invalide')
}

export {AuthContext, useAuthContext, AuthContextProvider}
````

### useFetchData in src\utils\hooks.ts <a name="usefetchdata"></a>

Le hook personnalisé `useFetchData` est utilisé une seule fois dans le context `AuthContext.tsx`

````typescript
import React, {useReducer, useCallback} from 'react'
// import {sleep} from './helper'

type ACTIONTYPE =
    | {type: 'fetching'}
    | {type: 'done'; payload: any}
    | {type: 'fail'; error: any}

interface IState {
    data: null
    error: null
    status: string
}

interface ReturnUseFetchData {
    data: any
    error: any
    status: string
    execute: (promise: Promise<any>) => void
    setData: (data: any) => void
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
function useFetchData(): ReturnUseFetchData {
// function useFetchData(): any {
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

### hooksMovies.tsx <a name="hooksmovies"></a>

````typescript
// ** Utils **
import {clientUseApiTheMovieDB, clientAuth} from './clientAPI'
import * as authNetflix from './authNetflixProvider'
// ** REACT Query **
import {useQuery} from '@tanstack/react-query'

const useGetOneMovie = (TYPE_MOVIE: string, id: number) => {
    const {data} = useQuery([`${TYPE_MOVIE}/${id}`], () =>
    clientUseApiTheMovieDB(`${TYPE_MOVIE}/${id}`),
    )
    console.log('data in useGetOneMovie', data);
    
    return data
}

const useMovieEndpoint = (type: string, filter: string, param: string) => {
    const endpointLatest = `${type}/upcoming`
    const endpointPopular = `${type}/popular`
    const endpointTopRated = `${type}/top_rated`
    const endpointGenre = `discover/${type}?with_genres=${param}`
    const endpointTrending = `trending/${type}/day`

    let endpoint: string = ''

    switch (filter) {
        case 'populaire':
            endpoint = endpointPopular
            break
        case 'latest':
            endpoint = endpointLatest
            break
        case 'toprated':
            endpoint = endpointTopRated
            break
        case 'genre':
            endpoint = endpointGenre
            break
        case 'trending':
            endpoint = endpointTrending
            break

        default:
            throw new Error('Type non supporté')
    }

    const {data} = useQuery([`${endpoint}`], () => clientUseApiTheMovieDB(endpoint))

    return data
}

/**
 * This function is two fold in App.tsx
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

const useBookmark = () => {
    const {data} = useQuery(['bookmark'], () => {
        return getUserByToken()
    })
    return data
}

const useSearchMovie = (query: string) => {
    const {data} = useQuery([`search/multi?query=${query}`], () =>
    clientUseApiTheMovieDB(`search/multi?query=${query}`),
    )
    console.log('data in useSearchMovie === ', data);
    
    return data?.data?.results ?? []
  }

export {useGetOneMovie, useMovieEndpoint, useBookmark, useSearchMovie}
````

- Utilisation de la librairie `React Query`

`React Query` nous permet le `data-fetching` et surtout la mise en cache des requêtes afin de gagner en performances. `useQuery` remplace ici `useEffect`.

````typescript
const {data} = useQuery([`${TYPE_MOVIE}/${id}`], () =>
    clientUseApiTheMovieDB(`${TYPE_MOVIE}/${id}`),
)
````

### clientAPI.ts <a name="clientapi"></a>

````typescript
import axios from 'axios'
// ** Constants **
import {API_KEY_THEMOVIEDB, LANG, API_URL_THEMOVIEDB} from '../const'
// ** Utils **
import * as authNetflix from '../../src/utils/authNetflixProvider'
// import {sleep} from './helper'

/*
 * fetch on : https://api.themoviedb.org/3
 * endpoint exemple : 'tv/71446'
 * https://api.themoviedb.org/3/tv/71446?api_key=<<key_api>>&language=fr-fr&page=1
 */
const clientUseApiTheMovieDB = async (endpoint: string) => {
    const page = 1
    const startChar = endpoint.includes('?') ? `&` : `?`
    // await sleep(4000)
    const keyLang = `${startChar}api_key=${API_KEY_THEMOVIEDB}&language=${LANG}&page=${page}`
    //API_URL = https://api.themoviedb.org/3

    // on catch ici l'erreur retourné par tmdb afin de personaliser le
    // message dans errorBoundary
    // retour tmdb quand mauvais id :
    // status_code:34
    // status_message: "The resource you requested could not be found."
    // success: false
    return axios.get(`${API_URL_THEMOVIEDB}/${endpoint}${keyLang}`).catch(error => {
        if (error.response) {
            const err = {
                ...error.response,
                message: error.response?.data?.status_message,
            }
            return Promise.reject(err)
        } else {
            return Promise.reject(error)
        }
    })
}

/*
 * Catch by MSW
 */
const clientAuth = async (endPoint: string, token: string) => {
    // await sleep(4000)
    const config: any = {
        headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
            // Authorization: `Bearer ${token}`
        },
    }
    return axios.get(`https://auth.service.mock.com/${endPoint}`, config)
    // https://auth.service.mock.com/getUserAuth
}

/*
 * Catch by MSW
 */
const clientNetflix = (
    endpoint: string,
    {data, method = 'get', movie}: any,
) => {
    const config: any = {
        method,
        url: `https://auth.service.mock.com/${endpoint}`,
        data: {data, movie},
        headers: {
            Authorization: data.token ? `Bearer ${data.token}` : undefined,
        },
    }
    return (
        axios(config)
            .then(response => {
                console.log('response data ', response?.data)
                console.log('movie ', movie)
                return response.data
            })
            .catch(error => {
                if (error?.response?.status === 401) {
                    authNetflix.logout()
                    return Promise.reject({
                        message: 'Authentification incorrecte',
                    })
                }
                if (error.response) {
                    return Promise.reject(error.response.data)
                } else {
                    return Promise.reject(error)
                }
            })
    )
}

export {clientUseApiTheMovieDB, clientAuth, clientNetflix}
````

### `<NetflixAppBar />` <a name="netflixappbar"></a>

````typescript
import React, {useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
// ** Contexts **
import {useAuthContext} from '../contexts/authContext'
// ** MUI **
import SearchIcon from '@mui/icons-material/Search'
import MenuSharpIcon from '@mui/icons-material/MenuSharp'
// ** Styled components **
import styled from 'styled-components'
import {createGlobalStyle} from 'styled-components'
// ** Utils **
import device from '../utils/style/breakpoints'

/**
 * `require` For fix typescript error : Cannot find module
 * Another way :
 * tsconfig : "include": ["src", "index.d.ts"]
 * and add file : index.d.ts with :
 * declare module '*.png';
 * declare module '*.jpg';
 */
const NetflixLogo = require('../assets/images/netflixlogo.png')

const GlobalStyle = createGlobalStyle<{displayBurgerMenu: 'none' | 'flex'}>`
    body {
      overflow: ${({displayBurgerMenu}) =>
          displayBurgerMenu === 'none' ? 'auto' : 'hidden'}
      }
`

const ButtonBurger = styled.button`
    color: #fff;
    background: none;
    border: none;
    cursor: pointer;
    @media ${device.sm} {
        display: none;
    }
`

const Wrapper = styled.div<{
    backgroundStyle: 'transparent' | '#111'
    displayBurgerMenu: 'none' | 'flex'
}>`
    width: 100%;
    display: flex;
    padding: 0 12px;
    z-index: 1111;
    position: fixed;
    flex-wrap: wrap;
    font-size: 1.25rem;
    min-height: 64px;
    align-items: center;
    letter-spacing: 0.0075em;
    background: ${({backgroundStyle}) => backgroundStyle};
    transition: background 4s ease-out;
    @media screen and (max-width: 768px) {
        background: ${({displayBurgerMenu}) =>
            displayBurgerMenu === 'none'
                ? ({backgroundStyle}) => backgroundStyle
                : '#111'};
    }
`

const Nav = styled.nav<{displayBurgerMenu: 'none' | 'flex'}>`
    margin-left: auto;
    @media screen and (max-width: 768px) {
        top: 64px;
        left: 0;
        width: 100vw;
        height: 100vh;
        display: ${({displayBurgerMenu}) => displayBurgerMenu};
        position: absolute;
        flex-direction: column;
        background-color: #111;
    }
`

const StyledLink = styled(Link)`
    color: #fff;
    padding: 0 5px;
    text-decoration: none;
    @media screen and (max-width: 768px) {
        padding: 15px 4%;
    }
`

const Search = styled.div`
    color: #fff;
    /* display: flex; */
    opacity: 0.4;
    padding: 8px;
    background: #111;
    margin-right: 10px;
    border-radius: 5px;
    &:focus-within {
        opacity: 1;
    }
    label {
        display: flex;
    }
`

const ImgLogoNetflix = styled.img`
    max-width: 100px;
    // object-fit: contain;
    @media screen and (max-width: 768px) {
        max-width: 80px;
    }
`
const ImgAvatarForLogout = styled.img`
    width: 30px;
    cursor: pointer;
    @media screen and (max-width: 320px) {
        width: 20px;
    }
`

const Actions = styled.div`
    display: flex;
    align-items: center;
    margin-left: auto;
`
const InputSearch = styled.input`
    color: #fff;
    border: none;
    outline: none;
    max-width: 100px;
    background: #0000;
    @media screen and (max-width: 768px) {
        max-width: 80px;
    }
`

const NetflixAppBar = () => {
    const navigate = useNavigate()
    const {logout} = useAuthContext()
    const [backgroundStyle, setBackgroundStyle] =
        useState<'transparent' | '#111'>('transparent')

    const [displayBurgerMenu, setDisplayBurgerMenu] =
        useState<'none' | 'flex'>('none')

    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        const onScroll = (e: Event) => {
            const window = e.currentTarget as Window
            let currentPosition = window.scrollY
            console.log({currentPosition: currentPosition})

            if (currentPosition > 100) {
                setBackgroundStyle('#111')
            } else {
                setBackgroundStyle('transparent')
            }
        }
        window.addEventListener('scroll', onScroll)

        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const handlerDisplayBurgerMenu = () => {
        setDisplayBurgerMenu(displayBurgerMenu === 'none' ? 'flex' : 'none')
    }

    const handleSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value)
    }

    const handleKeyEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            navigate(`/search/${searchQuery}`)
        }
    }

    return (
        <Wrapper
            backgroundStyle={backgroundStyle}
            displayBurgerMenu={displayBurgerMenu}
        >
            <GlobalStyle displayBurgerMenu={displayBurgerMenu} />
            <ButtonBurger onClick={handlerDisplayBurgerMenu}>
                <MenuSharpIcon />
            </ButtonBurger>
            <ImgLogoNetflix src={NetflixLogo} alt="Netflix" />
            <Nav displayBurgerMenu={displayBurgerMenu}>
                <StyledLink className="nav__link" to="/">
                    Accueil
                </StyledLink>
                <StyledLink className="nav__link" to="/series">
                    Series
                </StyledLink>
                <StyledLink className="nav__link" to="/movies">
                    Movies
                </StyledLink>
                <StyledLink className="nav__link" to="/news">
                    News
                </StyledLink>
                <StyledLink className="nav__link" to="/list">
                    List
                </StyledLink>
            </Nav>
            <Actions>
                <Search>
                    <label>
                        <SearchIcon />
                        <InputSearch
                            type="search"
                            value={searchQuery}
                            onChange={handleSearchQuery}
                            onKeyDown={handleKeyEnter}
                            aria-label="search"
                            placeholder="Search…"
                        />
                    </label>
                </Search>
                <ImgAvatarForLogout
                    alt="netflix avatar"
                    src="/images/netflix-avatar.png"
                    onClick={logout}
                />
            </Actions>
        </Wrapper>
    )
}

export default NetflixAppBar
````

### `<NetflixSearch />` <a name="search"></a>



### `<NetflixHeader />` <a name="netflixheader"></a>

````typescript
import React, {useState} from 'react'
import {AxiosData} from '../ts/interfaces/axiosData'
import useDimension from '../hooks/useDimension'
import HeaderSkeleton from './skeletons/HeaderSkeleton'
import {clientNetflix} from '../utils/clientAPI'
import {IMAGE_URL, TYPE_MOVIE} from '../const'
// *** MUI ***
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, {AlertProps} from '@mui/material/Alert'
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded'
// ** REACT Query
import {useBookmark} from '../utils/hooksMovies'
import {useMutation, useQueryClient} from '@tanstack/react-query'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

interface IProps {
    movie: AxiosData | undefined
    type: string
}

const NetflixHeader = ({movie, type = TYPE_MOVIE}: IProps) => {
    const queryClient = useQueryClient()
    const [snackbarOpen, setSnackbarOpen] = React.useState(false)
    const [mutateBookmarkError, setMutateBookmarkError] = useState<any>()

    const data = useBookmark()

    const addMutation = useMutation(
        async () => {
            return clientNetflix(`bookmark/${type}`, {
                method: 'POST',
                data,
                movie,
            })
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['bookmark'])
                setSnackbarOpen(true)
                setMutateBookmarkError(null)
            },
            onError: error => {
                setSnackbarOpen(true)
                setMutateBookmarkError(error)
            },
        },
    )

    const deleteMutation = useMutation(
        async () => {
            return clientNetflix(`bookmark/${type}`, {
                method: 'DELETE',
                data,
                movie,
            })
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['bookmark'])
                setSnackbarOpen(true)
                setMutateBookmarkError(null)
            },
            onError: error => {
                setSnackbarOpen(true)
                setMutateBookmarkError(error)
            },
        },
    )

    const title = type === TYPE_MOVIE ? movie?.title : movie?.name

    let imageWidth = 1280

    const browserWidth: number | undefined = useDimension()
    console.log('browserWidth', browserWidth)

    if (browserWidth && browserWidth >= 780 && browserWidth < 1280) {
        console.log('780 - 1280')
        imageWidth = 780
    }
    if (browserWidth && browserWidth < 780) {
        console.log('--- 780')
        imageWidth = 300
    }
    /*
     * official sizes : https://www.themoviedb.org/talk/5ff32c1467203d003fcb7a21
     * backdrop_sizes : "w300" "w780" "w1280"
     */
    const imageURL = `${IMAGE_URL}w${imageWidth}/${movie?.backdrop_path}`
    // const imageURL = `https://image.tmdb.org/t/p/w1280/${movie?.backdrop_path}`

    const banner: React.CSSProperties = {
        color: 'white',
        height: '448px',
        objectFit: 'contain',
        backgroundSize: 'cover',
        backgroundImage: `url('${imageURL}')`,
        backgroundPosition: 'center center',
    } 

    const handleAddToBookmark = async () => {
        addMutation.mutate()
    }
    const handleDeleteToBookmark = async () => {
        deleteMutation.mutate()
    }

    /*
     * props type = movie or tv
     * authUser.bookmark = {movies: [], series: []}
     */
    // const isInBookmark = false
    const isInBookmark = data?.bookmark[
        type === TYPE_MOVIE ? 'movies' : 'series'
    ]?.includes(movie?.id)

    console.log('isInBookmark', isInBookmark)
    console.log('isInBookmark type ===', type)
    console.log('data.bookmark', data?.bookmark ?? 'totot')
    console.log('data.data.bookmark', data?.data?.bookmark ?? 'totot')

    if (!movie) {
        return <HeaderSkeleton />
    }

    return (
        <header style={banner}>
            <div className="banner__contents">
                <h1 className="banner__title">{title ?? '...'}</h1>
                <div className="banner__buttons">
                    <button className="banner__button banner__buttonplay">
                        Lecture
                    </button>
                    {isInBookmark ? (
                        <button
                            className="banner__button banner__buttonInfo"
                            onClick={handleDeleteToBookmark}
                        >
                            <DeleteForeverRoundedIcon
                                color="secondary"
                                fontSize="small"
                                style={{marginRight: '5px'}}
                            />
                            Supprimer à ma liste
                        </button>
                    ) : (
                        <button
                            className="banner__button banner__buttonInfo"
                            onClick={handleAddToBookmark}
                        >
                            Ajouter à ma liste
                        </button>
                    )}
                </div>
                <h1 className="synopsis">{movie?.overview ?? '...'}</h1>
            </div>
            <div className="banner--fadeBottom"></div>
            {/* {status === 'done' && isBookmarkFetchOneTime ? ( */}
            {!mutateBookmarkError ? (
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={4000}
                    onClose={() => setSnackbarOpen(false)}
                >
                    <Alert severity="success" sx={{width: '100%'}}>
                        Liste modifiée avec succès
                    </Alert>
                </Snackbar>
            ) : null}
            {/* {status === 'error' && isBookmarkFetchOneTime ? ( */}
            {mutateBookmarkError ? (
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={4000}
                    onClose={() => setSnackbarOpen(false)}
                >
                    <Alert severity="error" sx={{width: '100%'}}>
                        Problème lors de l'ajout : {mutateBookmarkError.message}
                    </Alert>
                </Snackbar>
            ) : null}
        </header>
    )
}

export default NetflixHeader
````

### `<NetflixRow />` <a name="netflixrow"></a>

````typescript
import React from 'react'
import './Netflix.css'
import {Link} from 'react-router-dom'
// ** Component **
import RowSkeleton from './skeletons/RowSkeleton'
// ** Const **
import {TYPE_MOVIE, IMAGE_URL_ORIGINAL} from '../const'
// ** REACT Query
import {useMovieEndpoint} from '../utils/hooksMovies'

interface IProps {
    type: string
    param?: string
    title: string
    filter: string
    watermark: boolean
    wideImage: boolean
}

interface IMovie {
    adult: false
    backdrop_path: '/wcKFYIiVDvRURrzglV9kGu7fpfY.jpg'
    genre_ids: [14, 28, 12]
    id: 453395
    media_type: 'movie'
    title?: 'Doctor Strange in the Multiverse of Madness'
    name?: 'Doctor Strange in the Multiverse of Madness'
    original_language: 'en'
    original_title: 'Doctor Strange in the Multiverse of Madness'
    overview: "Le Docteur Strange lance un sort interdit qui ouvre le portail du Multivers, incluant des versions alternatives de lui-même. Cette menace à l'humanité est plus puissante que les pouvoirs combinés de Strange, Wong et Wanda Maximoff."
    popularity: 7931.499
    poster_path: '/arfzjn1tGvXWwkX7eaGVuXsc0mp.jpg'
    release_date: '2022-05-04'
    video: false
    vote_average: 7.539
    vote_count: 4015
}

const NetflixRow = ({
    type = TYPE_MOVIE,
    param = '',
    title = '',
    filter = 'populaire',
    watermark = false,
    wideImage = true,
}: IProps) => {
    const data = useMovieEndpoint(type, filter, param)

    const buildImagePath = (data: IMovie) => {
        const image = wideImage ? data?.backdrop_path : data?.poster_path
        return `${IMAGE_URL_ORIGINAL}${image}`
    }

    const watermarkClass: string = watermark ? 'watermarked' : ''

    if (!data) {
        return <RowSkeleton title={title} wideImage={true} />
    }

    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row__posters">
                {/* {data.data.results.map((movie: IMovie) => { */}
                {data?.data?.results?.map((movie: IMovie) => {
                    return (
                        <Link key={movie.id} to={`/${type}/${movie.id}`}>
                            <div
                                className={`row__poster row__posterLarge ${watermarkClass}`}
                            >
                                <img
                                    src={buildImagePath(movie)}
                                    alt={movie.name}
                                />
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default NetflixRow
````

### `<NetflixFooter />` <a name="netflixfooter"></a>

````typescript
import React from 'react'

const NetflixFooter = (): JSX.Element => {
    return (
        <>
            <footer className="footer">2022 - Netflix Clone</footer>
        </>
    )
}

export default NetflixFooter
````
