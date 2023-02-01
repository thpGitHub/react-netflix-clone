import React, {useState} from 'react'
import './Netflix.css'
// ** Components **
import NetflixRow from './NetflixRow'
import NetflixAppBar from './NetflixAppBar'
import NetflixFooter from './NetflixFooter'
import NetflixHeader from './NetflixHeader'
// ** Utils **
import {getRandomId} from '../utils/helper'
import {TYPE_TV} from '../const'
// ** REACT Query
import { useGetOneMovie } from '../utils/hooksMovies'

// interface IProps {
//     logout: () => void
//     // authUser: any
//     // setAuthUser: any
// }

const NetflixSeries = () => {
    const [type] = useState(TYPE_TV)
    const [defaultMovieId] = useState(getRandomId(type))

    // const {data: headerMovie} = useQuery([`${type}/${defaultMovieId}`], () =>
    //     clientApi(`${type}/${defaultMovieId}`),
    // )
    const headerMovie = useGetOneMovie(type, defaultMovieId)

    return (
        <div>
            <NetflixAppBar />
            <NetflixHeader movie={headerMovie?.data} type={type} />

            <NetflixRow
                type={TYPE_TV}
                title="Séries tendances Netflix"
                filter="trending"
                watermark={true}
                wideImage={true}
            />

            <NetflixRow
                type={TYPE_TV}
                title="Séries les mieux notées"
                filter="toprated"
                watermark={true}
                wideImage={false}
            />

            <NetflixRow
                type={TYPE_TV}
                title="Les séries populaires"
                filter="populaire"
                watermark={true}
                wideImage={false}
            />

            <NetflixRow
                type={TYPE_TV}
                param="99"
                title="Les documentaires"
                filter="genre"
                watermark={true}
                wideImage={false}
            />

            <NetflixRow
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
