import React, {useState} from 'react'
import './Netflix.css'
// ** Components **
import NetflixRow from './NetflixRow'
import NetflixAppBar from './NetflixAppBar'
import NetflixFooter from './NetflixFooter'
import NetflixHeader from './NetflixHeader'
// ** Utils **
import {getRandomId} from '../utils/helper'
import {TYPE_MOVIE} from '../const'
// ** REACT Query
import { useGetOneMovie } from '../utils/hooksMovies'

// interface IProps {
//     logout: () => void
//     // authUser: any
//     // setAuthUser: any
// }

const NetflixMovies = () => {
    const [type] = useState(TYPE_MOVIE)
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
                type={TYPE_MOVIE}
                title="Films Netflix"
                filter="trending"
                watermark={true}
                wideImage={true}
            />

            <NetflixRow
                type={TYPE_MOVIE}
                title="Les mieux notées"
                filter="toprated"
                watermark={true}
                wideImage={false}
            />

            <NetflixRow
                type={TYPE_MOVIE}
                title="Les films populaires"
                filter="populaire"
                watermark={true}
                wideImage={false}
            />

            <NetflixRow
                type={TYPE_MOVIE}
                param="14"
                title="Les films fantastiques"
                filter="genre"
                watermark={true}
                wideImage={false}
            />

            <NetflixRow
                type={TYPE_MOVIE}
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
