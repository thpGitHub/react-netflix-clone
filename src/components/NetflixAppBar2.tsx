import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import styled from 'styled-components'
import SearchIcon from '@mui/icons-material/Search'

const Button = styled.button``

const Wrapper = styled.div`
    display: flex;
`

const ImgLogoNetflix = styled.img`
    width: 80px;
    // object-fit: contain;
`
const ImgAvatarForLogout = styled.img`
    width: 30px;
`

const NetflixAppBar2 = () => {
    return (
        // <div className="nav">
        <Wrapper className="nav">
            <Button className="nav_burger">***</Button>
            <ImgLogoNetflix src="images/netflix-logo.png" alt="Netflix" />
            <nav className="nav__links">
                <Link className="nav__link" to="/">
                    Accueil
                </Link>
                <Link className="nav__link" to="/series">
                    Series
                </Link>
                <Link className="nav__link" to="/movies">
                    Movies
                </Link>
                <Link className="nav__link" to="/news">
                    News
                </Link>
                <Link className="nav__link" to="/list">
                    List
                </Link>
            </nav>
            <div className="nav__actions">
                <Link className="nav__action" to="/">
                    search
                </Link>
                <ImgAvatarForLogout
                    src="/images/netflix-avatar.png"
                    alt="netflix avatar"
                />
            </div>
        </Wrapper>
        // </div>
    )
}

export default NetflixAppBar2
