import React, {lazy, Suspense} from 'react'
// ** MSW **
import './mocks'
// ** Contexts **
import {useAuthContext} from './contexts/authContext'
import AppProviders from './contexts'
// ** Dynamic imports
const AppAuthenticatedUser = lazy(() => import(/* webpackPrefetch: true */'./AppAuthenticatedUser'))
const AppUnauthenticatedUser = lazy(() => import('./AppUnauthenticatedUser'))

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
            {authUser ? <AppAuthenticatedUser /> : <AppUnauthenticatedUser />}
        </Suspense>
    )
}

export default App
