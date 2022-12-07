import {render, screen, waitForElementToBeRemoved} from '../../test/test-utils'
import NetflixApp from '../NetflixApp'
import {BrowserRouter as Router} from 'react-router-dom'

test('should (first)', async () => {
    render(
        <Router>
            <NetflixApp></NetflixApp>
        </Router>,
    )
    await waitForElementToBeRemoved(() => screen.queryByRole('alert'))
    // screen.debug()
    // screen.logTestingPlaygroundURL()
    expect(screen.getByRole('heading', {name: /accueil/i})).toBeInTheDocument()
})
