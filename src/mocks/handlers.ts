import {rest} from 'msw'
import {RestRequest, PathParams} from 'msw'
import * as DB from './db'

type UserRequest = {
    userName: string
    password: string
}

type RequestBody = {
    data: {
        id: string
        userName: string
        passwordHash: string
        token: string
        bookmark: {
            movies: any[]
            series: any[]
        }
    }
    movie: {
        adult: boolean
        backdrop_path: string
        created_by: {
            id: number
            credit_id: string
            name: string
            gender: number
            profile_path: string
        }[]
        episode_run_time: number[]
        first_air_date: string
        genres: {
            id: number
            name: string
        }[]
        homepage: string
        id: number
        in_production: boolean
        languages: string[]
        last_air_date: string
        last_episode_to_air: {
            air_date: string
            episode_number: number
            id: number
            name: string
            overview: string
            production_code: string
            runtime: number
            season_number: number
            show_id: number
            still_path: string
            vote_average: number
            vote_count: number
        }
        name: string
        next_episode_to_air: any
        networks: {
            id: number
            name: string
            logo_path: string
            origin_country: string
        }[]
        number_of_episodes: number
        number_of_seasons: number
        origin_country: string[]
        original_language: string
        original_name: string
        overview: string
        popularity: number
        poster_path: string
        production_companies: {
            id: number
            logo_path: string
            name: string
            origin_country: string
        }[]
        production_countries: {
            iso_3166_1: string
            name: string
        }[]
        release_date: string
        revenue: number
        runtime: number
        spoken_languages: {
            english_name: string
            iso_639_1: string
            name: string
        }[]
        status: string
        tagline: string
        title: string
        video: boolean
        vote_average: number
        vote_count: number
    }
}

