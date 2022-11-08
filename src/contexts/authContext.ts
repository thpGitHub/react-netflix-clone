import React, {createContext} from 'react'

interface IContext {
    authUser: any
    authError: any
    login: ({userName, password}: {userName: string; password: string}) => void
    register: (data: {userName: string; password: string}) => void
    logout: () => void
}

const authContext = React.createContext<IContext | null>(null)

export default authContext
