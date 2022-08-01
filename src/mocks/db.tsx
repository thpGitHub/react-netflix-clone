/* fichier simulant un backend qui stock des données
   dans le localStorage
*/

const localStorageKey = 'netflix2222-clone-users'

const loadUser = async () => {
    const users = localStorage.getItem(localStorageKey)
    return users ?? []
}

const saveUserInlocalStorage = (user: {id: string; userName: string; password: string}) => {
    localStorage.setItem(localStorageKey, JSON.stringify(user))
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
}

export {createUser}
