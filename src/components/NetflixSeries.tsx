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

interface IProps {
    logout: () => void
    authUser: any
    }

const NetflixSeries = ({logout, authUser}: IProps) => {
    const classes = useStyles()
    const {data: headerMovie, error, status, execute} = useFetchData() as any
    const [type] = useState(TYPE_TV)
    const defaultMovieId = getRandomId(type)

    useEffect(() => {
        execute(clientApi(`${type}/${defaultMovieId}`))
    }, [])

    return (
        <div>
            <NetflixAppBar logout={logout}/>
            <NetflixHeader movie={headerMovie?.data} type={type} authUser={authUser} />

            <NetFlixRow
                type={TYPE_TV}
                title="Séries tendances Netflix"
                filter="trending"
                watermark={true}
                wideImage={true}
            />

            <NetFlixRow
                type={TYPE_TV}
                title="Séries les mieux notées"
                filter="toprated"
                watermark={true}
                wideImage={false}
            />

            <NetFlixRow
                type={TYPE_TV}
                title="Les séries populaires"
                filter="populaire"
                watermark={true}
                wideImage={false}
            />

            <NetFlixRow
                type={TYPE_TV}
                param="99"
                title="Les documentaires"
                filter="genre"
                watermark={true}
                wideImage={false}
            />

            <NetFlixRow
                type={TYPE_TV}
                param="80"
                title="Les séries criminelles"
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

export default NetflixSeries

// https://api.themoviedb.org/3/movie/550?api_key=8ee18f65008b7108b46834a1a60f55fc
