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
 *
 * GET https://api.themoviedb.org/3/trending/movie/day
 * GET https://api.themoviedb.org/3/trending/tv/day
 * GET https://api.themoviedb.org/3/movie/top_rated
 * GET https://api.themoviedb.org/3/discover/tv
 * GET https://api.themoviedb.org/3/discover/movie
 * GET https://api.themoviedb.org/3/tv/66732    --->  random tv/:id or movie/:id
 *
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
})

