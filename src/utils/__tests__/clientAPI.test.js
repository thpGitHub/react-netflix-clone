import {clientAuth} from '../clientAPI'
import {server, rest} from '../../mocks'
// import {nanoid} from 'nanoid'

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())

test('send a request to a endPoint', async () => {
    const endPoint = 'fake-endpoint'
    const resultRequest = {mockResult: 'TEST'}
    const resultRequestFalse = {mockResult: 'TEST2'}

    server.use(
        rest.get(
            `https://auth.service.mock.com/${endPoint}`,
            (req, res, ctx) => {
                return res(ctx.json(resultRequest))
            },
        ),
    )

    const result = await clientAuth(endPoint)
    // console.log("result === ", result.data)
    expect(result.data).toEqual(resultRequest)
    // expect(result.data).toEqual(resultRequestFalse)
})
