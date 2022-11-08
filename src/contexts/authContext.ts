import React, {createContext, useContext} from 'react'

interface IContext {
    authUser: any
    authError: any
    login: ({userName, password}: {userName: string; password: string}) => void
    register: (data: {userName: string; password: string}) => void
    logout: () => void
}

const authContext = createContext<IContext | null>(null)

const useAuthContext = () => {
    const context = useContext(authContext)
    if(!context) {
        throw new Error('useAuthContext doit être wrapper dans <AuthContext.provider>')
    }

    return context
}


export {authContext, useAuthContext}
