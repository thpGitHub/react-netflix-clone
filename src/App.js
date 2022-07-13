import React from 'react'
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
// **Components **
import NetflixApp from './components/NetflixApp.tsx'
import Page404 from './components/Error404'
import NetflixSeries from './components/NetflixSeries'
import NetflixMovies from './components/NetflixMovies'
import NetflixNews from './components/NetflixNews'
import NetflixById from './components/NetflixById'
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
        <Router>
            <ThemeProvider theme={theme}>
                <Routes>
                    <Route path="/" element={<NetflixApp />} />
                    <Route path="/tv/:tvId" element={<NetflixById />}></Route>
                    <Route
                        path="/movie/:movieId"
                        element={<NetflixById />}
                    ></Route>
                    <Route path="/series" element={<NetflixSeries />} />
                    <Route path="/movies" element={<NetflixMovies />} />
                    <Route path="/news" element={<NetflixNews />} />
                    <Route path="*" element={<Page404 />} />
                </Routes>
                {/* <NetflixApp /> */}
            </ThemeProvider>
        </Router>
    )
}

export default App
// export {App}
