import axios from 'axios'

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

export const getUserByToken = async (): Promise<User | null> => {
    try {
        const user: User | null = (
            await axios.get(`/server.mock/authentication/getUserByToken`)
        ).data.user

        return user
        /**
         * If an error Axios => return null.
         * We don't want an Errorboundary, we only want to display <unauthApp />
         * Despite a token potentially present in the local storage!
         */
    } catch (error) {
        console.log({error: error})

        return null
    }
}
