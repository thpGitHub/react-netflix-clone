/* fichier simulant un backend qui stock des données
   dans le localStorage
*/
// import sha256 from 'crypto-js/sha256';
import bcryptjs from 'bcryptjs'
import {nanoid} from 'nanoid'

const localStorageKey = 'netflixTEST-clone-users'
const localStorageTokenKey = 'netflixTEST_auth_token'
// const localStorageKey = 'netflix-clone-users'

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

const createTokenInLocalStorage = () => {
    const token = bcryptjs.genSaltSync(10)
    localStorage.setItem(localStorageTokenKey, token)
    // localStorage.setItem(localStorageTokenKey, JSON.stringify(token))
}

const createUser = async ({
    userName,
    password,
}: {
    userName: string
    password: string
}) => {
    const userNameExistInLocalStorage = await getUserNameInLocalStorage(
        userName,
    )

    if (userNameExistInLocalStorage !== undefined) {
        const error = new Error(
            `Impossible de créer un utilisateur car  "${userName}" existe déjà `,
        )
        //   error.status = 400
        throw error
    }

    const id = nanoid()
    const salt = bcryptjs.genSaltSync(10)
    const passwordHash = bcryptjs.hashSync(password, salt)

    const user = {id, userName, passwordHash}
    await saveUserInlocalStorage(user)
    createTokenInLocalStorage()
}

export {createUser}
