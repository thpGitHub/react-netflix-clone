import React from 'react'
import NetflixAppBar from './NetflixAppBar'
import NetflixHeader from './NetflixHeader'
import {TYPE_MOVIE} from '../const'
import {useGetOneMovieWithApiTheMovieDB, useBookmark} from '../utils/hooksMovies'

// interface IProps {
//     logout: () => void
//     // authUser: any
//     // setAuthUser: any
// }

/**
 * This function is two fold in App.tsx
 */
// const getUserByToken = async () => {
//     let user = null
//     const token = await authNetflix.getTokenInLocalStorage()

//     if (token) {
//         console.log('Token exist :)')
//         const data = await clientAuth('getUserAuth', token)
//         // AxiosResponse
//         user = data.data.user
//         console.log('data ====', data)
//         console.log('user ====', user)
//     }

//     return user
// }

const NetflixBookmark = () => {
    const idDefault = 749274

    // const data: any = useBookmark()

    // const id = data?.bookmark?.movies[0] ?? idDefault
    // const headerMovie = useGetOneMovieWithApiTheMovieDB(TYPE_MOVIE, id)

    return (
        <>
            <NetflixAppBar />
            {/* <NetflixHeader movie={headerMovie?.data} type={TYPE_MOVIE} /> */}
        </>
    )
}

export default NetflixBookmark
