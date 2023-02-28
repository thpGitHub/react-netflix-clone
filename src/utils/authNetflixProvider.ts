// import {TOKEN_KEY_IN_LOCAL_STORAGE} from '../const'

// const clientApiNetflix = async (
//     endPoint: string,
//     data: {userName: string; password: string},
// ) => {
//     // fetch('https://auth.service.mock.com/register', {
//     return fetch(`https://auth.service.mock.com/${endPoint}`, {
//         method: 'POST',
//         body: JSON.stringify(data),
//         headers: {'Content-Type': 'application/json'},
//     }).then(async response => {
//         const data = await response.json()
//         if (response.ok) {
//             return data
//         } else {
//             return Promise.reject(data)
//             /*
//              * or same result
//              * throw new Error(data.message)
//              */
//         }
//     })
// }

// const register = async ({
//     userName,
//     password,
// }: {
//     userName: string
//     password: string
// }) => {
//     return await clientApiNetflix('register', {
//         userName,
//         password,
//     })
// }

// const login = async ({
//     userName,
//     password,
// }: {
//     userName: string
//     password: string
// }) => {
//     return await clientApiNetflix('login', {userName, password})
// }

// const logout = () => {
//     localStorage.removeItem('netflix-authUser-token')
// }

// const getTokenInLocalStorage = async () => {
//     return localStorage.getItem(TOKEN_KEY_IN_LOCAL_STORAGE)
// }

// export {register, login, logout, getTokenInLocalStorage}
export {}