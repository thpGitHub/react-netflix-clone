import React from 'react'
// ** MSW **
import './mocks'
// ** Components **
import AuthApp from './AuthApp'
import UnauthApp from './UnauthApp'
// ** Contexts **
import {useAuthContext} from './contexts/authContext'
import AppProviders from './contexts'

function App() {
    return (
        <AppProviders>
            <AppConsumer />
        </AppProviders>
    )
}

const AppConsumer = () => {
    const {authUser} = useAuthContext()
    return authUser ? <AuthApp /> : <UnauthApp />
}

export default App
