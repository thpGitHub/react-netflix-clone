import {rest} from 'msw'

export const handlers = [
    // Handles a POST /login request
    rest.post('/login', null),

    // Handles a GET /user request
    rest.get('https://github.com/thpGitHub', (req, res, ctx) => {
        return res(
            ctx.delay(1500),
            ctx.status(202, 'Mocked status'),
            ctx.json({
                message: 'Mocked response JSON body',
            }),
        )
    }),
]
