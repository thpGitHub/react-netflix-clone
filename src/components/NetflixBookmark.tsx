import React, {useState, useEffect} from 'react'
import NetflixAppBar from './NetflixAppBar'
import NetflixHeader from './NetflixHeader'
import {useFetchData} from '../utils/hooks'
import {clientApi, clientNetflix} from '../utils/clientAPI'
import * as authNetflix from '../utils/authNetflixProvider'
import {clientAuth} from '../utils/clientAPI'
import {TYPE_MOVIE} from '../const'
// ** REACT Query
import {useQuery} from '@tanstack/react-query'

interface IProps {
    logout: () => void
    authUser: any
    setAuthUser: any
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

const NetflixBookmark = ({logout, authUser, setAuthUser}: IProps) => {
    const {data, execute, setData} = useFetchData()
    // const [data, setData] = useState<any>()

    // const {data} = useQuery(['bookmark'], ()=> {
    //    return {data: authUser, method: 'POST'}})
    // }
    const {data: headerMovie, execute: executeHeader} = useFetchData()
    const idDefault = 749274
    // const id = data?.bookmark?.movies[0] ?? idDefault

    // useEffect(() => {
    //     setData(authUser)
    // }, [authUser, setData])

    useEffect(() => {
        execute(getUserByToken())
    }, [execute])

    // const {data: headerMovie} = useQuery([`${TYPE_MOVIE}/${id}`], () =>
    //     clientApi(`${TYPE_MOVIE}/${id}`),
    // )

    // useEffect(() => {
    //     execute(clientNetflix('bookmark', {data: authUser, method: 'POST'}))
    // }, [authUser, execute])

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
