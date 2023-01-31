import React from 'react'
import './Netflix.css'
import {Link} from 'react-router-dom'
// ** Component **
import RowSkeleton from './skeletons/RowSkeleton'
// ** Const **
import {TYPE_MOVIE, IMAGE_URL_ORIGINAL} from '../const'
// ** REACT Query
import {useMovieEndpoint} from '../utils/hooksMovies'

interface IProps {
    type: string
    param?: string
    title: string
    filter: string
    watermark: boolean
    wideImage: boolean
}

interface IMovie {
    adult: false
    backdrop_path: '/wcKFYIiVDvRURrzglV9kGu7fpfY.jpg'
    genre_ids: [14, 28, 12]
    id: 453395
    media_type: 'movie'
    title?: 'Doctor Strange in the Multiverse of Madness'
    name?: 'Doctor Strange in the Multiverse of Madness'
    original_language: 'en'
    original_title: 'Doctor Strange in the Multiverse of Madness'
    overview: "Le Docteur Strange lance un sort interdit qui ouvre le portail du Multivers, incluant des versions alternatives de lui-même. Cette menace à l'humanité est plus puissante que les pouvoirs combinés de Strange, Wong et Wanda Maximoff."
    popularity: 7931.499
    poster_path: '/arfzjn1tGvXWwkX7eaGVuXsc0mp.jpg'
    release_date: '2022-05-04'
    video: false
    vote_average: 7.539
    vote_count: 4015
}

const NetflixRow = ({
    type = TYPE_MOVIE,
    param = '',
    title = '',
    filter = 'populaire',
    watermark = false,
    wideImage = true,
}: IProps) => {
    const data = useMovieEndpoint(type, filter, param)

    const buildImagePath = (data: IMovie) => {
        const image = wideImage ? data?.backdrop_path : data?.poster_path
        return `${IMAGE_URL_ORIGINAL}${image}`
    }

    const watermarkClass: string = watermark ? 'watermarked' : ''

    if (!data) {
        return <RowSkeleton title={title} wideImage={true} />
    }

    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row__posters">
                {/* {data.data.results.map((movie: IMovie) => { */}
                {data?.data?.results?.map((movie: IMovie) => {
                    return (
                        <Link key={movie.id} to={`/${type}/${movie.id}`}>
                            <div
                                className={`row__poster row__posterLarge ${watermarkClass}`}
                            >
                                <img
                                    src={buildImagePath(movie)}
                                    alt={movie.name}
                                />
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default NetflixRow
