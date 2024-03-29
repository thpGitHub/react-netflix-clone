import React, {useState} from 'react'
import './Netflix.css'
// ** Components **
import NetflixAppBar from './NetflixAppBar'
import NetflixFooter from './NetflixFooter'
import NetflixHeader from './NetflixHeader'
// ** Utils **
import {useGetOneMovieWithApiTheMovieDB} from '../utils/hooksMovies'
import {getRandomType, getRandomId} from '../utils/helper'
import NetflixRow from './NetflixRow'

const NetflixApp = () => {
    const [type] = useState(getRandomType())
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
                type="tv"
                title="Séries Netflix"
                filter="trending"
                watermark={true}
                wideImage={false}
            />

            <NetflixRow
                type="movie"
                title="Les mieux notés"
                filter="toprated"
                watermark={true}
                wideImage={false}
            />

            <NetflixRow
                type="tv"
                param="10759"
                title="Action & aventure"
                filter="genre"
                watermark={true}
                wideImage={false}
            />

            <NetflixRow
                type="movie"
                param="53"
                title="Les meilleurs thrillers"
                filter="genre"
                watermark={true}
                wideImage={false}
            />

            <NetflixFooter />
        </div>
    )
}

export default NetflixApp
