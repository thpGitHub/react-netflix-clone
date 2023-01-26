import React, {useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import styled from 'styled-components'
import SearchIcon from '@mui/icons-material/Search'
import device from '../utils/style/breakpoints'
import {createGlobalStyle, ThemeProvider} from 'styled-components'

const GlobalStyle = createGlobalStyle<{displayBurgerMenu: 'none' | 'flex'}>`
    body {
      overflow: ${({displayBurgerMenu}) =>
          displayBurgerMenu === 'none' ? 'auto' : 'hidden'}
      }
`

const ButtonBurger = styled.button`
    color: #fff;
    background: none;
    border: none;
    cursor: pointer;

    @media ${device.sm} {
        display: none;
    }
`

const Wrapper = styled.div<{
    backgroundStyle: 'transparent' | '#111'
    displayBurgerMenu: 'none' | 'flex'
}>`
    width: 100%;
    display: flex;
    padding: 0 12px;
    z-index: 1111;
    position: fixed;
    flex-wrap: wrap;
    font-size: 1.25rem;
    min-height: 64px;
    align-items: center;
    letter-spacing: 0.0075em;
    background: ${({backgroundStyle}) => backgroundStyle};
    transition: background 4s ease-out;

    @media screen and (max-width: 768px) {
        background: ${({displayBurgerMenu}) =>
            displayBurgerMenu === 'none'
                ? ({backgroundStyle}) => backgroundStyle
                : '#111'};
    }
`

const Nav = styled.nav<{displayBurgerMenu: 'none' | 'flex'}>`
    margin-left: auto;

    @media screen and (max-width: 768px) {
        flex-direction: column;
        left: 0;
        top: 64px;
        position: absolute;
        background-color: #111;
        width: 100vw;
        height: 100vh;
        display: ${({displayBurgerMenu}) => displayBurgerMenu};
    }
`

const StyledLink = styled(Link)`
    color: #fff;
    padding: 0 5px;
    text-decoration: none;

    @media screen and (max-width: 768px) {
        padding: 15px 4%;
    }
`

const ImgLogoNetflix = styled.img`
    max-width: 100px;
    // object-fit: contain;
`
const ImgAvatarForLogout = styled.img`
    width: 30px;
    cursor: pointer;
`

const Actions = styled.div`
    display: flex;
    align-items: center;
    margin-left: auto;
`

const NetflixAppBar2 = () => {
    const [backgroundStyle, setBackgroundStyle] =
        useState<'transparent' | '#111'>('transparent')
    const [displayBurgerMenu, setDisplayBurgerMenu] =
        useState<'none' | 'flex'>('none')

    useEffect(() => {
        const onScroll = (e: Event) => {
            const window = e.currentTarget as Window
            let currentPosition = window.scrollY
            console.log({currentPosition: currentPosition})

            if (currentPosition > 100) {
                setBackgroundStyle('#111')
            } else {
                setBackgroundStyle('transparent')
            }
        }
        window.addEventListener('scroll', e => onScroll(e))

        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const handlerDisplayBurgerMenu = () => {
        setDisplayBurgerMenu(displayBurgerMenu === 'none' ? 'flex' : 'none')
    }

    return (
        <Wrapper
            backgroundStyle={backgroundStyle}
            displayBurgerMenu={displayBurgerMenu}
        >
            <GlobalStyle displayBurgerMenu={displayBurgerMenu} />
            <ButtonBurger onClick={handlerDisplayBurgerMenu}>***</ButtonBurger>
            <ImgLogoNetflix src="images/netflix-logo.png" alt="Netflix" />
            <Nav displayBurgerMenu={displayBurgerMenu}>
                <StyledLink className="nav__link" to="/">
                    Accueil
                </StyledLink>
                <StyledLink className="nav__link" to="/series">
                    Series
                </StyledLink>
                <StyledLink className="nav__link" to="/movies">
                    Movies
                </StyledLink>
                <StyledLink className="nav__link" to="/news">
                    News
                </StyledLink>
                <StyledLink className="nav__link" to="/list">
                    List
                </StyledLink>
            </Nav>
            <Actions>
                <Link className="nav__action" to="/">
                    search
                </Link>
                <ImgAvatarForLogout
                    src="/images/netflix-avatar.png"
                    alt="netflix avatar"
                />
            </Actions>
        </Wrapper>
    )
}

export default NetflixAppBar2
