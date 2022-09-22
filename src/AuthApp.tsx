import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
// **Components **
import NetflixApp from './components/NetflixApp'
import Page404 from './components/Error404'
import NetflixSeries from './components/NetflixSeries'
import NetflixMovies from './components/NetflixMovies'
import NetflixNews from './components/NetflixNews'
import NetflixById from './components/NetflixById'
import NetflixBookmark from './components/NetflixBookmark'

interface IProps {
    logout: () => void
    authUser: any
}

const AuthApp = ({logout, authUser}: IProps) => {
    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={<NetflixApp logout={logout} authUser={authUser} />}
                />
                <Route
                    path="/tv/:tvId"
                    element={
                        <NetflixById logout={logout} authUser={authUser} />
                    }
                ></Route>
                <Route
                    path="/movie/:movieId"
                    element={
                        <NetflixById logout={logout} authUser={authUser} />
                    }
                ></Route>
                <Route
                    path="/series"
                    element={
                        <NetflixSeries logout={logout} authUser={authUser} />
                    }
                />
                <Route
                    path="/movies"
                    element={
                        <NetflixMovies logout={logout} authUser={authUser} />
                    }
                />
                <Route
                    path="/news"
                    element={
                        <NetflixNews logout={logout} authUser={authUser} />
                    }
                />
                <Route
                    path="/list"
                    element={
                        <NetflixBookmark logout={logout} authUser={authUser} />
                    }
                />
                <Route
                    path="*"
                    element={<Page404 logout={logout} authUser={authUser} />}
                />
            </Routes>
        </Router>
    )
}

export default AuthApp
