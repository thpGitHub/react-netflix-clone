import React, {useState, useEffect} from 'react'
import './Netflix.css'
// ** Components **
import NetFlixRow from './NetFlixRow'
import NetflixAppBar from './NetflixAppBar'
import NetflixFooter from './NetflixFooter'
import NetflixHeader from './NetflixHeader'
// ** MUI **
import {makeStyles} from '@mui/styles'
import {Alert, AlertTitle, CircularProgress, Theme} from '@mui/material'
// ** Utils **
import {clientApi} from '../utils/clientAPI'
import {useFetchData} from '../utils/hooks'
import {getRandomType, getRandomId} from '../utils/helper'
import {TYPE_MOVIE, TYPE_TV} from '../const'

const useStyles = makeStyles((theme: Theme) => ({
    alert: {
        width: '50%',
        margin: 'auto',
        marginBotton: '50px',
    },
    progress: {
        marginLeft: '300px',
    },
})) as any

const NetflixMovies = () => {
    const classes = useStyles()
    const {data: headerMovie, error, status, execute} = useFetchData() as any
    const [type] = useState(TYPE_MOVIE)
    const defaultMovieId = getRandomId(type)

    useEffect(() => {
        execute(clientApi(`${type}/${defaultMovieId}`))
    }, [])

    return (
        <div>
            <NetflixAppBar />
            <NetflixHeader movie={headerMovie?.data} type={type} />

            <NetFlixRow
                type={TYPE_MOVIE}
                title="Films Netflix"
                filter="trending"
                watermark={true}
                wideImage={true}
            />

            <NetFlixRow
                type={TYPE_MOVIE}
                title="Les mieux notées"
                filter="toprated"
                watermark={true}
                wideImage={false}
            />

            <NetFlixRow
                type={TYPE_MOVIE}
                title="Les films populaires"
                filter="populaire"
                watermark={true}
                wideImage={false}
            />

            <NetFlixRow
                type={TYPE_MOVIE}
                param="14"
                title="Les films fantastiques"
                filter="genre"
                watermark={true}
                wideImage={false}
            />

            <NetFlixRow
                type={TYPE_MOVIE}
                param="878"
                title="Les films de sciences fictions"
                filter="genre"
                watermark={true}
                wideImage={false}
            />

            <NetflixFooter />

            {status === 'error' ? (
                <div className={classes.alert}>
                    <Alert severity="error">
                        <AlertTitle>Une erreur est survenue</AlertTitle>
                        détail : {error.message}
                    </Alert>
                </div>
            ) : null}

            {status === 'fetching' ? (
                <div className={classes.progress}>
                    <CircularProgress />
                </div>
            ) : null}
        </div>
    )
}

export default NetflixMovies

// https://api.themoviedb.org/3/movie/550?api_key=8ee18f65008b7108b46834a1a60f55fc
