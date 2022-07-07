import React from 'react'
import Skeleton from '@mui/material/Skeleton'

const HeaderSkeleton = () => {
    const banner: React.CSSProperties = {
        color: 'white',
        height: '448px',
        objectFit: 'contain',
        backgroundSize: 'cover',
        backgroundColor: '#1C2833',
        backgroundPosition: 'center center',
    } //as const

    return (
        <header style={banner}>
            <div className="banner__contents">
                <h1 className="banner__title">
                    <Skeleton animation="wave" width={210} />
                </h1>
                <div className="banner__buttons">
                    <button className="banner__button banner__buttonplay">
                        Lecture
                    </button>
                    <button className="banner__button banner__buttonInfo">
                        Ajouter à ma liste
                    </button>
                </div>
                <h1 className="synopsis">
                    <Skeleton animation="wave" />
                    <Skeleton animation="wave" />
                    <Skeleton animation="wave" />
                </h1>
            </div>
            <div className="banner--fadeBottom"></div>
        </header>
    )
}

export default HeaderSkeleton
