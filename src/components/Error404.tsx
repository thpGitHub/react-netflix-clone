import React from 'react'
import NetflixAppBar from './NetflixAppBar'
import {Link} from 'react-router-dom'

interface IProps {
    logout: () => void
    // authUser: any
}

function Error404() {
    const imageUrl = '/images/bg-lost-in-space.png'
    return (
        <div
            style={{
                backgroundImage: `url('${imageUrl}')`,
                backgroundSize: 'cover',

                position: 'fixed',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                overflow: 'auto',
            }}
        >
            <NetflixAppBar />
            <div
                role="alert"
                style={{
                    height: '100%',
                    textAlign: 'center',
                    padding: '100px 300px',
                    color: '#fff',
                }}
            >
                <h1 style={{fontSize: '2.5em'}}>
                    Vous cherchez votre chemin ?
                </h1>
                <pre style={{color: 'red', fontSize: '1em'}}>Erreur 404</pre>
                <div className="banner__buttons">
                    <Link to="/">
                        <button className="banner__button banner__buttonplay">
                            Accueil
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Error404
