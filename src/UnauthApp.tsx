import React from 'react'
import LoginRegister from './components/LoginRegister'

// interface IProps {
//   login: () => void
//   register: () => void
// }
interface IProps {
    login: ({userName, password}: {userName: string; password: string}) => void
    // register: ({userName?: string, password?: string}) => void
    register: ({
        userName,
        password,
    }: {
        userName: string
        password: string
    }) => void
}

const UnauthApp = ({login, register}: IProps) => {
    return <LoginRegister login={login} register={register} />
}

export default UnauthApp
