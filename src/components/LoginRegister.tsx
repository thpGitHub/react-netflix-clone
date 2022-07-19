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

    return (
        <form autoComplete="off">
            <TextField
                id="filled-basic-username"
                type="email"
                label="Email ou numéro de téléphone"
                margin="dense"
                variant="filled"
                autoFocus
                fullWidth
            />
            <TextField
                id="filled-basic-password"
                type="password"
                label="Mot de passe"
                margin="dense"
                variant="filled"
                fullWidth
            />
            <Button variant="contained" fullWidth>
                {labelButton}
            </Button>
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

const PopupLogin = ({signUp = false}) => {
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
                    <FormLogin createLoginCount={createLogin} />
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
