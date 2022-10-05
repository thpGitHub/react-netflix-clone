import React, {useState} from 'react'
import './Netflix.css'
// ** Components **
import NetFlixRow from './NetFlixRow'
import NetflixAppBar from './NetflixAppBar'
import NetflixFooter from './NetflixFooter'
import NetflixHeader from './NetflixHeader'
// ** Utils **
import {clientApi} from '../utils/clientAPI'
import {getRandomId} from '../utils/helper'
import {TYPE_TV} from '../const'
// ** REACT Query
import {useQuery} from '@tanstack/react-query'

interface IProps {
    logout: () => void
    // authUser: any
    // setAuthUser: any
}

const NetflixSeries = ({logout}: IProps) => {
    const [type] = useState(TYPE_TV)
    const [defaultMovieId] = useState(getRandomId(type))

    const {data: headerMovie} = useQuery([`${type}/${defaultMovieId}`], () =>
        clientApi(`${type}/${defaultMovieId}`),
    )

    return (
        <div>
            <NetflixAppBar logout={logout} />
            <NetflixHeader movie={headerMovie?.data} type={type} />

            <NetFlixRow
                type={TYPE_TV}
                title="Séries tendances Netflix"
                filter="trending"
                watermark={true}
                wideImage={true}
            />

            <NetFlixRow
                type={TYPE_TV}
                title="Séries les mieux notées"
                filter="toprated"
                watermark={true}
                wideImage={false}
            />

            <NetFlixRow
                type={TYPE_TV}
                title="Les séries populaires"
                filter="populaire"
                watermark={true}
                wideImage={false}
            />

            <NetFlixRow
                type={TYPE_TV}
                param="99"
                title="Les documentaires"
                filter="genre"
                watermark={true}
                wideImage={false}
            />

            <NetFlixRow
                type={TYPE_TV}
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

// https://api.themoviedb.org/3/movie/550?api_key=8ee18f65008b7108b46834a1a60f55fc
