import React, {
    useEffect,
    useState,
    createContext,
    useContext,
    ReactNode,
} from 'react'
// ** MUI **
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
// ** REACT Query **
import {useQueryClient} from '@tanstack/react-query'
// ** Services **
import * as clientAuth from '../services/clientToAuthenticationApi'
import * as clientToNetflixApi from '../services/clientToNetflixApi'
// ** Utils **
import {useFetchData} from '../utils/hooks'

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

export const useAuthContext = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error(
            'useAuthContext doit être wrapper dans <AuthContext.provider>',
        )
    }
    return context
}
/**
 * In App.tsx :
 *
 * <AuthContextProvider>
 *   {children}
 * </AuthContextProvider>
 *
 * the children can be access to context with the hook custom : useAuthContext
 */
export const AuthContextProvider = ({children}: AuthContextProviderProps) => {
    const queryClient = useQueryClient()
    const {data: authUser, status, execute, setData} = useFetchData()
    const [authError, setAuthError] = useState()

    /**
     * TODO : check if use useQuery here are necessary
     * And on mutation => invalidateQueries
     */
    useEffect(() => {
        execute(clientAuth.getUserByToken())
    }, [execute])

    const login = ({userName, password}: LoginData) => {
        clientToNetflixApi
            .login({userName, password})
            .then(user => setData(user))
            .catch(error => setAuthError(error))
    }

    const register = ({userName, password}: LoginData) => {
        clientToNetflixApi
            .register({userName, password})
            .then(user => setData(user))
            .catch(error => setAuthError(error))
    }

    const logout = () => {
        clientToNetflixApi.logout()
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
