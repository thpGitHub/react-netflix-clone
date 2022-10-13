import React from 'react'
import NetflixAppBar from './NetflixAppBar'
import NetflixHeader from './NetflixHeader'
import {clientApi} from '../utils/clientAPI'
import * as authNetflix from '../utils/authNetflixProvider'
import {clientAuth} from '../utils/clientAPI'
import {TYPE_MOVIE} from '../const'
import {useMovie, useBookmark} from '../utils/hooksMovies'
// ** REACT Query
import {useQuery} from '@tanstack/react-query'

interface IProps {
    logout: () => void
    // authUser: any
    // setAuthUser: any
}

/**
 * This function is two fold in App.tsx
 */
const getUserByToken = async () => {
    let user = null
    const token = await authNetflix.getTokenInLocalStorage()

    if (token) {
        console.log('Token exist :)')
        const data = await clientAuth('getUserAuth', token)
        // AxiosResponse
        user = data.data.user
        console.log('data ====', data)
        console.log('user ====', user)
    }

    return user
}

const NetflixBookmark = ({logout}: IProps) => {
    const idDefault = 749274

    // const {data} = useQuery(['bookmark'], () => {
    //     return getUserByToken()
    // })
    const data = useBookmark()

    const id = data?.bookmark?.movies[0] ?? idDefault

    // const {data: headerMovie} = useQuery([`${TYPE_MOVIE}/${id}`], () =>
    //     clientApi(`${TYPE_MOVIE}/${id}`),
    // )
    const headerMovie = useMovie(TYPE_MOVIE, id)

    return (
        <>
            <NetflixAppBar logout={logout} />
            <NetflixHeader movie={headerMovie?.data} type={TYPE_MOVIE} />
        </>
    )
}

export default NetflixBookmark
