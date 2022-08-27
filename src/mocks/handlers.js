import {rest} from 'msw'
import * as usersDB from './db'

export const handlers = [
    // Handles a POST /login request
    rest.post(
        'https://auth.service.mock.com/register',
        async (req, res, ctx) => {
            const {userName, password} = req.body
            const userFields = {userName, password}
            const user = await usersDB.createUser(userFields)

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
            ctx.json(
                userLogin,
            ),
        )
    }),
]
