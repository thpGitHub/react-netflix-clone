import React, {useState} from 'react'
import './Netflix.css'
// ** Components **
import NetFlixRow from './NetFlixRow'
import NetflixAppBar from './NetflixAppBar'
import NetflixFooter from './NetflixFooter'
import NetflixHeader from './NetflixHeader'
// ** Utils **
import {clientApi} from '../utils/clientAPI'
import {getRandomType, getRandomId} from '../utils/helper'
import {TYPE_MOVIE, TYPE_TV} from '../const'
// ** REACT Query
import {useQuery} from '@tanstack/react-query'

interface IProps {
    logout: () => void
    // authUser: any
    // setAuthUser: any
}

const NetflixApp = ({logout}: IProps) => {
    const [type] = useState(getRandomType())
    const [defaultMovieId] = useState(getRandomId(type))

    const {data: headerMovie} = useQuery([`${type}/${defaultMovieId}`], () =>
        clientApi(`${type}/${defaultMovieId}`),
    )

    return (
        <div>
            <NetflixAppBar logout={logout} />
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

// https://api.themoviedb.org/3/movie/550?api_key=8ee18f65008b7108b46834a1a60f55fc
