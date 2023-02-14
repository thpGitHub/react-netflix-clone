import axios from "axios"

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

export const getUserByToken2 = () => {
    let user: User | null = null

    return axios.get(`/getUserByToken`)
}
