import {useQuery} from '@tanstack/react-query'
import {clientApi} from './clientAPI'
import * as authNetflix from './authNetflixProvider'
import { clientAuth } from './clientAPI'

const useMovie = (TYPE_MOVIE: string, id: number) => {
    const {data} = useQuery([`${TYPE_MOVIE}/${id}`], () =>
        clientApi(`${TYPE_MOVIE}/${id}`),
    )
    return data
}

const useMovieEndpoint = (type: string, filter: string, param: string) => {
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

    const {data} = useQuery([`${endpoint}`], () => clientApi(endpoint))

    return data
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

const useBookmark = () => {
    const {data} = useQuery(['bookmark'], () => {
        return getUserByToken()
    })
    return data
}

const useSearchMovie = (query: string) => {
    const {data} = useQuery([`search/multi?query=${query}`], () =>
      clientApi(`search/multi?query=${query}`),
    )
    // return data?.data.results ?? []
    return data
  }

export {useMovie, useMovieEndpoint, useBookmark, useSearchMovie}
