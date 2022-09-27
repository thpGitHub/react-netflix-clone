import React, {useEffect} from 'react'
import NetflixAppBar from './NetflixAppBar'
import NetflixHeader from './NetflixHeader'
import {useFetchData} from '../utils/hooks'
import {clientApi, clientNetflix} from '../utils/clientAPI'
import {TYPE_MOVIE} from '../const'

interface IProps {
    logout: () => void
    authUser: any
    setAuthUser: any
}

const NetflixBookmark = ({logout, authUser, setAuthUser}: IProps) => {
    const {data, execute, setData} = useFetchData()
    const {data: headerMovie, execute: executeHeader} = useFetchData()
    const idDefault = 749274

    useEffect(() => {
        setData(authUser)
    }, [authUser, setData])

    useEffect(() => {
        execute(clientNetflix('bookmark', {data: authUser, method: 'POST'}))
    }, [authUser, execute])

    useEffect(() => {
        const id = data?.bookmark?.movies[0] ?? idDefault
        console.log('id in 3em useEffect === ', id)

        executeHeader(clientApi(`${TYPE_MOVIE}/${id}`))
    }, [data, executeHeader])

    return (
        <>
            <NetflixAppBar logout={logout} />
            <NetflixHeader
                movie={headerMovie?.data}
                type={TYPE_MOVIE}
                authUser={data}
                setAuthUser={setAuthUser}
            />
        </>
    )
}

export default NetflixBookmark
