import React from 'react'
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
// **Components **
import NetflixApp from './components/NetflixApp'
import Page404 from './components/Error404'
import NetflixSeries from './components/NetflixSeries'
import NetflixMovies from './components/NetflixMovies'
import NetflixNews from './components/NetflixNews'
import NetflixById from './components/NetflixById'

interface IProps {
logout: () => void
}

const AuthApp = ({logout}: IProps) => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<NetflixApp logout={logout} />} />
                <Route path="/tv/:tvId" element={<NetflixById logout={logout}/>}></Route>
                <Route path="/movie/:movieId" element={<NetflixById logout={logout}/>}></Route>
                <Route path="/series" element={<NetflixSeries logout={logout}/>} />
                <Route path="/movies" element={<NetflixMovies logout={logout}/>} />
                <Route path="/news" element={<NetflixNews logout={logout}/>} />
                <Route path="*" element={<Page404 logout={logout}/>} />
            </Routes>
        </Router>
    )
}

export default AuthApp
