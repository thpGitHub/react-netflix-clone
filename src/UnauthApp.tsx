import React from 'react'
import LoginRegister from './components/LoginRegister'

// interface IProps {
//   login: () => void
//   register: () => void
// }
interface IProps {
    login: ({userName, password}: {userName: string; password: string}) => void
    // register: ({userName?: string, password?: string}) => void
    register: ({
        userName,
        password,
    }: {
        userName: string
        password: string
    }) => void
}

const UnauthApp = ({login, register}: IProps) => {
    const imageURL = 'images/posters.jpg'

    return (
        <div
            style={{
                backgroundImage: `url('${imageURL}')`,
                backgroundSize: 'cover',
                position: 'fixed',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                overflow: 'auto',
            }}
        >
            <LoginRegister login={login} register={register} />
        </div>
    )
}

export default UnauthApp
