import {rest} from 'msw'

export const handlers = [
    // Handles a POST /login request
    rest.post('https://auth.service.mock.com/register', (req, res, ctx) => {
        const {userName, password} = req.body
        const userFields = {userName, password}

        return res(
            ctx.json({
                message: userFields
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
