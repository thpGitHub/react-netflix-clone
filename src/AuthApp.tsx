import React from 'react'
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
// **Components **
import NetflixApp from './components/NetflixApp'
import Page404 from './components/Error404'
import NetflixSeries from './components/NetflixSeries'
import NetflixMovies from './components/NetflixMovies'
import NetflixNews from './components/NetflixNews'
import NetflixById from './components/NetflixById'

const AuthApp = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<NetflixApp />} />
                <Route path="/tv/:tvId" element={<NetflixById />}></Route>
                <Route path="/movie/:movieId" element={<NetflixById />}></Route>
                <Route path="/series" element={<NetflixSeries />} />
                <Route path="/movies" element={<NetflixMovies />} />
                <Route path="/news" element={<NetflixNews />} />
                <Route path="*" element={<Page404 />} />
            </Routes>
        </Router>
    )
}

export default AuthApp
