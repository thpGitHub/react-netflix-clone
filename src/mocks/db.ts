/* fichier simulant un backend qui stock des données
dans le localStorage
*/
// import {sleep} from '../utils/helper'
import {TOKEN_KEY_IN_LOCAL_STORAGE} from '../const'
import bcryptjs from 'bcryptjs'

const {v4: uuidv4} = require('uuid')
const localStorageKey = 'netflix-fake-database'
interface Error {
    name: string
    message: string
    stack?: string
    status?: number
    // code?: number;
}

type User = {
    id: string
    userName: string
    passwordHash: string
    token: string
    bookmark: {
        movies: number[]
        series: number[]
    }
}

const getUsersFromLocalStorage = async () => {
    let users = localStorage.getItem(localStorageKey)

    if (typeof users === 'string') {
        return (users = JSON.parse(users))
    }

    return users
}

const saveUserInlocalStorage = async (user: {
    id: string
    userName: string
    passwordHash: string
    token: string
    bookmark: any
}) => {
    let users = await getUsersFromLocalStorage()

    if (users) {
        users.push(user)
    } else {
        users = [user]
    }

    localStorage.setItem(localStorageKey, JSON.stringify(users))
}

export const getUserByTheTokenPresentInLocalStorage = async () => {
    const token = localStorage.getItem(TOKEN_KEY_IN_LOCAL_STORAGE)
    let user: User | null = null
    if(token) {
        const users = await getUsersFromLocalStorage()
        user = users.find((user: {token: string}) => user.token === token)
    }
    
    return user
}

const getUserNameInLocalStorage: any = async (userName: string) => {
    const users = await getUsersFromLocalStorage()

    return users?.find((item: {userName: string}) => item.userName === userName)
}

const getUserWithTokenInLocalStorage = async (token: string) => {
    const users = await getUsersFromLocalStorage()
    getUserByTheTokenPresentInLocalStorage()

    return users.find((item: {token: string}) => item.token === token)
}

const deleteUserWithTokenInLocalStorage = async (token: string) => {
    const users = await getUsersFromLocalStorage()
    const indexForDelete = users.findIndex(
        (element: any) => element.token === token,
    )
    await users.splice(indexForDelete, 1)
    localStorage.setItem(localStorageKey, JSON.stringify(users))
}

const createTokenInLocalStorage = async () => {
    const token = bcryptjs.genSaltSync(10)
    localStorage.setItem(TOKEN_KEY_IN_LOCAL_STORAGE, token)
    
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
    // sleep(4000)

    if (userNameExistInLocalStorage !== undefined) {
        const error: Error = new Error(
            `Impossible de créer un utilisateur car ${userName} existe déjà `,
        )
        error.status = 400
        throw error
    }

    const id = uuidv4()
    const salt = bcryptjs.genSaltSync(10)
    const passwordHash = bcryptjs.hashSync(password, salt)
    const token = await createTokenInLocalStorage()
    const bookmark = {movies: [], series: []}

    const user = {id, userName, passwordHash, token, bookmark}
    await saveUserInlocalStorage(user)

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

    localStorage.setItem(
        TOKEN_KEY_IN_LOCAL_STORAGE,
        getUserWithUserNameInLocalStorage.token,
    )

    return getUserWithUserNameInLocalStorage
}

const addBookmarkSerieInLocalStorage = async (
    serieID: number,
    authUser: any,
) => {
    const addBookmarkSerie = authUser.bookmark.series
    if (addBookmarkSerie.includes(serieID)) {
        const error = new Error('Serie déjà dans la liste')
        // error.status = 400
        throw error
    }

    addBookmarkSerie.push(serieID)
    /**
     * Real copy authUser
     * with structuredClone
     */
    const newAuthUser = structuredClone(authUser)
    newAuthUser.bookmark.series = addBookmarkSerie

    await deleteUserWithTokenInLocalStorage(authUser.token)
    await saveUserInlocalStorage(newAuthUser)

    return newAuthUser
}

const addBookmarkMovieInLocalStorage = async (
    movieID: number,
    authUser: any,
) => {
    const addBookmarkMovie = authUser.bookmark.movies
    if (addBookmarkMovie.includes(movieID)) {
        const error = new Error('Serie déjà dans la liste')
        // error.status = 400
        throw error
    }

    addBookmarkMovie.push(movieID)

    /**
     * Real copy authUser
     * with structuredClone
     */
    const newAuthUser = structuredClone(authUser)
    newAuthUser.bookmark.movies = addBookmarkMovie

    await deleteUserWithTokenInLocalStorage(authUser.token)
    // await saveUserInlocalStorage(newAuthUser2)
    await saveUserInlocalStorage(newAuthUser)

    return newAuthUser
}

const deleteBookmarkSerieInLocalStorage = async (
    serieID: number,
    authUser: any,
) => {
    const deleteBookmarkSerie = authUser.bookmark.series
    const indexForDeleteSerie = deleteBookmarkSerie.findIndex(
        (element: any) => element === serieID,
    )
    await deleteBookmarkSerie.splice(indexForDeleteSerie, 1)

    const newAuthUser = structuredClone(authUser)
    newAuthUser.bookmark.series = deleteBookmarkSerie

    await deleteUserWithTokenInLocalStorage(authUser.token)
    await saveUserInlocalStorage(newAuthUser)

    return newAuthUser
}

const deleteBookmarkMovieInLocalStorage = async (
    movieID: number,
    authUser: any,
) => {
    const deleteBookmarkMovie = authUser.bookmark.movies
    const indexForDeleteSerie = deleteBookmarkMovie.findIndex(
        (element: any) => element === movieID,
    )
    await deleteBookmarkMovie.splice(indexForDeleteSerie, 1)

    const newAuthUser = structuredClone(authUser)
    newAuthUser.bookmark.series = deleteBookmarkMovie

    await deleteUserWithTokenInLocalStorage(authUser.token)
    await saveUserInlocalStorage(newAuthUser)

    return newAuthUser
}

export {
    createUser,
    authenticateUserForLogin,
    getUserWithTokenInLocalStorage,
    addBookmarkMovieInLocalStorage,
    addBookmarkSerieInLocalStorage,
    deleteBookmarkSerieInLocalStorage,
    deleteBookmarkMovieInLocalStorage,
}
