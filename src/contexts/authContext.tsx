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

    // const login = useCallback(
    //     ({userName, password}: {userName: string; password: string}) => {
    //         console.log(userName, password)
    //         authNetflix
    //             .login({userName, password})
    //             .then(user => setData(user))
    //             .catch(error => setAuthError(error))
    //     },
    //     [setData],
    // )

    // const register = useCallback(
    //     (data: {userName: string; password: string}) => {
    //         authNetflix
    //             .register(data)
    //             .then(user => setData(user))
    //             .catch(error => setAuthError(error))
    //     },
    //     [setData],
    // )

    // const logout = useCallback(() => {
    //     authNetflix.logout()
    //     queryClient.clear()
    //     setData(null)
    // }, [queryClient, setData])

    console.log('status === ', status)

    // const value = useMemo(
    //     () => ({authUser, authError, login, register, logout}),
    //     [authError, authUser, login, logout, register],
    // )

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
