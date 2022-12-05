// notre propre render mais le screen de testing library :)
import {render, screen, act, waitForElementToBeRemoved} from '../../test/test-utils'
import userEvent from '@testing-library/user-event'
import LoginRegister from '../LoginRegister'
export {act} from '@testing-library/react'

test('should display Popup login or register', async () => {
    const connexion = 'Connexion'
    const register = 'Inscrivez-vous'

    render(<LoginRegister open={true}></LoginRegister>)
    await waitForElementToBeRemoved(() => screen.queryByRole('alert'))
    expect(screen.getByRole('heading', {name: connexion})).toBeInTheDocument()
    userEvent.click(screen.getByRole('button', {name: 'Nouveau sur Netflix ?'}))
    expect(screen.getByRole('heading', {name: register})).toBeInTheDocument()

})
