import React, {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
// ** MUI **
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import {styled, alpha} from '@mui/material/styles'
import InputBase from '@mui/material/InputBase'
import SearchIcon from '@mui/icons-material/Search'

// ** Contexts
import {useAuthContext} from '../contexts/authContext'

// interface IProps {
//     logout: () => void
// }

const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}))

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}))

// const NetflixAppBar = ({logout}: IProps): JSX.Element => {
const NetflixAppBar = () => {
    const navigate = useNavigate()
    const [query, setQuery] = useState<any>()
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

    const handleKeyPress = (e: any) => {
        const keyEnter = 13
        if (e.keyCode === keyEnter) {
            navigate(`/search/${query}`)
        }
    }

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
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{'aria-label': 'search'}}
                        onKeyDown={handleKeyPress}
                        onChange={(e)=> setQuery(e.target.value)}
                    />
                </Search>
                <img
                    role="button"
                    aria-label="logout"
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
