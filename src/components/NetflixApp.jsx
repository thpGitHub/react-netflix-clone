import './Netflix.css'
import NetflixAppBar from './NetflixAppBar'
import NetflixHeader from './NetflixHeader'
import NetFlixRow from './NetFlixRow'
import NetflixFooter from './NetflixFooter'

const NetflixApp = () => {
    return (
        <div>
            <NetflixAppBar />
            {/* <NetflixHeader movie={''}/> */}
            <NetflixHeader movie={'pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg'}/>
            <NetFlixRow title="Films Netflix" />
            <NetFlixRow title="Séries Netflix" wideImage={false} />
            <NetflixFooter />
        </div>
    )
}

export default NetflixApp
