import React, {useState, useEffect} from 'react'
import './Netflix.css'
import {useParams, useLocation} from 'react-router-dom'
// ** Components **
import NetflixRow from './NetflixRow'
import NetflixAppBar from './NetflixAppBar'
import NetflixFooter from './NetflixFooter'
import NetflixHeader from './NetflixHeader'
// ** Utils **
import {TYPE_MOVIE, TYPE_TV} from '../const'
// ** REACT Query
import { useGetOneMovieWithApiTheMovieDB } from '../utils/hooksMovies'

// interface IProps {
//     logout: () => void
//     // authUser: any
//     // setAuthUser: any
// }

// const NetflixById = ({logout}: IProps) => {
const NetflixById = () => {
    let {tvId, movieId} = useParams()
    const location = useLocation()

    //console.log('location', location)
    //console.log('params tvID', tvId)
    //console.log('params movieId', movieId)

    // const [type, setType] = useState(
    //     location.pathname.includes(TYPE_TV) ? TYPE_TV : TYPE_MOVIE,
    // )
    const [type, setType] = useState<'tv' | 'movie'>(
        location.pathname.includes('tv') ? 'tv' : 'movie',
    )
    const [id, setId] = useState(type === TYPE_TV ? tvId : movieId)

    // const {data: headerMovie} = useQuery([`${type}/${id}`], () =>
    //     clientApi(`${type}/${id}`),
    // )
    const headerMovie = useGetOneMovieWithApiTheMovieDB(type, Number(id))

    useEffect(() => {
        const type = location.pathname.includes('tv') ? 'tv' : 'movie'
        setType(type)
        setId(type === TYPE_TV ? tvId : movieId)

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }, [location.pathname, movieId, tvId])

    return (
        <div>
            {/* <NetflixAppBar logout={logout} /> */}
            <NetflixAppBar />
            <NetflixHeader movie={headerMovie} type={type} />

            <NetflixRow
                type='movie'
                title="Films Netflix"
                filter="trending"
                watermark={true}
                wideImage={true}
            />

            <NetflixRow
                type='tv'
                title="Séries Netflix"
                filter="trending"
                watermark={true}
                wideImage={false}
            />

            <NetflixRow
                type='movie'
                title="Les mieux notés"
                filter="toprated"
                watermark={true}
                wideImage={false}
            />

            <NetflixRow
                type='tv'
                param="10759"
                title="Action & aventure"
                filter="genre"
                watermark={true}
                wideImage={false}
            />

            <NetflixRow
                type='movie'
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

export default NetflixById

