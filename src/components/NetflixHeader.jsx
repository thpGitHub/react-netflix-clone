import React from 'react'

const NetflixHeader = ({movie}) => {
    // const imageURL = `https://image.tmdb.org/t/p/w500/${movie?.backdrop_path}`
    const imageURL = `https://image.tmdb.org/t/p/w500/${movie}`

    const banner = {
        backgroundImage: `url('${imageURL}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        color: 'white',
        objectFit: 'contain',
        height: '448px',
    }

    if (!movie) {
        return <></>
    }

    return (
        <header style={banner}>
            <div className="banner__contents">
                <h1 className="banner__title">{movie?.title ?? '...'}</h1>
                <div className="banner__buttons">
                    <button className="banner__button banner__buttonplay">
                        Lecture
                    </button>
                    <button className="banner__button banner__buttonInfo">
                        Ajouter à ma liste
                    </button>
                </div>
                <h1 className="synopsis">
                    {movie?.overview ?? '...'}
                </h1>
            </div>
            <div className="banner--fadeBottom"></div>
        </header>
    )
}

export default NetflixHeader
