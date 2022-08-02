/* fichier simulant un backend qui stock des données
   dans le localStorage
*/

// const localStorageKey = 'netflix2222F-clone-users'
const localStorageKey = 'netflix-clone-users'

const loadUsersFromLocalStorage = async () => {
    // const users  = JSON.parse(localStorage.getItem(localStorageKey) || "false")
    let users  = localStorage.getItem(localStorageKey)

    if (typeof users === 'string') {
        // const parse = JSON.parse(value) // ok
        console.log('users STRING in loadUserFromLocalStorage', users)
        // users = JSON.parse(users)
        return users = JSON.parse(users)
    
    }

    console.log('users in loadUserFromLocalStorage', users)

    // return users ?? 12
    return users
    // return users || []
}

const saveUserInlocalStorage = async (user: {
    id: string
    userName: string
    password: string
}) => {
    const users = await loadUsersFromLocalStorage()

    console.log('users in saveUserInlocalStorage', users);
    

    if(users) {
        users.push(user)
        // console.log('user', user);
        localStorage.setItem(localStorageKey, JSON.stringify(users))
        
    }

    // localStorage.setItem(localStorageKey, JSON.stringify(user))
}

const createUser = async ({
    userName,
    password,
}: {
    userName: string
    password: string
}) => {
    const id = userName

    const user = {id, userName, password}
    saveUserInlocalStorage(user)
    // loadUsersFromLocalStorage()
}

export {createUser}
