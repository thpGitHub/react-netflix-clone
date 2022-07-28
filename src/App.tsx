import React, {useState} from 'react'
import './mocks'
// **Components **
import AuthApp from './AuthApp'
import UnauthApp from './UnauthApp'
// ** MUI **
import {ThemeProvider, createTheme} from '@mui/material/styles'

const theme = createTheme({
    palette: {
        // type: 'dark',
        primary: {
            main: '#E50914',
        },
        secondary: {
            main: '#E50914',
        },
    },
})

function App() {
    const [authUser, setAuthUser] = useState(null)

    const login = ({
        userName,
        password,
    }: {
        userName: string
        password: string
    }) => {
        console.log(userName, password)
    }

    // const register = (data: {userName: string, password: string}) => {}
    const register = (data: {userName: string; password: string}) => {
        console.log('register')
        //https://auth.service.mock.com/register
        fetch('https://auth.service.mock.com/register', {
            method: 'POST',
            // body: JSON.stringify(data),
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'},
        }).then(async response => {
            console.log('response before', response)
            const data = await response.json()
            console.log('data after', data)
            if (response.ok) {
                return data
            }
        })
        // .then(data => {
        //     console.log('data fetch post', data)
        // })
    }

    // .then(response => response.json())
    //         .then(data => {
    //             console.log('data :)', data)
    //         })

    return (
        <ThemeProvider theme={theme}>
            {authUser ? (
                <AuthApp />
            ) : (
                <UnauthApp login={login} register={register} />
            )}
        </ThemeProvider>
    )
}

export default App
