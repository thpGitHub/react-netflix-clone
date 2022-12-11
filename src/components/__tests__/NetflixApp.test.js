import * as React from 'react'
import {
    render,
    screen,
    waitForElementToBeRemoved,
    sampleMovie,
} from '../../test/test-utils'
import NetflixApp from '../NetflixApp'
import {API_URL} from '../../const'
import {BrowserRouter as Router} from 'react-router-dom'
import {server, rest} from '../../mocks'

/**
 * API calls in this component when mounted :
 * handle in handlers_for_run_tests.js
 *
 * GET https://api.themoviedb.org/3/trending/movie/day
 * GET https://api.themoviedb.org/3/trending/tv/day
 * GET https://api.themoviedb.org/3/movie/top_rated
 * GET https://api.themoviedb.org/3/discover/tv
 * GET https://api.themoviedb.org/3/discover/movie
 * GET https://api.themoviedb.org/3/tv/66732    --->  random tv/:id or movie/:id
 *
 */

/**
 * Here :
 * <Router>
 *    <NetflixApp></NetflixApp>
 * </Router>,
 * because :
 * Error: Uncaught [Error: useNavigate() may be used only in the context of a <Router> component.]
 */
test('should render componant', async () => {
    render(
        <Router>
            <NetflixApp></NetflixApp>
        </Router>,
    )
    await waitForElementToBeRemoved(() => screen.queryByRole('alert'))
    // screen.debug()
    // screen.logTestingPlaygroundURL()
    expect(screen.getByRole('heading', {name: /accueil/i})).toBeInTheDocument()
    expect(screen.getByRole('heading', {name: /series/i})).toBeInTheDocument()
    expect(screen.getByRole('heading', {name: /movies/i})).toBeInTheDocument()
    expect(screen.getByRole('heading', {name: /news/i})).toBeInTheDocument()
    expect(screen.getByRole('heading', {name: /list/i})).toBeInTheDocument()
    expect(screen.getByRole('textbox', {name: /search/i})).toBeInTheDocument()
    expect(
        screen.getByRole('heading', {name: /Films Netflix/i}),
    ).toBeInTheDocument()
    expect(
        screen.getByRole('heading', {name: /Séries Netflix/i}),
    ).toBeInTheDocument()
    expect(
        screen.getByRole('heading', {name: /Les mieux notés/i}),
    ).toBeInTheDocument()
    expect(
        screen.getByRole('heading', {name: /Action & aventure/i}),
    ).toBeInTheDocument()
    expect(
        screen.getByRole('heading', {name: /Les meilleurs thrillers/i}),
    ).toBeInTheDocument()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
})

/**
 * skip this test because i can't change route /serie
 * todo : test with userEvent
 */
test.skip('shoould render /series route', async () => {
    const route = '/series'
    // window.history.pushState({}, 'Page series Netflix', route)
    window.history.pushState({}, 'Page series Netflix', route)
    render(
        <Router>
            <NetflixApp></NetflixApp>
        </Router>,
    )
    await waitForElementToBeRemoved(() => screen.queryByRole('alert'))
    // screen.debug()
    expect(screen.getByRole('heading', {name: /accueil/i})).toBeInTheDocument()
    expect(
        screen.getByRole('heading', {name: /Films Netflix/i}),
    ).toBeInTheDocument()
})
