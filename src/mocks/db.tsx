/* fichier simulant un backend qui stock des données
   dans le localStorage
*/
// import sha256 from 'crypto-js/sha256';
import bcryptjs from 'bcryptjs'

const localStorageKey = 'netflixTEST-clone-users'
// const localStorageKey = 'netflix-clone-users'

const loadUsersFromLocalStorage = async () => {
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
    password: string
}) => {
    let users = await loadUsersFromLocalStorage()
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

    const hash = bcryptjs.hashSync("toto");
    // const nonce = "tokenToString"
    // const message = "titi"
    // const hashDigest = sha256(nonce + message);
    // const hashDigest = sha256("toto");
    // console.log('hashDigest', hashDigest);
    console.log('hash', hash);
    

    const id = userName

    const user = {id, userName, password}
    saveUserInlocalStorage(user)
    // loadUsersFromLocalStorage()
}

export {createUser}
