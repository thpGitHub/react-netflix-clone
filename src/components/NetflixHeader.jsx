import React from 'react'
import useDimension from '../hooks/useDimension'

const NetflixHeader = ({movie, type= 'movie'}) => {
    const title = type === 'movie' ? movie?.title : movie?.name

    const browserWidth = useDimension()
    console.log('browserWidth', browserWidth)

    let imageWidth = 1280

    if ((browserWidth >= 780) & (browserWidth < 1280)) {
        console.log('780 - 1280')
        imageWidth = 780
    }
    if (browserWidth < 780) {
        console.log('--- 780')
        imageWidth = 300
    }
    /*
     * official sizes : https://www.themoviedb.org/talk/5ff32c1467203d003fcb7a21
     * backdrop_sizes : "w300" "w780" "w1280"
     */
    const imageURL = `https://image.tmdb.org/t/p/w${imageWidth}/${movie?.backdrop_path}`
    // const imageURL = `https://image.tmdb.org/t/p/w1280/${movie?.backdrop_path}`

    const banner = {
        color: 'white',
        height: '448px',
        objectFit: 'contain',
        backgroundSize: 'cover',
        backgroundImage: `url('${imageURL}')`,
        backgroundPosition: 'center center',
    }

    if (!movie) {
        return <></>
    }

    return (
        <header style={banner}>
            <div className="banner__contents">
                <h1 className="banner__title">{title ?? '...'}</h1>
                <div className="banner__buttons">
                    <button className="banner__button banner__buttonplay">
                        Lecture
                    </button>
                    <button className="banner__button banner__buttonInfo">
                        Ajouter à ma liste
                    </button>
                </div>
                <h1 className="synopsis">{movie?.overview ?? '...'}</h1>
            </div>
            <div className="banner--fadeBottom"></div>
        </header>
    )
}

export default NetflixHeader

// <img class="concord-img vlv-creative" src="https://assets.nflxext.com/ffe/siteui/vlv3/25badb14-858b-4b1c-8b7d-2244098454d9/f52376b2-aadc-4f64-b708-5c8e2d2f64c3/FR-en-20220606-popsignuptwoweeks-perspective_alpha_website_small.jpg" srcset="https://assets.nflxext.com/ffe/siteui/vlv3/25badb14-858b-4b1c-8b7d-2244098454d9/f52376b2-aadc-4f64-b708-5c8e2d2f64c3/FR-en-20220606-popsignuptwoweeks-perspective_alpha_website_small.jpg 1000w, https://assets.nflxext.com/ffe/siteui/vlv3/25badb14-858b-4b1c-8b7d-2244098454d9/f52376b2-aadc-4f64-b708-5c8e2d2f64c3/FR-en-20220606-popsignuptwoweeks-perspective_alpha_website_medium.jpg 1500w, https://assets.nflxext.com/ffe/siteui/vlv3/25badb14-858b-4b1c-8b7d-2244098454d9/f52376b2-aadc-4f64-b708-5c8e2d2f64c3/FR-en-20220606-popsignuptwoweeks-perspective_alpha_website_large.jpg 1800w" alt="">
