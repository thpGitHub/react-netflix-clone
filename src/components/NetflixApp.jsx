import React from 'react'

const NetflixApp = () => {
    return (
        <div>
            <nav>
                <img src="images/netflix-logo.png" alt="" height="20" />
                <a href="/">Accueil</a>
                <a href="/">Séries</a>
                <a href="/">Films</a>
                <a href="/">Nouveautés</a>
                <a href="/">Ma listes</a>
                <img src="images/netflix-avatar.png" alt="" height="20" />
            </nav>

            <header>
                <div>
                    <h1>La casa de papel</h1>
                    <div>
                        <button>Lecture</button>
                        <button>Ajouter à ma liste</button>
                    </div>
                    <h1>
                        Le Professeur recrute une jeune braqueuse et sept autres
                        criminels en vue d'un cambriolage grandiose ciblant la
                        Maison royale de la Monnaie d'Espagne.
                    </h1>
                </div>
            </header>

            <div>
                <h2>Films Netflix</h2>
                <div>
                    <img src="images/sample.jpg" alt="" height="250" />
                    <img src="images/sample1.jpg" alt="" height="250" />
                    <img src="images/sample.jpg" alt="" height="250" />
                    <img src="images/sample1.jpg" alt="" height="250" />
                </div>
            </div>
            <div>
                <h2>Série Netflix</h2>
                <div>
                    <img src="images/sample-poster.jpg" alt="" height="300" />
                    <img src="images/sample-poster1.jpg" alt="" height="300" />
                    <img src="images/sample-poster.jpg" alt="" height="300" />
                    <img src="images/sample-poster1.jpg" alt="" height="300" />
                </div>
            </div>

            <footer>2021 - Netflix Clone</footer>
        </div>
    )
}

export default NetflixApp
