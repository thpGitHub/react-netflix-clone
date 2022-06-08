import React from 'react'

const NetflixHeader = () => {
    return (
        <header className="banner">
            <div className="banner__contents">
                <h1 className="banner__title">La casa de papel</h1>
                <div className="banner__buttons">
                    <button className="banner__button banner__buttonplay">
                        Lecture
                    </button>
                    <button className="banner__button banner__buttonInfo">
                        Ajouter à ma liste
                    </button>
                </div>
                <h1 className="synopsis">
                    Le Professeur recrute une jeune braqueuse et sept autres
                    criminels en vue d'un cambriolage grandiose ciblant la
                    Maison royale de la Monnaie d'Espagne.
                </h1>
            </div>
            <div className="banner--fadeBottom"></div>
        </header>
    )
}

export default NetflixHeader
