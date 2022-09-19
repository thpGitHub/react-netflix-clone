import axios from 'axios'
import { moveEmitHelpers } from 'typescript'
import {API_KEY, LANG, API_URL} from '../const'
import {sleep} from './helper'

/*
* fetch on : https://api.themoviedb.org/3
*/
const clientApi = async (endpoint: string) => {
    const page = 1
    const startChar = endpoint.includes('?') ? `&` : `?`
    // await sleep(4000)
    const keyLang = `${startChar}api_key=${API_KEY}&language=${LANG}&page=${page}`
    //API_URL = https://api.themoviedb.org/3
    return axios.get(`${API_URL}/${endpoint}${keyLang}`)
}

/*
* Catch by MSW
*/
const clientAuth = async (endPoint: string, token: string) => {
    // await sleep(4000)
    const config: any = {
        headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
            // Authorization: `Bearer ${token}`
        },
    }
    return axios.get(`https://auth.service.mock.com/${endPoint}`, config)
    // https://auth.service.mock.com/getUserAuth
}

/*
* Catch by MSW
*/
const clientNetflix = (endpoint: string, {data, method = 'get', movie}: any) => {
    const config: any = {
        method,
        url: `https://auth.service.mock.com/${endpoint}`,
        // data: JSON.stringify(data),
        data: data,
        // data: {data, movie},
        // movie: movie,
        headers: {
            Authorization: data.token
                ? `Bearer ${data.token}`
                : undefined,
        },
    }
    return axios(config)
        .then(response => {
            console.log('response data ', response?.data)
            console.log('movie ', movie)
            return response.data
        })
        .catch(error => {
            if (error.response) {
                return Promise.reject(error.response.data)
            }
        })
}

export {clientApi, clientAuth, clientNetflix}
