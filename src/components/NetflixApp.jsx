import {useState, useEffect} from 'react'
import './Netflix.css'

import NetFlixRow from './NetFlixRow'
import NetflixAppBar from './NetflixAppBar.tsx'
import NetflixHeader from './NetflixHeader'
import NetflixFooter from './NetflixFooter.tsx'

import { getRandomIntInclusive } from '../utils/helper'

import axios from 'axios'

const NetflixApp = () => {
    const [headerMovie, setHeaderMovie] = useState()
    const [type] = useState(['movie', 'tv'][getRandomIntInclusive(0,1)])

    const moviesIds = [399566, 602734, 579047, 385128, 615658]
    const tvIds = [71446, 60574, 1399, 66732]
  
    const movieId = moviesIds[getRandomIntInclusive(0, moviesIds.length -1)]
    const tvId = tvIds[getRandomIntInclusive(0, tvIds.length -1)]

    const defaultMovieId = type === 'movie' ? movieId : tvId

    // const apiKey = '4fc7b001e8a107fe1fddc6b41ed0f4af'
    const apiKey = '8ee18f65008b7108b46834a1a60f55fc'
    const lang = 'fr-fr'
    
    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/${type}/${defaultMovieId}?api_key=${apiKey}&language=${lang}`,
                )
                console.log('response', response)
                setHeaderMovie(response)
            } catch (error) {
                console.error(error)
            }
        }
        fetchMovie()
    }, [type, defaultMovieId])

    return (
        <div>
            <NetflixAppBar />
            {/* <NetflixHeader movie={''}/> */}
            <NetflixHeader movie={headerMovie?.data} type={type} />
            <NetFlixRow title="Films Netflix" />
            <NetFlixRow title="Séries Netflix" wideImage={false} />
            <NetflixFooter />
        </div>
    )
}

export default NetflixApp

// https://api.themoviedb.org/3/movie/550?api_key=8ee18f65008b7108b46834a1a60f55fc
