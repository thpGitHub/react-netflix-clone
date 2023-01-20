import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import styled from 'styled-components'

const Button = styled.button``

const LogoNetflixImg = styled.img`
    width: 80px;
    // object-fit: contain;
`

const NetflixAppBar2 = () => {
    return (
        <div className="nav">
            <Button className="nav_burger">***</Button>
            <LogoNetflixImg src="images/netflix-logo.png" alt="Netflix" />
            <nav className="nav__links">
                <Link className='nav__link' to="/">Accueil</Link>
                <Link className='nav__link' to="/series">Series</Link>
                <Link className='nav__link' to="/movies">Movies</Link>
                <Link className='nav__link' to="/news">News</Link>
                <Link className='nav__link' to="/list">List</Link>
            </nav>
        </div>
    )
}

export default NetflixAppBar2
