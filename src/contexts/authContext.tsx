import React, {
    useEffect,
    useState,
    createContext,
    useContext,
    ReactNode,
} from 'react'
// ** utils **
// import {clientAuth} from '../utils/clientAPI'
import {useFetchData} from '../utils/hooks'
import * as authNetflixProvider from '../utils/authNetflixProvider'
import * as clientAuth from '../utils/clientAuth'
// ** REACT Query
import {useQueryClient} from '@tanstack/react-query'
// ** MUI **
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

// interface IContext {
//     authUser: User
//     authError: any
//     login: ({userName, password}: {userName: string; password: string}) => void
//     register: (data: {userName: string; password: string}) => void
//     logout: () => void
// }

// type User = {
//     id: string
//     userName: string
//     passwordHash: string
//     token: string
//     bookmark: {
//         movies: number[]
//         series: number[]
//     }
// }

/**
 * before :
 * login: ({userName, password}: {userName: string; password: string}) => void
 * register: (data: {userName: string; password: string}) => void
 */

type LoginData = {
    userName: string
    password: string
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

type Context = {
    authUser: User | null
    authError: any
    login: (data: LoginData) => void
    register: (data: LoginData) => void
    logout: () => void
}

type AuthContextProviderProps = {
    children: ReactNode
}

const AuthContext = createContext<Context>(null!)

const useAuthContext = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error(
            'useAuthContext doit être wrapper dans <AuthContext.provider>',
        )
    }
    return context
}

const AuthContextProvider = ({children}: AuthContextProviderProps) => {
    const queryClient = useQueryClient()
    const {data: authUser, status, execute, setData} = useFetchData()
    const [authError, setAuthError] = useState()

    /**
     * TODO : check if use useQuery here are necessary
     * And on mutation => invalidateQueries
     */
    useEffect(() => {
        // execute(getUserByToken())
        execute(clientAuth.getUserByToken2())
    }, [execute])

    const login = ({userName, password}: LoginData) => {
        authNetflixProvider
            .login({userName, password})
            .then(user => setData(user))
            .catch(error => setAuthError(error))
    }

    const register = ({userName, password}: LoginData) => {
        authNetflixProvider
            .register({userName, password})
            .then(user => setData(user))
            .catch(error => setAuthError(error))
    }

    const logout = () => {
        authNetflixProvider.logout()
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
        return <AuthContext.Provider value={value} children={children} />
    }
    throw new Error('status invalide')
}

export {AuthContext, useAuthContext, AuthContextProvider}
