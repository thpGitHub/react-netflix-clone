import React, {useState, useEffect} from 'react'
import './Netflix.css'

import NetFlixRow from './NetFlixRow'
import NetflixAppBar from './NetflixAppBar'
import NetflixHeader from './NetflixHeader'
import NetflixFooter from './NetflixFooter'

import {getRandomType, getRandomId} from '../utils/helper'
import {clientApi} from '../utils/clientAPI'
import {API_KEY, LANG} from '../const'

import axios, {AxiosResponse} from 'axios'
// import {AxiosResponse} from '../ts/interfaces/axiosResponse'

import {makeStyles} from '@mui/styles'
import {Theme} from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Box from '@mui/material/Box'

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
    // const [headerMovie, setHeaderMovie] = useState<AxiosResponse | null | void>()
    const [headerMovie, setHeaderMovie] = useState<AxiosResponse>()
    const [type] = useState(getRandomType())
    const defaultMovieId = getRandomId(type)
    const [status, setStatus] = useState<string>('idle')

    useEffect(() => {
        setStatus('fetching')
        clientApi(`${type}/${defaultMovieId}`)
            .then(response => {
                setHeaderMovie(response)
                setStatus('done')
            })
            .catch(error => setStatus('error'))
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
                        Réessayer ulterieurement - <strong>Netflix !</strong>
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
