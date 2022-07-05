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

const useStyles = makeStyles((theme: Theme) => ({
    alert: {
        width: '50%',
        margin: 'auto',
        marginBotton: '50px',
    },
    progress: {
        marginLeft: '300px',
        // color: 'red',
    },
})) as any

const NetflixApp = () => {
    const classes = useStyles()
    const {data: headerMovie, error, status, execute} = useFetchData() as any
    // const [headerMovie, setHeaderMovie] = useState<AxiosResponse | null | void>()
    // const [headerMovie, setHeaderMovie] = useState<AxiosResponse>()
    const [type] = useState(getRandomType())
    const defaultMovieId = getRandomId(type)
    // const [status, setStatus] = useState<string>('idle')

    useEffect(() => {
        execute(clientApi(`${type}/${defaultMovieId}`))
        // setStatus('fetching')
        // clientApi(`${type}/${defaultMovieId}`)
        //     .then(response => {
        //         setHeaderMovie(response)
        //         setStatus('done')
        //     })
        //     .catch(error => setStatus('error'))
    }, [])

    return (
        <div>
            <NetflixAppBar />
            {/* <NetflixHeader movie={''}/> */}
            <NetflixHeader movie={headerMovie?.data} type={type} />
            <NetFlixRow title="Films Netflix" />
            <NetFlixRow title="Séries Netflix" wideImage={false} />
            <NetflixFooter />

            {status === 'error' ? (
                <div className={classes.alert}>
                    <Alert severity="error">
                        <AlertTitle>Une erreur est survenue</AlertTitle>
                        {/* Réessayer ulterieurement - <strong>Netflix !</strong> */}
                        détail : {error.message}
                    </Alert>
                </div>
            ) : null}

            {status === 'fetching' ? (
                <div className={classes.progress}>
                    {/* <CircularProgress color="inherit" /> */}
                    <CircularProgress />
                </div>
            ) : null}
        </div>
    )
}

export default NetflixApp

// https://api.themoviedb.org/3/movie/550?api_key=8ee18f65008b7108b46834a1a60f55fc
