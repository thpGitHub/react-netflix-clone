/* fichier simulant un backend qui stock des données
   dans le localStorage
*/
import {TOKEN_KEY_IN_LOCAL_STORAGE} from '../const'
import bcryptjs from 'bcryptjs'
import {nanoid} from 'nanoid'

import {sleep} from '../utils/helper'

const localStorageKey = 'netflixTEST-clone-users'
// const localStorageTokenKey = 'netflixTEST_auth_token'
// const localStorageKey = 'netflix-clone-users'

interface Error {
    name: string
    message: string
    stack?: string
    status?: number
    // code?: number;
}

const getUsersFromLocalStorage = async () => {
    let users = localStorage.getItem(localStorageKey)

    if (typeof users === 'string') {
        console.log('users STRING in loadUserFromLocalStorage', users)
        return (users = JSON.parse(users))
    }
    console.log('users in loadUserFromLocalStorage', users)

    return users
}

const saveUserInlocalStorage = async (user: {
    id: string
    userName: string
    passwordHash: string
    token: string
}) => {
    let users = await getUsersFromLocalStorage()
    console.log('users in saveUserInlocalStorage', users)

    if (users) {
        users.push(user)
    } else {
        users = [user]
        console.log('else users === ', users)
    }

    localStorage.setItem(localStorageKey, JSON.stringify(users))
}

const getUserNameInLocalStorage = async (userName: string) => {
    const users = await getUsersFromLocalStorage()

    return users.find((item: {userName: string}) => item.userName === userName)
}

const getUserWithTokenInLocalStorage = async (token: string) => {
    const users = await getUsersFromLocalStorage()
    console.log(
        'users.find((item: {token: string}) => item.token === token',
        users.find((item: {token: string}) => item.token === token),
    )

    return users.find((item: {token: string}) => item.token === token)
}

const createTokenInLocalStorage = async () => {
    const token = bcryptjs.genSaltSync(10)
    localStorage.setItem(TOKEN_KEY_IN_LOCAL_STORAGE, token)
    // localStorage.setItem(localStorageTokenKey, JSON.stringify(token))
    return token
}

const createUser = async ({
    userName,
    password,
}: {
    userName: string
    password: string
}) => {
    if (!userName) {
        const error = new Error("Le nom d'utilisateur est obligatoire !")
        // error.status = 400
        throw error
    }

    if (!password) {
        const error = new Error('Le mot de passe est obligatoire')
        // error.status = 400
        throw error
    }

    const userNameExistInLocalStorage = await getUserNameInLocalStorage(
        userName,
    )

    console.log('userNameExistInLocalStorage', userNameExistInLocalStorage)
    // sleep(4000)

    if (userNameExistInLocalStorage !== undefined) {
        const error: Error = new Error(
            `Impossible de créer un utilisateur car ${userName} existe déjà `,
        )
        error.status = 400
        console.log('error ', error)
        throw error
    }

    const id = nanoid()
    const salt = bcryptjs.genSaltSync(10)
    const passwordHash = bcryptjs.hashSync(password, salt)
    const token = await createTokenInLocalStorage()
    const bookmark = {movies: [], series: []}

    const user = {id, userName, passwordHash, token, bookmark}
    await saveUserInlocalStorage(user)
    // await createTokenInLocalStorage()

    return user
}

const authenticateUserForLogin = async ({
    userName,
    password,
}: {
    userName: string
    password: string
}) => {
    if (!userName) {
        const error = new Error("Le nom d'utilisateur est obligatoire !")
        // error.status = 400
        throw error
    }

    if (!password) {
        const error = new Error('Le mot de passe est obligatoire')
        // error.status = 400
        throw error
    }

    const getUserWithUserNameInLocalStorage = await getUserNameInLocalStorage(
        userName,
    ) //.then(user => console.log("getUserNameInLocalStorage",user)
    //)
    console.log(
        'getUserWithUserNameInLocalStorage',
        getUserWithUserNameInLocalStorage,
    )

    if (
        getUserWithUserNameInLocalStorage === undefined ||
        !bcryptjs.compareSync(
            password,
            getUserWithUserNameInLocalStorage?.passwordHash,
        )
    ) {
        const error = new Error("Nom d' utilisateur ou mot de passe incorrect")

        throw error
    }

    return getUserWithUserNameInLocalStorage
}

export {createUser, authenticateUserForLogin, getUserWithTokenInLocalStorage}
