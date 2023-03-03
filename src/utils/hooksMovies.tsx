// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react'
// ** REACT Query **
import {useQuery} from '@tanstack/react-query'
import {TYPE_MOVIE} from 'src/const'
// ** Services **
import {clientSendsRequestsToTheMovieDB} from 'src/services/clientToTheMoviesDbApi'
import {getUserByToken} from 'src/services/clientToAuthenticationApi'
import { MutltiTvOrMovie } from 'src/ts/interfaces/searchMultiTvOrMovie'
import { AxiosResponse } from 'axios'

export const useGetOneMovieWithApiTheMovieDB = (TYPE_MOVIE: string, id: number) => {
    const {data} = useQuery([`${TYPE_MOVIE}/${id}`], () =>
        clientSendsRequestsToTheMovieDB(`${TYPE_MOVIE}/${id}`),
    )
    const movie = data?.data
    return movie
}

export const useGetMoviesbyEndpointWithApiTheMovieDB = (
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

type Movie = {
    id: number
}

type Bookmark = {
    movies: number[]
    series: number[]
}

type User = {
    id: string
    token: string
    bookmark: Bookmark
    userName: string
    passwordHash: string
}

const checkBookmark = (data: User | null, type: string, movie: Movie): boolean => {
    const movieType = type === TYPE_MOVIE ? 'movies' : 'series'
    const isInBookmark =
        data?.bookmark?.[movieType]?.includes(movie?.id) ?? false
    return isInBookmark
}

export const useBookmark = (type: string, movie: Movie) => {
    /**
     * Why null here ?
     * data: userAuthenticated = null
     *
     * getUserByToken()renvoie une Promise<User | null>, alors userAuthenticated sera undefined jusqu'à ce * que la promesse soit résolue et renvoie une valeur. useQuery renvoie un objet avec une data propriété * qui est initialement undefined jusqu'à ce que les données soient récupérées.
     */
    const {data: userAuthenticated = null} = useQuery(
        ['getUserForBookmark'],
        () => {
            // return getUserByToken()
            return getUserByToken()
        },
    )

    const isInBookmark = checkBookmark(userAuthenticated, type, movie)

    return {userAuthenticated, isInBookmark}
}

export const useSearchMoviesWithApiTheMovieDB = (query: string) => {
    const {data} = useQuery([`search/multi?query=${query}`], () =>
        clientSendsRequestsToTheMovieDB(`search/multi?query=${query}`),
    )

    console.log({data: data});
    
    // return data?.data?.results ?? []
    return (data as AxiosResponse<MutltiTvOrMovie>)?.data?.results ?? [];
    // return data?.results ?? []
}
