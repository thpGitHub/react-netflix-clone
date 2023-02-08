import React, {useState} from 'react'
import useDimension from '../hooks/useDimension'
import HeaderSkeleton from './skeletons/HeaderSkeleton'
import {clientNetflix} from '../utils/clientAPI'
import {IMAGE_URL, TYPE_MOVIE} from '../const'
// *** MUI ***
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, {AlertProps} from '@mui/material/Alert'
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded'
// ** REACT Query
import {useBookmark} from '../utils/hooksMovies'
import {useMutation, useQueryClient} from '@tanstack/react-query'
// ** TS **
import {OneMovieWithTypeTV} from '../ts/interfaces/getOneMovieWithTypeTV'
import {OneMovieWithTypeMovie} from '../ts/interfaces/getOneMovieWithTypeMovie'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

type TvOrMovie = OneMovieWithTypeTV | OneMovieWithTypeMovie

interface NetflixHeaderProps {
    movie: TvOrMovie
    type: string
}

const NetflixHeader = ({movie, type = TYPE_MOVIE}: NetflixHeaderProps) => {
    const queryClient = useQueryClient()
    const [snackbarOpen, setSnackbarOpen] = React.useState(false)
    const [mutateBookmarkError, setMutateBookmarkError] = useState<any>()

    const data = useBookmark()

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

    const getTitle = (
        movie: {title?: string; name?: string} | undefined,
    ): string | undefined => {
        if (!movie) {
            return
        }

        return movie.title || movie.name
    }

    const title = getTitle(movie)

    interface Movie {
        backdrop_path: string
    }

    const useMovieImageWidth = (movie: Movie | undefined): string => {
        let imageWidth = 1280

        const browserWidth: number | undefined = useDimension()
        //console.log('browserWidth', browserWidth);

        if (browserWidth && browserWidth >= 780 && browserWidth < 1280) {
            //console.log('780 - 1280');
            imageWidth = 780
        }
        if (browserWidth && browserWidth < 780) {
            //console.log('--- 780');
            imageWidth = 300
        }

        /*
         * official sizes : https://www.themoviedb.org/talk/5ff32c1467203d003fcb7a21
         * backdrop_sizes : "w300" "w780" "w1280"
         */
        return `${IMAGE_URL}w${imageWidth}/${movie?.backdrop_path}`
    }

    const imageURL = useMovieImageWidth(movie)

    const banner: React.CSSProperties = {
        color: 'white',
        height: '448px',
        objectFit: 'contain',
        backgroundSize: 'cover',
        backgroundImage: `url('${imageURL}')`,
        backgroundPosition: 'center center',
    }

    const handleAddToBookmark = async () => {
        addMutation.mutate()
    }
    const handleDeleteToBookmark = async () => {
        deleteMutation.mutate()
    }

    const checkBookmark = (data: any, type: any, movie: any) => {
        const movieType = type === 'TYPE_MOVIE' ? 'movies' : 'series'
        const isInBookmark = data?.bookmark?.[movieType]?.includes(movie?.id)
        return isInBookmark
    }

    const isInBookmark = checkBookmark(data, type, movie)
    console.log({data: data, isInBookmark: isInBookmark})

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
