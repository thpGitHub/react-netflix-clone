import React, {useState} from 'react'
// *** MUI ***
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
// ** Contexts **
import {useAuthContext} from '../contexts/authContext'

type AuthData = {
    userName: string
    password: string
}

type Props = {
    signUp?: boolean
    createLoginCount?: boolean
    login: (data: AuthData) => void
    register: (data: AuthData) => void
    error?: any
}

const FormLogin = ({createLoginCount = true, login, register}: Props) => {
    const [userName, setUserName] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const labelButton = createLoginCount ? 'Inscrivez-vous' : 'Connexion'

    return (
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
                        onClick={() => login({userName, password})}
                    >
                        {labelButton}
                    </Button>
                </>
            )}

            <FormGroup>
                <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Se souvenir de moi"
                />
            </FormGroup>
        </form>
    )
}

const PopupLogin = ({signUp = false}) => {
    // const {login, register, authError: error} = useContext(AuthContext)
    const {login, register, authError: error} = useAuthContext()
    const [createLogin, setCreateLogin] = useState(signUp)
    const [open] = React.useState(true)

    const labelTitle = createLogin ? 'Inscrivez-vous' : 'Connexion'

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
                            Nouveau sur Netflix ?
                        </Button>
                    ) : (
                        <Button onClick={handleSignIn}>
                            Vous posséder déjà un compte ?
                        </Button>
                    )}
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default PopupLogin
