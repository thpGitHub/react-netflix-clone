import React from 'react'
import NetflixAppBar from './NetflixAppBar'
import { useNavigate  } from "react-router-dom"

function ErrorFallback({error, resetErrorBoundary}: any) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/")
    resetErrorBoundary()
  }
  return (
    <div>
      <NetflixAppBar logout={()=>{}}/>
      <div
        role="alert"
        style={{
          height: '100%',
          textAlign: 'center',
          margin: '100px 300px',
          color: '#fff',
        }}
      >
        <h1 style={{fontSize: '2.5em'}}>Vous cherchez votre chemin ?</h1>
        <pre style={{color: 'red', fontSize: '1em'}}>
          Erreur : {error.message}
        </pre>

        <div className="banner__buttons">
          <button
            className="banner__button banner__buttonplay"
            onClick={handleClick}
          >
            Accueil
          </button>
        </div>
      </div>
    </div>
  )
}

export default ErrorFallback