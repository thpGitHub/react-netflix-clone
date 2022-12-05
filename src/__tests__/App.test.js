import App from '../App'
// notre propre render mais le screen de testing library :)
import {render, screen, act, waitForElementToBeRemoved} from '../test/test-utils'
import userEvent from '@testing-library/user-event'

test('should render of App with login page', async () => {
    const connexion = 'Connexion'
    const register = 'Inscrivez-vous'

    render(<App></App>)
    await waitForElementToBeRemoved(() => screen.queryByRole('alert'))
    expect(screen.getByRole('heading', {name: connexion})).toBeInTheDocument()
    userEvent.click(screen.getByRole('button', {name: 'Nouveau sur Netflix ?'}))
    expect(screen.getByRole('heading', {name: register})).toBeInTheDocument()
})