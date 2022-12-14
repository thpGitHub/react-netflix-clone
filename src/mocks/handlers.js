import {rest} from 'msw'
import * as usersDB from './db'

export const handlers = [
    // Handles a POST /login request
    rest.post(
        'https://auth.service.mock.com/register',
        async (req, res, ctx) => {
            const {userName, password} = req.body
            console.log('req.body === ', req.body)
            const userFields = {userName, password}
            console.log('userFields === ', userFields)
            const user = await usersDB.createUser(userFields)
            console.log('user in handlers/register ===', user)

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
            console.log('****https://auth.service.mock.com/getUserAuth ****')
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
            // const {userName, password} = req.body
            // const userFields = {userName, password}
            // const userLogin = await usersDB.authenticateUserForLogin(userFields)
            const authUser = req.body.data
            const {bookmark} = req.body.data
            // const movieID = req.body.movie.id
            const {id: movieID} = req.body.movie
            // const {token} = req.body.data

            console.log('{bookmark} = req.body.data ===', bookmark)
            console.log('movieID = req.body.movie.id ===', movieID)
            console.log('req.body === ', req.body)

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
    // rest.get(
    //     `https://api.themoviedb.org/3/trending/movie/day`,
    //     async (req, res, ctx) => {
    //         console.log(
    //             '////// in https://api.themoviedb.org/3/trending/movie/day',
    //         )

    //         return res(ctx.json('sampleMovie'))
    //     },
    // ),
]
// bookmark/movie req.body ===  {"id":"t0tQr7qYTUYuMB69IVD6o","userName":"titi2@hot.com","passwordHash":"$2a$10$4uxGGzx0/ET0KpkJXCcBx.QI5Y4GHlx5228cqudIEzpR7Kzl1abXW","token":"$2a$10$N8oo/LOueS.m1RjtRkIpCO","bookmark":{"movies":[],"series":[]}}
