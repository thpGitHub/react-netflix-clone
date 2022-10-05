import React, {useState} from 'react'
import HeaderSkeleton from './skeletons/HeaderSkeleton'
import useDimension from '../hooks/useDimension'
import {AxiosData} from '../ts/interfaces/axiosData'
import {IMAGE_URL, TYPE_MOVIE} from '../const'
import {clientNetflix} from '../utils/clientAPI'
import * as authNetflix from '../utils/authNetflixProvider'
import {clientAuth} from '../utils/clientAPI'
// *** MUI ***
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, {AlertProps} from '@mui/material/Alert'
// ** REACT Query
import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

interface IProps {
    movie: AxiosData | undefined
    // movie: any,
    type: string
    // authUser?: any
    // setAuthUser?: any
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

const NetflixHeader = ({movie, type = TYPE_MOVIE}: IProps) => {
    const queryClient = useQueryClient()
    const [snackbarOpen, setSnackbarOpen] = React.useState(false)
    const [mutateBookmarkError, setMutateBookmarkError] = useState<any>()

    const {data} = useQuery(['bookmark'], () => {
        return getUserByToken()
    })

    const addMutation = useMutation(
        async () => {
            return clientNetflix(`bookmark/${type}`, {
                method: 'POST',
                data,
                movie,
            })
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['bookmark'])
                setSnackbarOpen(true)
                setMutateBookmarkError(null)
            },
            onError: error => {
                setSnackbarOpen(true)
                setMutateBookmarkError(error)
            },
        },
    )

    const deleteMutation = useMutation(
        async () => {
            return clientNetflix(`bookmark/${type}`, {
                method: 'DELETE',
                data,
                movie,
            })
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['bookmark'])
                setSnackbarOpen(true)
                setMutateBookmarkError(null)
            },
            onError: error => {
                setSnackbarOpen(true)
                setMutateBookmarkError(error)
            },
        },
    )

    const title = type === TYPE_MOVIE ? movie?.title : movie?.name

    let imageWidth = 1280

    const browserWidth: number | undefined = useDimension()
    console.log('browserWidth', browserWidth)

    if (browserWidth && browserWidth >= 780 && browserWidth < 1280) {
        console.log('780 - 1280')
        imageWidth = 780
    }
    if (browserWidth && browserWidth < 780) {
        console.log('--- 780')
        imageWidth = 300
    }
    /*
     * official sizes : https://www.themoviedb.org/talk/5ff32c1467203d003fcb7a21
     * backdrop_sizes : "w300" "w780" "w1280"
     */
    const imageURL = `${IMAGE_URL}w${imageWidth}/${movie?.backdrop_path}`
    // const imageURL = `https://image.tmdb.org/t/p/w1280/${movie?.backdrop_path}`

    // const banner = {
    const banner: React.CSSProperties = {
        color: 'white',
        height: '448px',
        objectFit: 'contain',
        backgroundSize: 'cover',
        backgroundImage: `url('${imageURL}')`,
        backgroundPosition: 'center center',
    } //as const

    const handleAddToBookmark = async () => {
        addMutation.mutate()
    }
    const handleDeleteToBookmark = async () => {
        deleteMutation.mutate()
    }

    /*
     * props type = movie or tv
     * authUser.bookmark = {movies: [], series: []}
     */
    // const isInBookmark = false
    const isInBookmark = data?.bookmark[
        type === TYPE_MOVIE ? 'movies' : 'series'
    ]?.includes(movie?.id)

    console.log('isInBookmark', isInBookmark)
    console.log('isInBookmark type ===', type)
    console.log('data.bookmark', data?.bookmark ?? 'totot')
    console.log('data.data.bookmark', data?.data?.bookmark ?? 'totot')

    if (!movie) {
        return <HeaderSkeleton />
    }

    return (
        <header style={banner}>
            <div className="banner__contents">
                <h1 className="banner__title">{title ?? '...'}</h1>
                <div className="banner__buttons">
                    <button className="banner__button banner__buttonplay">
                        Lecture
                    </button>
                    {isInBookmark ? (
                        <button
                            className="banner__button banner__buttonInfo"
                            onClick={handleDeleteToBookmark}
                        >
                            <DeleteForeverRoundedIcon
                                color="secondary"
                                fontSize="small"
                                style={{marginRight: '5px'}}
                            />
                            Supprimer à ma liste
                        </button>
                    ) : (
                        <button
                            className="banner__button banner__buttonInfo"
                            onClick={handleAddToBookmark}
                        >
                            Ajouter à ma liste
                        </button>
                    )}
                </div>
                <h1 className="synopsis">{movie?.overview ?? '...'}</h1>
            </div>
            <div className="banner--fadeBottom"></div>
            {/* {status === 'done' && isBookmarkFetchOneTime ? ( */}
            {!mutateBookmarkError ? (
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={4000}
                    onClose={() => setSnackbarOpen(false)}
                >
                    <Alert severity="success" sx={{width: '100%'}}>
                        Liste modifiée avec succès
                    </Alert>
                </Snackbar>
            ) : null}
            {/* {status === 'error' && isBookmarkFetchOneTime ? ( */}
            {mutateBookmarkError ? (
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={4000}
                    onClose={() => setSnackbarOpen(false)}
                >
                    <Alert severity="error" sx={{width: '100%'}}>
                        Problème lors de l'ajout : {mutateBookmarkError.message}
                    </Alert>
                </Snackbar>
            ) : null}
        </header>
    )
}

export default NetflixHeader

// <img class="concord-img vlv-creative" src="https://assets.nflxext.com/ffe/siteui/vlv3/25badb14-858b-4b1c-8b7d-2244098454d9/f52376b2-aadc-4f64-b708-5c8e2d2f64c3/FR-en-20220606-popsignuptwoweeks-perspective_alpha_website_small.jpg" srcset="https://assets.nflxext.com/ffe/siteui/vlv3/25badb14-858b-4b1c-8b7d-2244098454d9/f52376b2-aadc-4f64-b708-5c8e2d2f64c3/FR-en-20220606-popsignuptwoweeks-perspective_alpha_website_small.jpg 1000w, https://assets.nflxext.com/ffe/siteui/vlv3/25badb14-858b-4b1c-8b7d-2244098454d9/f52376b2-aadc-4f64-b708-5c8e2d2f64c3/FR-en-20220606-popsignuptwoweeks-perspective_alpha_website_medium.jpg 1500w, https://assets.nflxext.com/ffe/siteui/vlv3/25badb14-858b-4b1c-8b7d-2244098454d9/f52376b2-aadc-4f64-b708-5c8e2d2f64c3/FR-en-20220606-popsignuptwoweeks-perspective_alpha_website_large.jpg 1800w" alt="">
