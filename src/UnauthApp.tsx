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
    const imageURL = '/images/posters.jpg'

    return (
        <div
            style={{
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                overflow: 'auto',
                position: 'fixed',
                backgroundSize: 'cover',
                backgroundImage: `url('${imageURL}')`,
            }}
        >
            <img
                src="/images/netflix-logo.png"
                alt=""
                style={{margin: '30px'}}
                height={50}
            />

            <LoginRegister login={login} register={register} />
        </div>
    )
}

export default UnauthApp
