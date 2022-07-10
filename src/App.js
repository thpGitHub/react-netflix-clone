import React from 'react'
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
// **Components **
import NetflixApp from './components/NetflixApp.tsx'
import Page404 from './components/Error404'
import NetflixSeries from './components/NetflixSeries'
import NetflixMovies from './components/NetflixMovies'
import NetflixNews from './components/NetflixNews'
// ** MUI **
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
            <Router>
                <Routes>
                    <Route exact path="/" element={<NetflixApp />} />
                    <Route exact path="/series" element={<NetflixSeries />} />
                    <Route exact path="/movies" element={<NetflixMovies />} />
                    <Route exact path="/news" element={<NetflixNews />} />
                    <Route path="*" element={<Page404 />} />
                </Routes>
            </Router>
            {/* <NetflixApp /> */}
        </ThemeProvider>
    )
}

export default App
// export {App}
