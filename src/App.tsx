import React, {lazy, Suspense} from 'react'
// ** MSW **
import './mocks'
// ** Components **
// import AuthApp from './AuthApp'
// import UnauthApp from './UnauthApp'
// ** Contexts **
import {useAuthContext} from './contexts/authContext'
import AppProviders from './contexts'
// ** Dynamic imports
const AuthApp = lazy(() => import('./AuthApp'))
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
        <Suspense fallback={<div>Chargement...</div>} >
            {authUser ? <AuthApp /> : <UnauthApp />}
        </Suspense>
    )
}

export default App
