// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react'
import {TYPE_MOVIE} from 'src/const'
import {AxiosResponse} from 'axios'
// ** REACT Query **
import {useQuery} from '@tanstack/react-query'
// ** Services **
import {getUserByToken} from 'src/services/clientToAuthenticationApi'
import {clientSendsRequestsToTheMovieDB} from 'src/services/clientToTheMoviesDbApi'
// ** TS **
import {MultiTvOrMovie} from 'src/ts/interfaces/getMultiTvOrMovie'
import {OneMovieWithTypeTV} from 'src/ts/interfaces/getOneMovieWithTypeTV'
import {OneMovieWithTypeMovie} from 'src/ts/interfaces/getOneMovieWithTypeMovie'

/**
 * call with 2 endpoints
 *
 * https://api.themoviedb.org/3/tv/66732?api_key=<API_KEY>&language=fr-fr&page=1
 * https://api.themoviedb.org/3/movie/937278?api_key=<API_KEY>&language=fr-fr&page=1
 */

export const useGetOneMovieWithApiTheMovieDB = (
    type: 'tv' | 'movie',
    id: number,
) => {
    const {data} = useQuery([`${type}/${id}`], () =>
        clientSendsRequestsToTheMovieDB(`${type}/${id}`),
    )
    const movie = (
        data as AxiosResponse<OneMovieWithTypeMovie | OneMovieWithTypeTV>
    )?.data

    return movie
}

/**
 * <NetflixRow /> call 5 endpoints  :
 *
 * https://api.themoviedb.org/3/trending/movie/day?api_key=<API_KEY>&language=fr-fr&page=1
 * https://api.themoviedb.org/3/trending/tv/day?api_key=<API_KEY>&language=fr-fr&page=1
 * https://api.themoviedb.org/3/movie/top_rated?api_key=<API_KEY>&language=fr-fr&page=1
 * https://api.themoviedb.org/3/discover/tv?with_genres=10759&api_key=<API_KEY>&language=fr-fr&page=1
 * https://api.themoviedb.org/3/discover/movie?with_genres=53&api_key=<API_KEY>&language=fr-fr&page=1
 *
 */

type MediaType = 'movie' | 'tv'
type Filter = 'popular' | 'latest' | 'toprated' | 'genre' | 'trending'

export const useGetMoviesbyEndpointWithApiTheMovieDB = (
    type: MediaType,
    filter: Filter,
    param: string,
) => {
    const endpoint = getEndpoint(type, filter, param)

    const {data} = useQuery([`${endpoint}`], () =>
        clientSendsRequestsToTheMovieDB(endpoint),
    )

    return data as AxiosResponse<MultiTvOrMovie>
}

const getEndpoint = (type: MediaType, filter: Filter, param: string) => {
    const endpointLatest = `${type}/upcoming`
    const endpointPopular = `${type}/popular`
    const endpointTopRated = `${type}/top_rated`
    const endpointGenre = `discover/${type}?with_genres=${param}`
    const endpointTrending = `trending/${type}/day`

    switch (filter) {
        case 'popular':
            return endpointPopular
        case 'latest':
            return endpointLatest
        case 'toprated':
            return endpointTopRated
        case 'genre':
            return endpointGenre
        case 'trending':
            return endpointTrending
        default:
            throw new Error('unsupported filter')
    }
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

type BookmarkHookResult = {
    userAuthenticated: User | null
    isInBookmark: boolean
}
const checkBookmark = (
    data: User | null,
    type: string,
    movie: Movie,
): boolean => {
    const movieType = type === TYPE_MOVIE ? 'movies' : 'series'
    const isInBookmark =
        data?.bookmark?.[movieType]?.includes(movie?.id) ?? false
    return isInBookmark
}

export const useBookmark = (type: string, movie: Movie): BookmarkHookResult => {
    /**
     * Why null here ?
     * data: userAuthenticated = null
     *
     * getUserByToken()renvoie une Promise<User | null>, alors userAuthenticated sera undefined jusqu'à ce * que la promesse soit résolue et renvoie une valeur. useQuery renvoie un objet avec une data propriété * qui est initialement undefined jusqu'à ce que les données soient récupérées.
     */
    const {data: userAuthenticated = null} = useQuery(
        ['getUserForBookmark'],
        () => {
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

    return (data as AxiosResponse<MultiTvOrMovie>)?.data?.results ?? []
}