export const handlers = [
    /*
     * req.body 'body' is deprecated
     * i use req.json() because the Content-Type header is application/json
     */
    /**
     * I overridden the generic type parameter DefaultBodyType of MSW for the req :
     *
     * req: RestRequest<DefaultBodyType, PathParams<string>>
     * to
     * req: RestRequest<RequestBody, PathParams<string>>
     * because
     * i have a problem with TS :
     * req.body.data => Property 'data' does not exist on type 'string | number | boolean | Record<string, any> | DefaultRequestMultipartBody'.
     */
    rest.post(
        'https://auth.service.mock.com/register',
        async (req, res, ctx) => {
            // const {userName, password} = req.body as UserRequest
            const {userName, password} = (await req.json()) as UserRequest
            const userFields = {userName, password}
            const user = await DB.createUser(userFields)

            return res(ctx.json(user))
        },
    ),
    rest.post('https://auth.service.mock.com/login', async (req, res, ctx) => {
        // const {userName, password} = req.body as UserRequest
        const {userName, password} = (await req.json()) as UserRequest
        const userFields = {userName, password}
        const userLogin = await DB.authenticateUserForLogin(userFields)

        return res(
            // ctx.delay(1500),
            ctx.status(202, 'Mocked status'),
            ctx.json(userLogin),
        )
    }),
    // rest.get(
    //     'https://auth.service.mock.com/getUserAuth',
    //     async (req, res, ctx) => {
    //         const token = req?.headers
    //             .get('Authorization')
    //             ?.replace('Bearer ', '')
    //         const user = await DB.getUserWithTokenInLocalStorage(token)

    //         return res(
    //             // ctx.delay(1500),
    //             ctx.status(202, 'Mocked status'),
    //             ctx.json({user: user}),
    //         )
    //     },
    // ),
    rest.get(
        'https://auth.service.mock.com/getUserAuth',
        async (req, res, ctx) => {
            const token = req?.headers
                .get('Authorization')
                ?.replace('Bearer ', '')
            if (token === undefined) {
                return res(ctx.status(401, 'Unauthorized'))
            }
            const user = await DB.getUserWithTokenInLocalStorage(token)

            return res(
                // ctx.delay(1500),
                ctx.status(202, 'Mocked status'),
                ctx.json({user: user}),
            )
        },
    ),

    // rest.post(
    //     'https://auth.service.mock.com/bookmark',
    //     async (req, res, ctx) => {
    //         const authUser = req.body.data

    //         return res(
    //             ctx.status(202, 'Mocked status'),
    //             ctx.json(authUser),
    //         )
    //     },
    // ),

    /**
     * TODO :
     * Check if this request : 'https://auth.service.mock.com/bookmark'
     * is always called.
     * 
     * overridden by : /getUserByToken'
     */
    rest.post(
        'https://auth.service.mock.com/bookmark',
        async (req: RestRequest<RequestBody, PathParams<string>>, res, ctx) => {
            // const authUser =
            //     typeof req.body === 'string' && JSON.parse(req.body)?.data
            // const authUser = req.body.data
            const body = await req.json()
            const authUser = body.data
            if (!authUser) {
                return res(
                    ctx.status(400, 'Bad Request'),
                    ctx.json({message: 'Invalid request body'}),
                )
            }

            return res(ctx.status(202, 'Mocked status'), ctx.json(authUser))
        },
    ),

    // rest.post(
    //     'https://auth.service.mock.com/bookmark/movie',
    //     async (req, res, ctx) => {
    //         const authUser = req.body.data
    //         const {id: movieID} = req.body.movie
    //         const newAuthUser = await DB.addBookmarkMovieInLocalStorage(
    //             movieID,
    //             authUser,
    //         )

    //         return res(ctx.status(202, 'Mocked status'), ctx.json(newAuthUser))
    //     },
    // ),

    rest.post(
        'https://auth.service.mock.com/bookmark/movie',
        async (req: RestRequest<RequestBody, PathParams<string>>, res, ctx) => {
            // const authUser =
            //     typeof req.body === 'string' && JSON.parse(req.body)?.data
            // // const movieID = req.body?.movie?.id;
            // const movieID =
            //     typeof req.body === 'string' && JSON.parse(req.body)?.movie?.id

            const body = await req.json()
            const authUser = body.data
            const movieID = body.movie.id

            if (!movieID) {
                return res(
                    ctx.status(400, 'Bad Request'),
                    ctx.json({message: 'Invalid request body'}),
                )
            }

            const newAuthUser = await DB.addBookmarkMovieInLocalStorage(
                movieID,
                authUser,
            )

            return res(ctx.status(202, 'Mocked status'), ctx.json(newAuthUser))
        },
    ),

    rest.post(
        'https://auth.service.mock.com/bookmark/tv',
        async (req: RestRequest<RequestBody, PathParams<string>>, res, ctx) => {
            const body = await req.json()
            const authUser = body?.data
            const serieID = body?.movie?.id
            // const authUser = req?.body?.data
            // const serieID = req?.body?.movie?.id

            console.log({
                authUser: authUser,
                serieID: serieID,
                req: req.body,
                reqBodyTypeof: typeof req.body,
                header: req.headers.get('Content-Type'),
            })

            if (!serieID) {
                return res(
                    ctx.status(400, 'Bad Request'),
                    ctx.json({message: 'Invalid request body'}),
                )
            }

            const newAuthUser = await DB.addBookmarkSerieInLocalStorage(
                serieID,
                authUser,
            )

            return res(ctx.status(202, 'Mocked status'), ctx.json(newAuthUser))
        },
    ),
    rest.delete(
        'https://auth.service.mock.com/bookmark/tv',
        async (req: RestRequest<RequestBody, PathParams<string>>, res, ctx) => {
            const body = await req.json()
            const authUser = body?.data
            const serieID = body?.movie?.id

            // const authUser = req?.body?.data
            // const serieID = req?.body?.movie?.id
            console.log({authUser: authUser, serieID: serieID})

            if (!serieID) {
                return res(
                    ctx.status(400, 'Bad Request'),
                    ctx.json({message: 'Invalid request body'}),
                )
            }

            const newAuthUser = await DB.deleteBookmarkSerieInLocalStorage(
                serieID,
                authUser,
            )

            return res(ctx.status(202, 'Mocked status'), ctx.json(newAuthUser))
        },
    ),
    rest.delete(
        'https://auth.service.mock.com/bookmark/movie',
        async (req: RestRequest<RequestBody, PathParams<string>>, res, ctx) => {
            // const authUser = req.body.data
            // const {id: movieID} = req.body.movie
            // const authUser =
            //     typeof req.body === 'string' && JSON.parse(req.body)?.data
            // const movieID =
            //     typeof req.body === 'string' && JSON.parse(req.body)?.movie?.id

            const body = await req.json()
            const authUser = body.data
            const movieID = body.movie.id

            if (!movieID) {
                return res(
                    ctx.status(400, 'Bad Request'),
                    ctx.json({message: 'Invalid request body'}),
                )
            }

            const newAuthUser = await DB.deleteBookmarkMovieInLocalStorage(
                movieID,
                authUser,
            )

            return res(ctx.status(202, 'Mocked status'), ctx.json(newAuthUser))
        },
    ),
    rest.get('/getUserByToken', async (req, res, ctx) => {
        const user = await DB.getUserByTheTokenPresentInLocalStorage()

        return res(ctx.status(202, 'Mocked status'), ctx.json({user: user}))
    }),
]
