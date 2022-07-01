// import {ThemeProvider} from '@mui/styles'
import NetflixApp from './components/NetflixApp.tsx'

import {ThemeProvider, createTheme} from '@mui/material/styles'

const theme = createTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#E50914',
        },
        secondary: {
            main: '#000',
        },
    },
})

// const theme = {
//     background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
// }

function App() {
    return (
        <ThemeProvider theme={theme}>
            <NetflixApp />
        </ThemeProvider>
    )
}

export default App
// export {App}
