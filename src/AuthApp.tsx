import React, {useContext} from 'react'
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
// ** Contexts
import authContext from './contexts/authContext'

interface IProps {
    logout: () => void
    // authUser: any
    // setAuthUser: any
}

// const AuthApp = ({logout}: IProps) => {
const AuthApp = () => {
    const {logout}: any = useContext(authContext)
    return (
        <Router>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Routes>
                    <Route path="/" element={<NetflixApp logout={logout} />} />
                    <Route
                        path="/tv/:tvId"
                        element={<NetflixById logout={logout} />}
                    ></Route>
                    <Route
                        path="/movie/:movieId"
                        element={<NetflixById logout={logout} />}
                    ></Route>
                    <Route
                        path="/series"
                        element={<NetflixSeries logout={logout} />}
                    />
                    <Route
                        path="/movies"
                        element={<NetflixMovies logout={logout} />}
                    />
                    <Route
                        path="/news"
                        element={<NetflixNews logout={logout} />}
                    />
                    <Route
                        path="/list"
                        element={<NetflixBookmark logout={logout} />}
                    />
                    <Route path="*" element={<Page404 logout={logout} />} />
                </Routes>
            </ErrorBoundary>
        </Router>
    )
}

export default AuthApp
