import React from 'react'
// ** MSW **
import './mocks'
// ** Components **
import AuthApp from './AuthApp'
import UnauthApp from './UnauthApp'
// ** MUI **
import {ThemeProvider, createTheme} from '@mui/material/styles'
// ** REACT Query
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
// ** Contexts
import {AuthContextProvider, useAuthContext} from './contexts/authContext'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            useErrorBoundary: true,
            refetchOnWindowFocus: false,
            retryDelay: 500,
            retry: (failureCount, error: any) => {
                if (error.status === 404) return false
                else if (error.status === 401) return false
                else if (failureCount > 3) return false
                else return true
            },
        },
        mutations: {
            useErrorBoundary: false,
            // refetchOnWindowFocus: false,
            retryDelay: 500,
            retry: 1,
            // mutation options
        },
    },
})

const theme = createTheme({
    palette: {
        // mode: 'dark',
        primary: {
            main: '#E50914',
        },
        secondary: {
            main: '#E50914',
        },
    },
})

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                {/* <AuthContext.Provider value={props}> */}
                <AuthContextProvider>
                    <AppConsumer />
                </AuthContextProvider>
                {/* </AuthContext.Provider> */}
            </ThemeProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}

const AppConsumer = () => {
    const {authUser} = useAuthContext()
    return authUser ? <AuthApp /> : <UnauthApp />
}

export default App
