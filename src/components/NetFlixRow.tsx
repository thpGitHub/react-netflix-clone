import React, {useEffect} from 'react'
// ** Const **
import {TYPE_MOVIE, IMAGE_URL_ORIGINAL} from '../const'
// ** MUI **
import {Alert, AlertTitle, CircularProgress} from '@mui/material'
// ** Utils **
import {clientApi} from '../utils/clientAPI'
import {useFetchData} from '../utils/hooks'

const NetFlixRow = ({
    title = '',
    wideImage = true,
    type = TYPE_MOVIE,
    param,
    filter = 'populaire',
    watermark = true,
}) => {
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

    const image = wideImage ? 'images/sample-poster.jpg' : 'images/sample.jpg'

    const buildImagePath = data => {
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
                {data.data.results.map(movie => {
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
