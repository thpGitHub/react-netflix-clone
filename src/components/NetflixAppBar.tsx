import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
// ** MUI **
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
// ** Contexts
import {useAuthContext} from '../contexts/authContext'

interface IProps {
    logout: () => void
    }

// const NetflixAppBar = ({logout}: IProps): JSX.Element => {
const NetflixAppBar = () => {
    const {logout} = useAuthContext()
    const [appBarStyle, setAppBarStyle] = useState({
        background: 'transparent',
        boxShadow: 'none',
        transition: 'none',
    })

    useEffect(() => {
        const onScroll = (e: any) => {
            console.log(e.target.documentElement.scrollTop)
            if (e.target.documentElement.scrollTop > 100) {
                setAppBarStyle({
                    boxShadow: 'none',
                    background: '#111',
                    transition: 'background 2s ease-out',
                })
            } else {
                setAppBarStyle({
                    boxShadow: 'none',
                    background: 'transparent',
                    transition: 'background 2s ease-out',
                })
            }
        }
        window.addEventListener('scroll', onScroll)

        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const margin10 = {margin: 10}

    return (
        <AppBar style={appBarStyle}>
            <Toolbar>
                <img
                    className="nav__logo"
                    src="images/netflix-logo.png"
                    alt=""
                />
                <Link to="/">
                    <Typography style={margin10} variant="h6">
                        Accueil
                    </Typography>
                </Link>
                <Link to="/series">
                    <Typography style={margin10} variant="h6">
                        Series
                    </Typography>
                </Link>
                <Link to="/movies">
                    <Typography style={margin10} variant="h6">
                        Movies
                    </Typography>
                </Link>
                <Link to="/news">
                    <Typography style={margin10} variant="h6">
                        News
                    </Typography>
                </Link>
                <Link to="/list">
                    <Typography style={margin10} variant="h6">
                        List
                    </Typography>
                </Link>
                <img
                    style={{marginLeft: 'auto'}}
                    className="nav__avatar"
                    src="/images/netflix-avatar.png"
                    alt="netflix avatar"
                    onClick={logout}
                />
            </Toolbar>
        </AppBar>
    )
}

export default NetflixAppBar
