import React, {useState} from 'react'
// *** MUI ***
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Dialog, {DialogProps} from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
// ** Contexts **
import {useAuthContext} from '../contexts/authContext'
//** hook form and zod **/
import {useForm, Controller} from 'react-hook-form'
import {z} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'

const schema = z.object({
    email: z.string().nonempty('Email is required').email('Invalid email'),
    password: z
        .string()
        .min(4, 'Password must be at least 4 characters long')
        .max(32, 'Password must be at most 32 characters long'),
})

type FormValues = z.infer<typeof schema>

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
    const {handleSubmit, control} = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: {email: '', password: ''},
    })

    const labelButton = createLoginCount ? 'Inscrivez-vous' : 'Connexion'

    const onSubmit = ({email, password}: FormValues) => {
        console.log({email: email, password: password})
        !createLoginCount
            ? login({
                  userName: email,
                  password: password,
              })
            : register({
                  userName: email,
                  password: password,
              })
    }

    return (
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="email"
                control={control}
                render={({
                    field: {onChange, onBlur, value, ref},
                    fieldState: {error},
                }) => (
                    <TextField
                        error={!!error}
                        label="Email"
                        value={value}
                        margin="normal"
                        onBlur={onBlur}
                        variant="outlined"
                        inputRef={ref}
                        onChange={onChange}
                        autoFocus
                        fullWidth
                        helperText={error ? error.message : null}
                    />
                )}
            />
            <Controller
                name="password"
                control={control}
                render={({
                    field: {onChange, onBlur, value, ref},
                    fieldState: {error},
                }) => (
                    <TextField
                        error={!!error}
                        label="Password"
                        value={value}
                        margin="normal"
                        onBlur={onBlur}
                        variant="outlined"
                        inputRef={ref}
                        onChange={onChange}
                        fullWidth
                        helperText={error ? error.message : null}
                    />
                )}
            />

            <Button type="submit" variant="contained" fullWidth>
                {labelButton}
            </Button>

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
    const {login, register, authError: error} = useAuthContext()
    const [createLogin, setCreateLogin] = useState(signUp)
    const [open] = React.useState(true)
    const [maxWidth] = React.useState<DialogProps['maxWidth']>('xs')

    const labelTitle = createLogin ? 'Inscrivez-vous' : 'Connexion'

    const handleSignUp = () => {
        setCreateLogin(true)
    }
    const handleSignIn = () => {
        setCreateLogin(false)
    }

    return (
        <div>
            <Dialog
                open={open}
                maxWidth={maxWidth}
                sx={{backgroundColor: 'transparent'}}
            >
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
