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
// ** REACT Query
import {useQuery} from '@tanstack/react-query'

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
    setAuthUser: any
}

const NetflixNews = ({logout, authUser, setAuthUser}: IProps) => {
    const classes = useStyles()
    // const {data: headerMovie, error, status, execute} = useFetchData() as any
    const [type] = useState(getRandomType())
    const defaultMovieId = getRandomId(type)
    const [isFetchOneTime, setIsFetchOneTime] = useState(false)
    
    const {data: headerMovie} = useQuery([`${type}/${defaultMovieId}`], ()=> clientApi(`${type}/${defaultMovieId}`))
    // useEffect(() => {
    //     if (isFetchOneTime) {
    //         return
    //     }
    //     execute(clientApi(`${type}/${defaultMovieId}`))
    //     setIsFetchOneTime(true)
    // }, [execute, type, defaultMovieId, isFetchOneTime])

    return (
        <div>
            <NetflixAppBar logout={logout} />
            <NetflixHeader
                movie={headerMovie?.data}
                type={type}
                authUser={authUser}
                setAuthUser={setAuthUser}
            />

            <NetFlixRow
                type={TYPE_MOVIE}
                title="A venir"
                filter="latest"
                watermark={true}
                wideImage={true}
            />

            <NetFlixRow
                type={TYPE_TV}
                title="Nouveauté"
                filter="trending"
                watermark={true}
                wideImage={false}
            />

            <NetFlixRow
                type={TYPE_MOVIE}
                title="Les mieux notés"
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

            {/* {status === 'error' ? (
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
            ) : null} */}
        </div>
    )
}

export default NetflixNews

// https://api.themoviedb.org/3/movie/550?api_key=8ee18f65008b7108b46834a1a60f55fc
