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

export const getUserByToken2 = async () => {
    const user: User | null = (await axios.get(`/getUserByToken`)).data.user

    return user
}
