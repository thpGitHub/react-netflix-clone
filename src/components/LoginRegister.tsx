import React from 'react'
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

const LoginRegister = () => {
    const [open, setOpen] = React.useState(true)

    const handleClickOpen = () => {
        setOpen(true)
    }

    // const handleClose = () => {
    //     setOpen(false)
    // }

    return (
        <div>
            {/* <Button variant="outlined" onClick={handleClickOpen}>
                Open form dialog
            </Button> */}
            {/* <Dialog open={open} onClose={handleClose}> */}
            <Dialog open={open}>
                <DialogTitle>Connexion</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email ou numéro de téléphone"
                        type="email"
                        fullWidth
                        variant="filled"
                    />
                    <TextField
                        margin="dense"
                        id="name"
                        label="Mot de passe"
                        type="password"
                        fullWidth
                        variant="filled"
                    />
                </DialogContent>
                <DialogActions
                    style={{
                        justifyContent: 'center',
                        paddingLeft: '24px',
                        paddingRight: '24px',
                    }}
                >
                    <Button variant="contained" fullWidth>
                        {' '}
                        CONNEXION
                    </Button>
                </DialogActions>
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label="Se souvenir de moi"
                    />
                </FormGroup>
                <Button fullWidth>
                        {' '}
                        Nouveau sur Netflix ?
                    </Button>
            </Dialog>
        </div>
    )
}

export default LoginRegister
