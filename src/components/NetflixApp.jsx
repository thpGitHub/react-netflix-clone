import './Netflix.css'
import NetflixAppBar from './NetflixAppBar'
import NetflixHeader from './NetflixHeader'
import NetFlixRow from './NetFlixRow'
import NetflixFooter from './NetflixFooter'

const NetflixApp = () => {
    return (
        <div>
            <NetflixAppBar />
            <NetflixHeader />
            <NetFlixRow title="Films Netflix" />
            <NetFlixRow title="Séries Netflix" wideImage={false} />
            <NetflixFooter />
        </div>
    )
}

export default NetflixApp
