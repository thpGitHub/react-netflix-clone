import React, {useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
// ** Contexts **
import {useAuthContext} from '../contexts/authContext'
// ** MUI **
import SearchIcon from '@mui/icons-material/Search'
import MenuSharpIcon from '@mui/icons-material/MenuSharp'
// ** Styled components **
import styled from 'styled-components'
import {createGlobalStyle} from 'styled-components'
// ** Utils **
import device from '../utils/style/breakpoints'

/**
 * `require` For fix typescript error : Cannot find module
 * Another way :
 * tsconfig : "include": ["src", "index.d.ts"]
 * and add file : index.d.ts with :
 * declare module '*.png';
 * declare module '*.jpg';
 */
const NetflixLogo = require('../assets/images/netflixlogo.png')

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
        top: 64px;
        left: 0;
        width: 100vw;
        height: 100vh;
        display: ${({displayBurgerMenu}) => displayBurgerMenu};
        position: absolute;
        flex-direction: column;
        background-color: #111;
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

const Search = styled.div`
    color: #fff;
    /* display: flex; */
    opacity: 0.4;
    padding: 8px;
    background: #111;
    margin-right: 10px;
    border-radius: 5px;
    &:focus-within {
        opacity: 1;
    }
    label {
        display: flex;
    }
`

const ImgLogoNetflix = styled.img`
    max-width: 100px;
    // object-fit: contain;
    @media screen and (max-width: 768px) {
        max-width: 80px;
    }
`
const ImgAvatarForLogout = styled.img`
    width: 30px;
    cursor: pointer;
    @media screen and (max-width: 320px) {
        width: 20px;
    }
`

const Actions = styled.div`
    display: flex;
    align-items: center;
    margin-left: auto;
`
const InputSearch = styled.input`
    color: #fff;
    border: none;
    outline: none;
    max-width: 100px;
    background: #0000;
    @media screen and (max-width: 768px) {
        max-width: 80px;
    }
`

const NetflixAppBar = () => {
    const navigate = useNavigate()
    const {logout} = useAuthContext()
    const [backgroundStyle, setBackgroundStyle] =
        useState<'transparent' | '#111'>('transparent')

    const [displayBurgerMenu, setDisplayBurgerMenu] =
        useState<'none' | 'flex'>('none')

    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        const onScroll = (e: Event) => {
            const window = e.currentTarget as Window
            let currentPosition = window.scrollY
            //console.log({currentPosition: currentPosition})

            if (currentPosition > 100) {
                setBackgroundStyle('#111')
            } else {
                setBackgroundStyle('transparent')
            }
        }
        window.addEventListener('scroll', onScroll)

        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const handlerDisplayBurgerMenu = () => {
        setDisplayBurgerMenu(displayBurgerMenu === 'none' ? 'flex' : 'none')
    }

    const handleSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value)
    }

    const handleKeyEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            navigate(`/search/${searchQuery}`)
        }
    }

    return (
        <Wrapper
            backgroundStyle={backgroundStyle}
            displayBurgerMenu={displayBurgerMenu}
        >
            <GlobalStyle displayBurgerMenu={displayBurgerMenu} />
            <ButtonBurger onClick={handlerDisplayBurgerMenu}>
                <MenuSharpIcon />
            </ButtonBurger>
            <ImgLogoNetflix src={NetflixLogo} alt="Netflix" />
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
                <Search>
                    <label>
                        <SearchIcon />
                        <InputSearch
                            type="search"
                            value={searchQuery}
                            onChange={handleSearchQuery}
                            onKeyDown={handleKeyEnter}
                            aria-label="search"
                            placeholder="Search…"
                        />
                    </label>
                </Search>
                <ImgAvatarForLogout
                    alt="netflix avatar"
                    src="/images/netflix-avatar.png"
                    onClick={logout}
                />
            </Actions>
        </Wrapper>
    )
}

export default NetflixAppBar
