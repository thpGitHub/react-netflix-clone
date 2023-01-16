import React, {useState} from 'react'
import './Netflix.css'
// ** Components **
import NetFlixRow from './NetFlixRow'
import NetflixAppBar from './NetflixAppBar'
import NetflixFooter from './NetflixFooter'
import NetflixHeader from './NetflixHeader'
// ** Utils **
import {TYPE_MOVIE, TYPE_TV} from '../const'
import {getRandomType, getRandomId} from '../utils/helper'
import {useGetOneMovie} from '../utils/hooksMovies'

const NetflixApp = () => {
    const [type] = useState(getRandomType())
    const [defaultMovieId] = useState(getRandomId(type))
    const headerMovie = useGetOneMovie(type, defaultMovieId)

    return (
        <div>
            <NetflixAppBar />
            <NetflixHeader movie={headerMovie?.data} type={type} />

            <NetFlixRow
                type={TYPE_MOVIE}
                title="Films Netflix"
                filter="trending"
                watermark={true}
                wideImage={true}
            />

            <NetFlixRow
                type={TYPE_TV}
                title="Séries Netflix"
                filter="trending"
                watermark={true}
                wideImage={false}
            />

            <NetFlixRow
                type={TYPE_MOVIE}
                title="Les mieux notés"
                filter="toprated"
                watermark={true}
                wideImage={false}
            />

            <NetFlixRow
                type={TYPE_TV}
                param="10759"
                title="Action & aventure"
                filter="genre"
                watermark={true}
                wideImage={false}
            />

            <NetFlixRow
                type={TYPE_MOVIE}
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

