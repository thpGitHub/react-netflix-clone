import React from 'react'
import LoginRegister from './components/LoginRegister'

interface IProps {
  login: () => void
  register: () => void
}

const UnauthApp = ({login, register}: IProps) => {
    return <LoginRegister login={login} register={register} />
}

export default UnauthApp
