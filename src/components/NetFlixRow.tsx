import React, {useEffect} from 'react'
import './Netflix.css'
// ** Const **
import {TYPE_MOVIE, IMAGE_URL_ORIGINAL} from '../const'
// ** MUI **
import {Alert, AlertTitle, CircularProgress} from '@mui/material'
// ** Utils **
import {clientApi} from '../utils/clientAPI'
import {useFetchData} from '../utils/hooks'

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

const NetFlixRow = ({
    type = TYPE_MOVIE,
    param,
    title = '',
    filter = 'populaire',
    watermark = false,
    wideImage = true,
}: IProps) => {
    const {data, error, status, execute} = useFetchData()

    const endpointLatest = `${type}/latest`
    const endpointPopular = `${type}/popular`
    const endpointTopRated = `${type}/top_rated`
    const endpointGenre = `discover/${type}?with_genres=${param}`
    const endpointTrending = `trending/${type}/day`

    let endpoint: string = ''

    switch (filter) {
        case 'populaire':
            endpoint = endpointPopular
            break
        case 'latest':
            endpoint = endpointLatest
            break
        case 'toprated':
            endpoint = endpointTopRated
            break
        case 'genre':
            endpoint = endpointGenre
            break
        case 'trending':
            endpoint = endpointTrending
            break

        default:
            break
    }

    useEffect(() => {
        execute(clientApi(endpoint))
        // console.log('endpoint', endpoint);
        // console.log('data', data);
    }, [endpoint, execute])

    // const image = wideImage ? 'images/sample-poster.jpg' : 'images/sample.jpg'

    const buildImagePath = (data: IMovie) => {
        const image = wideImage ? data?.backdrop_path : data?.poster_path
        return `${IMAGE_URL_ORIGINAL}${image}`
    }

    const watermarkClass: string = watermark ? 'watermarked' : ''

    if (status === 'fetching' || status === 'idle') {
        return (
            <div className="row">
                <h2>{title}</h2>
                <div className="row__posters">
                    <CircularProgress />
                </div>
            </div>
        )
    }

    if (status === 'error') {
        return (
            <Alert severity="error">
                <AlertTitle>Une erreur est survenue</AlertTitle>
                Détail : {error.message}
            </Alert>
        )
    }

    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row__posters">
                {data.data.results.map((movie: IMovie) => {
                    return (
                        <div
                            key={movie.id}
                            className={`row__poster row__posterLarge ${watermarkClass}`}
                        >
                            <img src={buildImagePath(movie)} alt={movie.name} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default NetFlixRow
