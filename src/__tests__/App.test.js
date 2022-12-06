import App from '../App'
// notre propre render mais le screen de testing library :)
import {render, screen, waitForElementToBeRemoved} from '../test/test-utils'
import userEvent from '@testing-library/user-event'
import {TOKEN_KEY_IN_LOCAL_STORAGE} from '../const'
import {server, rest} from '../mocks'

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('should render of App with login page', async () => {
    const connexion = 'Connexion'
    const register = 'Inscrivez-vous'

    render(<App></App>)
    await waitForElementToBeRemoved(() => screen.queryByRole('alert'))
    expect(screen.getByRole('heading', {name: connexion})).toBeInTheDocument()
    userEvent.click(screen.getByRole('button', {name: 'Nouveau sur Netflix ?'}))
    expect(screen.getByRole('heading', {name: register})).toBeInTheDocument()
})

test('sould render of App in connect mode', async () => {
    server.use(
        rest.get(
            'https://auth.service.mock.com/getUserAuth',
            async (req, res, ctx) => {
                return res(
                    ctx.json({
                        user: user,
                    }),
                )
            },
        ),
    )
    const connexion = 'Connexion'
    const register = 'Inscrivez-vous'
    const localStorageKey = 'netflixTEST-clone-users'
    const user = [
        {
            id: '1',
            userName: 'fakeUsername',
            passwordHash: 'fakepassword',
            token: 'fakeToken',
            bookmark: {
                movies: [414906],
                series: [414906],
            },
        },
    ]
    localStorage.setItem(TOKEN_KEY_IN_LOCAL_STORAGE, user[0].token)
    localStorage.setItem('netflixTEST-clone-users', JSON.stringify(user))
    // console.log('user.token === ', user[0].token)

    render(<App></App>)
    // console.log('user.token === ', user.token)
    await waitForElementToBeRemoved(() => screen.queryByRole('alert'))
    // screen.debug()
    // screen.logTestingPlaygroundURL()
    expect(
        screen.queryByRole('heading', {name: connexion}),
    ).not.toBeInTheDocument()
    expect(
        screen.queryByRole('heading', {name: register}),
    ).not.toBeInTheDocument()
})
