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
    // let user: User | null = null

    const user: User | null = (await axios.get(`/getUserByToken`)).data.user
    // const user = await (await axios.get(`/getUserByToken`)).data.user
    console.log({responseAxiosUser: user})

    // return axios.get(`/getUserByToken`)
    return user
}
