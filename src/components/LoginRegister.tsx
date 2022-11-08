import React, {useState, useContext} from 'react'
// *** MUI ***
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Alert from '@mui/material/Alert'
// ** Contexts
// import authContext from '../contexts/authContext'
import {useAuthContext} from '../contexts/authContext'

// import {browser} from '../mocks/browser'

interface IProps {
    signUp?: boolean
    createLoginCount?: boolean
    login: ({userName, password}: {userName: string; password: string}) => void
    // register: ({userName?: string, password?: string}) => void
    register: ({
        userName,
        password,
    }: {
        userName: string
        password: string
    }) => void
    error?: any
}

const FormLogin = ({createLoginCount = true, login, register}: IProps) => {
    const [userName, setUserName] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const labelButton = createLoginCount ? 'Inscrivez vous' : 'Connexion'

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log('on handleSubmit')

        fetch('https://example.com/api/login')
            .then(response => response.json())
            .then(data => {
                console.log('data :)', data)
            })
    }

    return (
        // <form autoComplete="off" onSubmit={handleSubmit}>
        <form autoComplete="off">
            <TextField
                id="filled-basic-username"
                type="email"
                label="Email ou numéro de téléphone"
                margin="dense"
                variant="filled"
                onChange={e => setUserName(e.target.value)}
                autoFocus
                fullWidth
            />
            <TextField
                id="filled-basic-password"
                type="password"
                label="Mot de passe"
                margin="dense"
                onChange={e => setPassword(e.target.value)}
                variant="filled"
                fullWidth
            />
            {createLoginCount ? (
                <>
                    <Button
                        variant="contained"
                        fullWidth
                        // type="submit"
                        onClick={() => register({userName, password})}
                    >
                        {labelButton}
                    </Button>
                </>
            ) : (
                <>
                    <Button
                        variant="contained"
                        fullWidth
                        // type="submit"
                        onClick={() => login({userName, password})}
                    >
                        {labelButton}
                    </Button>
                </>
            )}

            <FormGroup>
                <FormControlLabel
                    style={{
                        paddingLeft: '24px',
                        paddingRight: '24px',
                        justifyContent: 'flex-start',
                    }}
                    control={<Checkbox defaultChecked />}
                    label="Se souvenir de moi"
                />
            </FormGroup>
        </form>
    )
}

// const PopupLogin = ({signUp = false, login, register, error}: IProps) => {
const PopupLogin = ({signUp = false}) => {
    // const {login, register, authError: error}: any = useContext(authContext)
    const {login, register, authError: error}: any = useAuthContext
    const [createLogin, setCreateLogin] = useState(signUp)
    const [open, setOpen] = React.useState(true)

    const labelTitle = createLogin ? 'Inscrivez vous' : 'Connexion'

    const handleSignUp = () => {
        setCreateLogin(true)
    }
    const handleSignIn = () => {
        setCreateLogin(false)
    }

    return (
        <div>
            <Dialog open={open} style={{backgroundColor: 'transparent'}}>
                <DialogTitle>{labelTitle}</DialogTitle>
                <DialogContent>
                    <FormLogin
                        createLoginCount={createLogin}
                        login={login}
                        register={register}
                    />
                    {error ? (
                        <Alert severity="error">Erreur : {error.message}</Alert>
                    ) : null}
                </DialogContent>
                <DialogActions
                    style={{
                        justifyContent: 'flex-start',
                    }}
                >
                    {!createLogin ? (
                        <Button onClick={handleSignUp}>
                            {/* Nouveau sur Netflix ? {spinner} */}
                            Nouveau sur Netflix ?
                        </Button>
                    ) : (
                        <Button onClick={handleSignIn}>
                            {/* Vous posséder déjà un compte ? {spinner} */}
                            Vous posséder déjà un compte ?
                        </Button>
                    )}
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default PopupLogin
