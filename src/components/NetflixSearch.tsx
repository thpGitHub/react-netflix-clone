import React from 'react'
import {Link, useParams} from 'react-router-dom'
// ** Components **
import NetflixAppBar from './NetflixAppBar'
import NetflixFooter from './NetflixFooter'
import NetflixHeader from './NetflixHeader'
import RowSkeleton from './skeletons/RowSkeleton'
// ** Utils **
import {TYPE_MOVIE, TYPE_TV, IMAGE_URL_ORIGINAL} from '../const'
import {
    useGetOneMovieWithApiTheMovieDB,
    useSearchMoviesWithApiTheMovieDB,
} from '../utils/hooksMovies'

const NetflixSearch = () => {
    /*
     * {query: 'batman'}
     * {query: slug} destructuring and rename at the same time :)
     */
    const {query: slug} = useParams()
    /*
     *  https://api.themoviedb.org/3/search/multi?api_key=<SECRET KEY>&language=en-US&page=1&include_adult=false&query=batman
     * data === [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
     */
    const data = useSearchMoviesWithApiTheMovieDB(slug ?? '')
    const defaultMovie = useGetOneMovieWithApiTheMovieDB('tv', 72987)
    const headerMovie = data?.[0] ?? defaultMovie

    const type = headerMovie?.media_type
    const movies: any = data.filter(
        (result: any) => result.media_type === TYPE_MOVIE,
    )
    const series: any = data.filter(
        (result: any) => result.media_type === TYPE_TV,
    )

    return (
        <div>
            <NetflixAppBar />
            <NetflixHeader movie={headerMovie} type={type} />
            {data?.length === 0 ? (
                <div className="row">
                    <h2>Pas de résultat</h2>
                </div>
            ) : (
                <>
                    <NetflixRowView
                        data={movies}
                        wideImage={true}
                        watermark={true}
                        type={TYPE_MOVIE}
                        filter="trending"
                        title="Films correspondants"
                    />
                    <NetflixRowView
                        data={series}
                        wideImage={false}
                        watermark={true}
                        type={TYPE_TV}
                        filter="trending"
                        title="Série correspondantes"
                    />
                </>
            )}
            <NetflixFooter />
        </div>
    )
}
// 🐶'NetflixRowView' est le meme composant que 'NetflixRow' sauf qu'on
// lui passe un 'array'(data) de films/series
const NetflixRowView = ({
    data = [],
    title = '',
    filter = '',
    wideImage = true,
    type = TYPE_MOVIE,
    watermark = false,
}) => {
    const buildImagePath = (data: any) => {
        const image = wideImage ? data?.backdrop_path : data?.poster_path
        return `${IMAGE_URL_ORIGINAL}${image}`
    }
    const watermarkClass = watermark ? 'watermarked' : ''

    if (!data) {
        return <RowSkeleton title={title} wideImage={wideImage} />
    }
    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row__posters" role="listitem" aria-label={type}>
                {data.map((movie: any) => {
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

export default NetflixSearch
