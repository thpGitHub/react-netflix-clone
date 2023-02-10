import React, {useEffect, useState} from 'react'
// ** Utils **
import {clientUseApiTheMovieDB, clientAuth} from './clientAPI'
import * as authNetflix from './authNetflixProvider'
// ** REACT Query **
import {useQuery} from '@tanstack/react-query'

const useGetOneMovieWithApiTheMovieDB = (TYPE_MOVIE: string, id: number) => {
    const {data} = useQuery([`${TYPE_MOVIE}/${id}`], () =>
        clientUseApiTheMovieDB(`${TYPE_MOVIE}/${id}`),
    )
    // console.log('data in useGetOneMovieWithApiTheMovieDB', data)

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
        clientUseApiTheMovieDB(endpoint),
    )

    return data
}

/**
 * This function is two fold in App.tsx
 */
const getUserByToken = async () => {
    let user = null
    const token = await authNetflix.getTokenInLocalStorage()

    if (token) {
        // console.log('Token exist :)')
        const data = await clientAuth('getUserAuth', token)
        // AxiosResponse
        user = data.data.user
        // console.log('data ====', data)
        // console.log('user ====', user)
    }

    return user
}

// const useBookmark = () => {
//     const {data} = useQuery(['bookmark'], () => {
//         return getUserByToken()
//     })

//     return data
// }

const checkBookmark = (data: any, type: any, movie: any) => {
    const movieType = type === 'TYPE_MOVIE' ? 'movies' : 'series'
    console.log({In_in_checkBookmark_data1: data})

    const isInBookmark = data?.bookmark?.[movieType]?.includes(movie?.id)
    console.log({In_in_checkBookmark_data2: data, isInBookmark: isInBookmark})
    return isInBookmark
}

const useBookmark = (type: any, movie: any) => {
    const { data } = useQuery(['bookmark'], () => {
        console.log({data_in_usequery: data})
      return getUserByToken();
    });
  
    console.log({data_before_isInBookmark: data})
    const isInBookmark = checkBookmark(data, type, movie);
  
    console.log({data: data, isInBookmark: isInBookmark})


    return { data, isInBookmark };
  };
  

const useSearchMoviesWithApiTheMovieDB = (query: string) => {
    const {data} = useQuery([`search/multi?query=${query}`], () =>
        clientUseApiTheMovieDB(`search/multi?query=${query}`),
    )
    // console.log('data in useSearchMovie === ', data)

    return data?.data?.results ?? []
}

export {
    useGetOneMovieWithApiTheMovieDB,
    useGetMoviesbyEndpointWithApiTheMovieDB,
    useBookmark,
    useSearchMoviesWithApiTheMovieDB,
}
