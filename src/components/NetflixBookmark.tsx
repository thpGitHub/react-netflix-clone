import React, {useEffect} from 'react'
import NetflixAppBar from './NetflixAppBar'
import NetflixHeader from './NetflixHeader'
import {useFetchData} from '../utils/hooks'
import {clientApi, clientNetflix} from '../utils/clientAPI'
import {TYPE_MOVIE} from '../const'

interface IProps {
    logout: () => void
    authUser: any
}

const NetflixBookmark = ({logout, authUser}: IProps) => {
    const {data, execute, setData} = useFetchData()
    const {data: headerMovie, execute: executeHeader} = useFetchData()
    const idDefault = 749274

    // useEffect(() => {
    //     setData(authUser)
    // }, [authUser, setData])

    useEffect(() => {
        const data = authUser
        
        execute(clientNetflix('bookmark', {data, method: 'POST'}))
    }, [])

    useEffect(() => {
        const id = data?.bookmark?.movies[0] ?? idDefault
        executeHeader(clientApi(`${TYPE_MOVIE}/${id}`))
    }, [data, executeHeader])

    return (
        <>
            <NetflixAppBar logout={logout} />
            <NetflixHeader
                movie={headerMovie?.data}
                type={TYPE_MOVIE}
                authUser={authUser}
            />
        </>
    )
}
export default NetflixBookmark
