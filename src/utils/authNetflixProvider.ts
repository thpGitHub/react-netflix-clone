import {TOKEN_KEY_IN_LOCAL_STORAGE} from '../const'

const clientApiNetflix = async (
    endPoint: string,
    data: {userName: string; password: string},
    // ): Promise<any> => {
) => {
    // fetch('https://auth.service.mock.com/register', {
    return fetch(`https://auth.service.mock.com/${endPoint}`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'},
    }).then(async response => {
        console.log('response before', response)
        const data = await response.json()
        console.log('data after', data)
        if (response.ok) {
            console.log('**** IN response.ok ****', data)

            return data
        } else {
            console.log('**** IN Promise.reject ****', data)

            return Promise.reject(data)
            // or same result
            // throw new Error(data.message)
        }
    })
}

const register = async ({
    userName,
    password,
}: {
    userName: string
    password: string
}) => {
    return await clientApiNetflix('register', {
        userName,
        password,
    })
}

const login = async ({
    userName,
    password,
}: {
    userName: string
    password: string
}) => {
    return await clientApiNetflix('login', {userName, password})
}

const logout = () => {
    localStorage.removeItem('netflixTEST_auth_token')
}

const getTokenInLocalStorage = async () => {
    return localStorage.getItem(TOKEN_KEY_IN_LOCAL_STORAGE)
}

export {register, login, logout, getTokenInLocalStorage}
