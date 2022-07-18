import React, {useState} from 'react'
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

const FormLogin = ({createLoginCount = true}) => {
    const labelButton = createLoginCount ? 'Inscrivez vous' : 'Connexion'
    const labelButtonInfoCount = createLoginCount
        ? 'Vous posséder déjà un compte ?'
        : 'Nouveau sur Netflix ?'

    return (
        <form autoComplete="off">
            <TextField
                autoFocus
                margin="dense"
                id="filled-basic-username"
                label="Email ou numéro de téléphone"
                type="email"
                fullWidth
                variant="filled"
            />
            <TextField
                margin="dense"
                id="filled-basic-password"
                label="Mot de passe"
                type="password"
                fullWidth
                variant="filled"
            />
            <Button variant="contained" fullWidth>
                {labelButton}
                {/* CONNEXION */}
            </Button>
            <FormGroup>
                <FormControlLabel
                    style={{
                        justifyContent: 'flex-start',
                        paddingLeft: '24px',
                        paddingRight: '24px',
                    }}
                    control={<Checkbox defaultChecked />}
                    label="Se souvenir de moi"
                />
            </FormGroup>
            {/* <Button
                style={{
                    justifyContent: 'flex-start',
                    marginTop: '24px',
                }}
            >
                {labelButtonInfoCount}
            </Button> */}
        </form>
    )
}

const PopupLogin = ({signUp = false}) => {
    const [createLogin, setCreateLogin] = useState(signUp)
    const [open, setOpen] = React.useState(true)

    const handleSignUp = () => {
        setCreateLogin(true)
    }
    const handleSignIn = () => {
        setCreateLogin(false)
    }

    return (
        <div>
            <Dialog open={open} style={{backgroundColor: 'transparent'}}>
                <DialogTitle>Connexion</DialogTitle>
                <DialogContent>
                    <FormLogin />
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
