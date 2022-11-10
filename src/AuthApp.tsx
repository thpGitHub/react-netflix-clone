import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {ErrorBoundary} from 'react-error-boundary'
// **Components **
import ErrorFallback from './components/ErrorFallback'
import NetflixApp from './components/NetflixApp'
import Page404 from './components/Error404'
import NetflixSeries from './components/NetflixSeries'
import NetflixMovies from './components/NetflixMovies'
import NetflixNews from './components/NetflixNews'
import NetflixById from './components/NetflixById'
import NetflixBookmark from './components/NetflixBookmark'
import NetflixSearch from './components/NetflixSearch'

interface IProps {
    logout: () => void
    // authUser: any
    // setAuthUser: any
}

const AuthApp = () => {
    return (
        <Router>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Routes>
                    {/* <Route path="/" element={<NetflixApp logout={logout} />} /> */}
                    <Route path="/" element={<NetflixApp />} />
                    <Route
                        path="/tv/:tvId"
                        element={<NetflixById />}
                    ></Route>
                    <Route
                        path="/movie/:movieId"
                        element={<NetflixById />}
                    ></Route>
                    <Route
                        path="/series"
                        element={<NetflixSeries />}
                    />
                    <Route
                        path="/movies"
                        element={<NetflixMovies />}
                    />
                    <Route
                        path="/news"
                        element={<NetflixNews />}
                    />
                    <Route
                        path="/list"
                        element={<NetflixBookmark />}
                    />
                    <Route
                        path="/search/:query"
                        element={<NetflixSearch />}
                    />
                    <Route path="*" element={<Page404 />} />
                </Routes>
            </ErrorBoundary>
        </Router>
    )
}

export default AuthApp
