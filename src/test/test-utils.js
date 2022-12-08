import * as React from 'react'
import {render as renderReactTestingLib} from '@testing-library/react'
import {ThemeProvider, createTheme} from '@mui/material/styles'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {AuthContextProvider} from '../contexts/authContext'

const queryClient = new QueryClient()
const theme = createTheme()

function render(ui, {lang = 'fr', ...options} = {}) {
    const wrapper = ({children}) => (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <AuthContextProvider>{children}</AuthContextProvider>
            </ThemeProvider>
        </QueryClientProvider>
    )
    return renderReactTestingLib(ui, {wrapper, ...options})
}

export * from './data'
// exporte tout testing library y compris son render
export * from '@testing-library/react'
// surcharge de render pour exporter notre render :)
export {render}
