import React, {useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import styled from 'styled-components'
import SearchIcon from '@mui/icons-material/Search'

const Button = styled.button``

const Wrapper = styled.div`
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
    /* font-weight: 500; */
    /* transition: 'background 4s ease-out' // ne fonctionne pas !!!! */
`

const Nav = styled.nav`
    margin-left: auto;
`

const StyledLink = styled(Link)`
    color: white;
    padding: 0 5px;
    text-decoration: none;
`

const ImgLogoNetflix = styled.img`
    width: 80px;
    // object-fit: contain;
`
const ImgAvatarForLogout = styled.img`
    width: 30px;
`

const Actions = styled.div`
    display: flex;
    align-items: center;
    margin-left: auto;
`

const NetflixAppBar2 = () => {
    const [backgroundStyle, setBackgroundStyle] = useState<any>({
        background: 'transparent',
        transition: 'none'
    })

    useEffect(() => {
        const onScroll = (e: any) => {
            console.log(e.target.documentElement.scrollTop)
            if (e.target.documentElement.scrollTop > 100) {
                setBackgroundStyle({
                    background: '#111',
                    transition: 'background 2s ease-out'
                })
            } else {
                setBackgroundStyle({
                    background: 'transparent',
                    transition: 'background 2s ease-out'
                })
            }
        }
        window.addEventListener('scroll', onScroll)

        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        // <div className="nav">
        <Wrapper style={backgroundStyle}>
            <Button className="nav_burger">***</Button>
            <ImgLogoNetflix src="images/netflix-logo.png" alt="Netflix" />
            {/* <nav className="nav__links"> */}
            <Nav>
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
            {/* </nav> */}
            {/* <div className="nav__actions"> */}
            <Actions>
                <Link className="nav__action" to="/">
                    search
                </Link>
                <ImgAvatarForLogout
                    src="/images/netflix-avatar.png"
                    alt="netflix avatar"
                />
            </Actions>
            {/* </div> */}
        </Wrapper>
        // </div>
    )
}

export default NetflixAppBar2
