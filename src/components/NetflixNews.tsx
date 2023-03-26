import React, {useState} from 'react'
import './Netflix.css'
// ** Components **
import NetflixRow from './NetflixRow'
import NetflixAppBar from './NetflixAppBar'
import NetflixFooter from './NetflixFooter'
import NetflixHeader from './NetflixHeader'
// ** Utils **
import {getRandomType, getRandomId} from '../utils/helper'
// import {TYPE_MOVIE, TYPE_TV} from '../const'
// ** REACT Query
import {useGetOneMovieWithApiTheMovieDB} from '../utils/hooksMovies'

// interface IProps {
//     logout: () => void
//     // authUser: any
//     // setAuthUser: any
// }

const NetflixNews = () => {
    const [type] = useState(getRandomType())
    const [defaultMovieId] = useState(getRandomId(type))

    // const {data: headerMovie} = useQuery([`${type}/${defaultMovieId}`], () =>
    //     clientApi(`${type}/${defaultMovieId}`),
    // )
    const headerMovie = useGetOneMovieWithApiTheMovieDB(type, defaultMovieId)

    return (
        <div>
            <NetflixAppBar />
            <NetflixHeader movie={headerMovie} type={type} />

            <NetflixRow
                type="movie"
                title="A venir"
                filter="latest"
                watermark={true}
                wideImage={true}
            />

            <NetflixRow
                type="tv"
                title="Nouveauté"
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

export default NetflixNews
