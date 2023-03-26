import React, {useState} from 'react'
import './Netflix.css'
// ** Components **
import NetflixRow from './NetflixRow'
import NetflixAppBar from './NetflixAppBar'
import NetflixFooter from './NetflixFooter'
import NetflixHeader from './NetflixHeader'
// ** Utils **
import {getRandomId} from '../utils/helper'
// ** REACT Query
import {useGetOneMovieWithApiTheMovieDB} from '../utils/hooksMovies'

const NetflixSeries = () => {
    const [type] = useState<'tv' | 'movie'>('tv')
    const [defaultMovieId] = useState(getRandomId(type))
    const headerMovie = useGetOneMovieWithApiTheMovieDB(type, defaultMovieId)

    return (
        <div>
            <NetflixAppBar />
            <NetflixHeader movie={headerMovie} type={type} />

            <NetflixRow
                type="tv"
                title="Séries tendances Netflix"
                filter="trending"
                watermark={true}
                wideImage={true}
            />

            <NetflixRow
                type="tv"
                title="Séries les mieux notées"
                filter="toprated"
                watermark={true}
                wideImage={false}
            />

            <NetflixRow
                type="tv"
                title="Les séries populaires"
                filter="popular"
                watermark={true}
                wideImage={false}
            />

            <NetflixRow
                type="tv"
                param="99"
                title="Les documentaires"
                filter="genre"
                watermark={true}
                wideImage={false}
            />

            <NetflixRow
                type="tv"
                param="80"
                title="Les séries criminelles"
                filter="genre"
                watermark={true}
                wideImage={false}
            />

            <NetflixFooter />
        </div>
    )
}

export default NetflixSeries
