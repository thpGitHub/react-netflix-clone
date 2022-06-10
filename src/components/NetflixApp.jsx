import {useState, useEffect} from 'react'
import './Netflix.css'
import NetflixAppBar from './NetflixAppBar'
import NetflixHeader from './NetflixHeader'
import NetFlixRow from './NetFlixRow'
import NetflixFooter from './NetflixFooter'
import axios from 'axios'

const NetflixApp = () => {
    const [headerMovie, setHeaderMovie] = useState()
    const defaultMovieId = 399566
    // const apiKey = '4fc7b001e8a107fe1fddc6b41ed0f4af'
    const apiKey = '8ee18f65008b7108b46834a1a60f55fc'
    const lang = 'fr-fr'

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/movie/${defaultMovieId}?api_key=${apiKey}&language=${lang}`,
                )
                console.log('response', response)
                setHeaderMovie(response)
            } catch (error) {
                console.error(error)
            }
        }
        fetchMovie()
    }, [])

    return (
        <div>
            <NetflixAppBar />
            {/* <NetflixHeader movie={''}/> */}
            <NetflixHeader movie={headerMovie?.data} />
            <NetFlixRow title="Films Netflix" />
            <NetFlixRow title="Séries Netflix" wideImage={false} />
            <NetflixFooter />
        </div>
    )
}

export default NetflixApp

// https://api.themoviedb.org/3/movie/550?api_key=8ee18f65008b7108b46834a1a60f55fc
