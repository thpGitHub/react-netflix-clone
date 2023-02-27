// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react'
// ** Utils **
import {clientUseApiTheMovieDB, clientAuth} from './clientAPI'
import {clientSendsRequestsToTheMovieDB} from 'src/services/clientToTheMoviesDbApi'
import * as authNetflixProvider from './authNetflixProvider'
// ** REACT Query **
import {useQuery} from '@tanstack/react-query'
import {TYPE_MOVIE} from 'src/const'
// ** Contexts **
import {useAuthContext} from '../contexts/authContext'

const useGetOneMovieWithApiTheMovieDB = (TYPE_MOVIE: string, id: number) => {
    const {data} = useQuery([`${TYPE_MOVIE}/${id}`], () =>
        clientSendsRequestsToTheMovieDB(`${TYPE_MOVIE}/${id}`),
    )

    return data
}

const useGetMoviesbyEndpointWithApiTheMovieDB = (
    type: string,
    filter: string,
    param: string,
) => {
    const endpointLatest = `${type}/upcoming`
    const endpointPopular = `${type}/popular`
    const endpointTopRated = `${type}/top_rated`
    const endpointGenre = `discover/${type}?with_genres=${param}`
    const endpointTrending = `trending/${type}/day`

    let endpoint: string = ''

    switch (filter) {
        case 'populaire':
            endpoint = endpointPopular
            break
        case 'latest':
            endpoint = endpointLatest
            break
        case 'toprated':
            endpoint = endpointTopRated
            break
        case 'genre':
            endpoint = endpointGenre
            break
        case 'trending':
            endpoint = endpointTrending
            break

        default:
            throw new Error('Type non supporté')
    }

    const {data} = useQuery([`${endpoint}`], () =>
        clientSendsRequestsToTheMovieDB(endpoint),
    )

    return data
}

/**
 * This function is two fold in App.tsx
 */
const getUserByToken = async () => {
    let user = null
    const token = await authNetflixProvider.getTokenInLocalStorage()

    if (token) {
        const data = await clientAuth('getUserAuth', token)
        user = data.data.user
    }

    console.log({getUserByToken: user})

    return user
}

type Movie = {
    id: number
}

type Bookmark = {
    movies: number[]
    series: number[]
}

type Data = {
    bookmark: Bookmark
}

type User = {
    id: string
    token: string
    bookmark: Bookmark
    userName: string
    passwordHash: string
}

// const checkBookmark = (data: Data, type: string, movie: Movie) => {
const checkBookmark = (data: User | null, type: string, movie: Movie) => {
    const movieType = type === TYPE_MOVIE ? 'movies' : 'series'
    const isInBookmark = data?.bookmark?.[movieType]?.includes(movie?.id)
    return isInBookmark
}

const useBookmark = (type: string, movie: Movie) => {
    const {data: userAuthenticated} = useQuery(['bookmark'], () => {
        return getUserByToken()
    })
    // const {data: userAuthenticated} = useQuery(['bookmark'], () => {
    //     return getUserByToken()
    // })

    // const {authUser: userAuthenticated} = useAuthContext()

    const isInBookmark = checkBookmark(userAuthenticated, type, movie)

    return {userAuthenticated, isInBookmark}
}

const useSearchMoviesWithApiTheMovieDB = (query: string) => {
    const {data} = useQuery([`search/multi?query=${query}`], () =>
        clientSendsRequestsToTheMovieDB(`search/multi?query=${query}`),
    )

    return data?.data?.results ?? []
}

export {
    useGetOneMovieWithApiTheMovieDB,
    useGetMoviesbyEndpointWithApiTheMovieDB,
    useBookmark,
    useSearchMoviesWithApiTheMovieDB,
}
