import {rest} from 'msw'
import * as usersDB from './db'
import {sampleMovie} from '../test/data'

export const handlers_for_run_tests = [
    // Handles a POST /login request
    rest.post(
        'https://auth.service.mock.com/register',
        async (req, res, ctx) => {
            const {userName, password} = req.body
            // console.log('req.body === ', req.body)
            const userFields = {userName, password}
            // console.log('userFields === ', userFields)
            const user = await usersDB.createUser(userFields)
            // console.log('user in handlers/register ===', user)

            return res(ctx.json(user))
        },
    ),

    // Handles a GET /user request
    // rest.get('https://example.com/api/login', async (req, res, ctx) => {
    rest.post('https://auth.service.mock.com/login', async (req, res, ctx) => {
        const {userName, password} = req.body
        const userFields = {userName, password}
        const userLogin = await usersDB.authenticateUserForLogin(userFields)

        return res(
            // ctx.delay(1500),
            ctx.status(202, 'Mocked status'),
            ctx.json(userLogin),
        )
    }),
    rest.get(
        'https://auth.service.mock.com/getUserAuth',
        async (req, res, ctx) => {
            const token = req?.headers
                .get('Authorization')
                .replace('Bearer ', '')

            const user = await usersDB.getUserWithTokenInLocalStorage(token)
            // usersDB.getUserWithTokenInLocalStorage(token)
            // console.log('****https://auth.service.mock.com/getUserAuth ****')
            return res(
                // ctx.delay(1500),
                ctx.status(202, 'Mocked status'),
                ctx.json({user: user}),
            )
        },
    ),
    rest.post(
        'https://auth.service.mock.com/bookmark',
        async (req, res, ctx) => {
            const authUser = req.body.data
            // const {id: serieID} = req.body.movie
            // const newAuthUser = await usersDB.addBookmarkSerieInLocalStorage(serieID, authUser)

            return res(
                ctx.status(202, 'Mocked status'),
                // ctx.json(newAuthUser),
                ctx.json(authUser),
            )
        },
    ),
    rest.post(
        'https://auth.service.mock.com/bookmark/movie',
        async (req, res, ctx) => {
            const authUser = req.body.data
            const {id: movieID} = req.body.movie

            const newAuthUser = await usersDB.addBookmarkMovieInLocalStorage(
                movieID,
                authUser,
            )

            return res(
                // ctx.delay(1500),
                ctx.status(202, 'Mocked status'),
                // ctx.json(req.body),
                // ctx.json(req.body.data),
                ctx.json(newAuthUser),
            )
        },
    ),
    rest.post(
        'https://auth.service.mock.com/bookmark/tv',
        async (req, res, ctx) => {
            const authUser = req.body.data
            const {id: serieID} = req.body.movie
            const newAuthUser = await usersDB.addBookmarkSerieInLocalStorage(
                serieID,
                authUser,
            )

            return res(ctx.status(202, 'Mocked status'), ctx.json(newAuthUser))
        },
    ),
    rest.delete(
        'https://auth.service.mock.com/bookmark/tv',
        async (req, res, ctx) => {
            const authUser = req.body.data
            const {id: serieID} = req.body.movie
            const newAuthUser = await usersDB.deleteBookmarkSerieInLocalStorage(
                serieID,
                authUser,
            )

            return res(ctx.status(202, 'Mocked status'), ctx.json(newAuthUser))
        },
    ),
    rest.delete(
        'https://auth.service.mock.com/bookmark/movie',
        async (req, res, ctx) => {
            const authUser = req.body.data
            const {id: movieID} = req.body.movie
            const newAuthUser = await usersDB.deleteBookmarkMovieInLocalStorage(
                movieID,
                authUser,
            )

            return res(ctx.status(202, 'Mocked status'), ctx.json(newAuthUser))
        },
    ),

    /**
     * use by 'NetflixApp.test'
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
    rest.get(
        `https://api.themoviedb.org/3/trending/movie/day`,
        async (req, res, ctx) => {
            return res(ctx.json('sampleMovie'))
        },
    ),
    rest.get(
        `https://api.themoviedb.org/3/trending/tv/day`,
        async (req, res, ctx) => {
            return res(ctx.json('sampleMovie'))
        },
    ),
    rest.get(
        `https://api.themoviedb.org/3/movie/top_rated`,
        async (req, res, ctx) => {
            return res(ctx.json('sampleMovie'))
        },
    ),
    rest.get(
        `https://api.themoviedb.org/3/discover/tv`,
        async (req, res, ctx) => {
            return res(ctx.json('sampleMovie'))
        },
    ),
    rest.get(
        `https://api.themoviedb.org/3/discover/movie`,
        async (req, res, ctx) => {
            return res(ctx.json('sampleMovie'))
        },
    ),
    rest.get(`https://api.themoviedb.org/3/tv/:id`, async (req, res, ctx) => {
        return res(ctx.json('sampleMovie'))
    }),
    rest.get(
        `https://api.themoviedb.org/3/movie/:id`,
        async (req, res, ctx) => {
            return res(ctx.json(sampleMovie))
        },
    ),
    rest.get('/server.mock/authentication/getUserByToken', async (req, res, ctx) => {
        const user = await usersDB.getUserByTheTokenPresentInLocalStorage()
        
        return res(ctx.status(202, 'Mocked status'), ctx.json({user: user}))
    }),
]
