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

const NetflixMovies = () => {
    const [type] = useState<'tv' | 'movie'>('movie')
    const [defaultMovieId] = useState(getRandomId(type))
    const headerMovie = useGetOneMovieWithApiTheMovieDB(type, defaultMovieId)

    return (
        <div>
            <NetflixAppBar />
            <NetflixHeader movie={headerMovie} type={type} />

            <NetflixRow
                type="movie"
                title="Films Netflix"
                filter="trending"
                watermark={true}
                wideImage={true}
            />

            <NetflixRow
                type="movie"
                title="Les mieux notées"
                filter="toprated"
                watermark={true}
                wideImage={false}
            />

            <NetflixRow
                type="movie"
                title="Les films populaires"
                filter="popular"
                watermark={true}
                wideImage={false}
            />

            <NetflixRow
                type="movie"
                param="14"
                title="Les films fantastiques"
                filter="genre"
                watermark={true}
                wideImage={false}
            />

            <NetflixRow
                type="movie"
                param="878"
                title="Les films de sciences fictions"
                filter="genre"
                watermark={true}
                wideImage={false}
            />

            <NetflixFooter />
        </div>
    )
}

export default NetflixMovies
