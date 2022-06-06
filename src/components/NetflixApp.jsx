import React from 'react'
import './Netflix.css'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

const NetflixApp = () => {
    const appBarStyle = {
        background: 'transparent',
        boxShadow: 'none',
    }
    const margin10 = {margin: 10}

    return (
        <div>
            <AppBar style={appBarStyle}>
                <Toolbar>
                    <img
                        className="nav__logo"
                        src="images/netflix-logo.png"
                        alt=""
                    />
                    <a href="/">
                        <Typography style={margin10} variant="h6">
                            Accueil
                        </Typography>
                    </a>
                    <a href="/series">
                        <Typography style={margin10} variant="h6">
                            Series
                        </Typography>
                    </a>
                    <a href="/movies">
                        <Typography style={margin10} variant="h6">
                            Movies
                        </Typography>
                    </a>
                    <a href="/news">
                        <Typography style={margin10} variant="h6">
                            News
                        </Typography>
                    </a>
                    <a href="/list">
                        <Typography style={margin10} variant="h6">
                            List
                        </Typography>
                    </a>
                    <img
                        style={{marginLeft: 'auto'}}
                        className="nav__avatar"
                        src="/images/netflix-avatar.png"
                        alt=""
                    />
                </Toolbar>
            </AppBar>

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

            <div className="row">
                <h2>Films Netflix</h2>
                <div className="row__posters">
                    <img
                        className="row__poster row__posterLarge"
                        src="images/sample.jpg"
                        alt=""
                    />
                    <img
                        className="row__poster row__posterLarge"
                        src="images/sample1.jpg"
                        alt=""
                    />
                    <img
                        className="row__poster row__posterLarge"
                        src="images/sample.jpg"
                        alt=""
                    />
                    <img
                        className="row__poster row__posterLarge"
                        src="images/sample1.jpg"
                        alt=""
                    />
                </div>
            </div>
            <div className="row">
                <h2>Série Netflix</h2>
                <div className="row__posters">
                    <img
                        className="row__poster row__posterLarge"
                        src="images/sample-poster.jpg"
                        alt=""
                    />
                    <img
                        className="row__poster row__posterLarge"
                        src="images/sample-poster1.jpg"
                        alt=""
                    />
                    <img
                        className="row__poster row__posterLarge"
                        src="images/sample-poster.jpg"
                        alt=""
                    />
                    <img
                        className="row__poster row__posterLarge"
                        src="images/sample-poster1.jpg"
                        alt=""
                    />
                </div>
            </div>

            <footer className="footer">2021 - Netflix Clone</footer>
        </div>
    )
}

export default NetflixApp
