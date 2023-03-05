import React from 'react'
import './Netflix.css'
import {Link} from 'react-router-dom'
// ** Component **
import RowSkeleton from './skeletons/RowSkeleton'
// ** Const **
import {TYPE_MOVIE, IMAGE_URL_ORIGINAL} from '../const'
// ** REACT Query
import {useGetMoviesbyEndpointWithApiTheMovieDB} from '../utils/hooksMovies'
// ** TS **
import {MovieOrTV} from 'src/ts/interfaces/getMultiTvOrMovie'

type NetflixRowProps = {
    type: string
    param?: string
    title: string
    filter: string
    watermark: boolean
    wideImage: boolean
}

const NetflixRow = ({
    type = TYPE_MOVIE,
    param = '',
    title = '',
    filter = 'populaire',
    watermark = false,
    wideImage = true,
}: NetflixRowProps) => {
    const data = useGetMoviesbyEndpointWithApiTheMovieDB(type, filter, param)
    console.log({dataInNetflixrow: data})

    // const buildImagePath = (data: IMovie) => {
    const buildImagePath = (data: MovieOrTV) => {
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
                {data?.data?.results?.map((movie: MovieOrTV) => {
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
