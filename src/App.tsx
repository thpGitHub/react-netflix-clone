import React, {useState, useEffect} from 'react'
import './mocks'
import * as authNetflix from './utils/authNetflixProvider'
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

const getUserByToken = async () => {
    let user = 'totototootott'
    const token = await authNetflix.getTokenInLocalStorage()

    if(token) {
        
    }

    return user
}

const funcTest = async () => {
    
    let test = await getUserByToken()
    console.log('test ====',test);
    
    let test3
    let test2 = await getUserByToken().then(data=> test3 = data)
    // console.log('test2 ====',test2.then(data=> console.log(data)))
    console.log('test3 ====',test3)
    
    
}

function App() {
    const [authUser, setAuthUser] = useState(null)

    useEffect(() => {
      console.log('**** getTokenInLocalStorage ****', getUserByToken().then(data => data))
      let result
      let toto: any = getUserByToken().then((data)=> result = data)
      console.log('toto promise', toto.resolve)
      console.log('result promise', result)
      
      funcTest()
      
    }, [])
    

    const login = ({
        userName,
        password,
    }: {
        userName: string
        password: string
    }) => {
        console.log(userName, password)
        authNetflix.login({userName, password}).then((user)=> setAuthUser(user))
    }

    const register = (data: {userName: string; password: string}) => {
        authNetflix.register(data).then((user) => setAuthUser(user))
        // const user = await authNetflix.register(data)
        // setAuthUser(user)
    }

    const logout = () => {
        authNetflix.logout()
        setAuthUser(null)
    }

    return (
        <ThemeProvider theme={theme}>
            {authUser ? (
                <AuthApp logout={logout}/>
            ) : (
                <UnauthApp login={login} register={register} />
            )}
        </ThemeProvider>
    )
}

export default App
