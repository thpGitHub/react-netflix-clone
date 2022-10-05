import {useQuery} from '@tanstack/react-query'
import {clientApi} from './clientAPI'

const useMovie = (TYPE_MOVIE: string, id: number) => {
    const {data} = useQuery([`${TYPE_MOVIE}/${id}`], () =>
        clientApi(`${TYPE_MOVIE}/${id}`),
    )
    return data
}

export {useMovie}
