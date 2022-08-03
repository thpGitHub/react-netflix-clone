/* fichier simulant un backend qui stock des données
   dans le localStorage
*/
// import sha256 from 'crypto-js/sha256';
import bcryptjs from 'bcryptjs'
import {nanoid} from 'nanoid'

const localStorageKey = 'netflixTEST-clone-users'
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
    hash: string
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

const createUser = async ({
    userName,
    password,
}: {
    userName: string
    password: string
}) => {
    // const hash = bcryptjs.hashSync(password);

    // const nonce = "tokenToString"
    // const message = "titi"
    // const hashDigest = sha256(nonce + message);
    // const hashDigest = sha256("toto");
    // console.log('hashDigest', hashDigest);
    // console.log('hash', hash);
    console.log('nanoID === ', nanoid(6))
    //=> "V1StGXR8_Z5jdHi6B-myT"

    const id = nanoid()
    const salt = bcryptjs.genSaltSync(10)
    const hash = bcryptjs.hashSync(password, salt)

    const user = {id, userName, hash}
    saveUserInlocalStorage(user)
    // getUsersFromLocalStorage()
}

export {createUser}
