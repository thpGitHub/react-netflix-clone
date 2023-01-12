import React from 'react'
import {ErrorBoundary} from 'react-error-boundary'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
// **Components **
import Page404 from './components/Error404'
import NetflixApp from './components/NetflixApp'
import NetflixById from './components/NetflixById'
import NetflixNews from './components/NetflixNews'
import ErrorFallback from './components/ErrorFallback'
import NetflixMovies from './components/NetflixMovies'
import NetflixSearch from './components/NetflixSearch'
import NetflixSeries from './components/NetflixSeries'
import NetflixBookmark from './components/NetflixBookmark'

const AuthApp = () => {
    return (
        <Router>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
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
                    <Route path="/list" element={<NetflixBookmark />} />
                    <Route path="/search/:query" element={<NetflixSearch />} />
                    <Route path="*" element={<Page404 />} />
                </Routes>
            </ErrorBoundary>
        </Router>
    )
}

export default AuthApp
