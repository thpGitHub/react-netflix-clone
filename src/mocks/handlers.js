import {rest} from 'msw'
import * as usersDB from './db'

export const handlers = [
    // Handles a POST /login request
    rest.post('https://auth.service.mock.com/register', async (req, res, ctx) => {
        const {userName, password} = req.body
        const userFields = {userName, password}

        await usersDB.createUser(userFields)

        return res(
            ctx.json({
                user: userFields
            })
        )
    }),

    // Handles a GET /user request
    rest.get('https://example.com/api/login', (req, res, ctx) => {
        return res(
            // ctx.delay(1500),
            ctx.status(202, 'Mocked status'),
            ctx.json({
                message: 'Mocked response JSON body',
            }),
        )
    }),
]
