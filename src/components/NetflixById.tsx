import React, {useState, useEffect} from 'react'
import './Netflix.css'
import {useParams, useLocation} from 'react-router-dom'
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

const NetflixById = () => {
    const classes = useStyles()
    const {data: headerMovie, error, status, execute} = useFetchData() as any

    let {tvId, movieId} = useParams()
    const location = useLocation()

    console.log('location', location)
    console.log('params tvID', tvId)
    console.log('params movieId', movieId)

    const [type, setType] = useState(
        location.pathname.includes(TYPE_TV) ? TYPE_TV : TYPE_MOVIE,
    )
    const [id, setId] = useState(type === TYPE_TV ? tvId : movieId)

    useEffect(() => {
        execute(clientApi(`${type}/${id}`))
    }, [execute, type, id])

    useEffect(() => {
        const type = location.pathname.includes(TYPE_TV) ? TYPE_TV : TYPE_MOVIE
        setType(type)
        setId(type === TYPE_TV ? tvId : movieId)

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })

    }, [location.pathname, movieId, tvId])

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
                type={TYPE_TV}
                title="S??ries Netflix"
                filter="trending"
                watermark={true}
                wideImage={false}
            />

            <NetFlixRow
                type={TYPE_MOVIE}
                title="Les mieux not??s"
                filter="toprated"
                watermark={true}
                wideImage={false}
            />

            <NetFlixRow
                type={TYPE_TV}
                param="10759"
                title="Action & aventure"
                filter="genre"
                watermark={true}
                wideImage={false}
            />

            <NetFlixRow
                type={TYPE_MOVIE}
                param="53"
                title="Les meilleurs thrillers"
                filter="genre"
                watermark={true}
                wideImage={false}
            />

            <NetflixFooter />

            {status === 'error' ? (
                <div className={classes.alert}>
                    <Alert severity="error">
                        <AlertTitle>Une erreur est survenue</AlertTitle>
                        d??tail : {error.message}
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

export default NetflixById

// https://api.themoviedb.org/3/movie/550?api_key=8ee18f65008b7108b46834a1a60f55fc
