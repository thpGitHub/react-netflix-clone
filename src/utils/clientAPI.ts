import axios from 'axios'
// ** Constants **
import {API_KEY_THEMOVIEDB, LANG, API_URL_THEMOVIEDB} from '../const'
// ** Utils **
import * as authNetflix from '../../src/utils/authNetflixProvider'
// import {sleep} from './helper'

/*
 * fetch on : https://api.themoviedb.org/3
 */
const clientApi = async (endpoint: string) => {
    const page = 1
    const startChar = endpoint.includes('?') ? `&` : `?`
    // await sleep(4000)
    const keyLang = `${startChar}api_key=${API_KEY_THEMOVIEDB}&language=${LANG}&page=${page}`
    //API_URL = https://api.themoviedb.org/3

    // on catch ici l'erreur retourné par tmdb afin de personaliser le
    // message dans errorBoundary
    // retour tmdb quand mauvais id :
    // status_code:34
    // status_message: "The resource you requested could not be found."
    // success: false
    return axios.get(`${API_URL_THEMOVIEDB}/${endpoint}${keyLang}`).catch(error => {
        if (error.response) {
            const err = {
                ...error.response,
                message: error.response?.data?.status_message,
            }
            return Promise.reject(err)
        } else {
            return Promise.reject(error)
        }
    })
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
const clientNetflix = (
    endpoint: string,
    {data, method = 'get', movie}: any,
) => {
    const config: any = {
        method,
        url: `https://auth.service.mock.com/${endpoint}`,
        // data: JSON.stringify(data),
        // data: data,
        data: {data, movie},
        // movie: movie,
        headers: {
            Authorization: data.token ? `Bearer ${data.token}` : undefined,
        },
    }
    return (
        axios(config)
            .then(response => {
                console.log('response data ', response?.data)
                console.log('movie ', movie)
                return response.data
            })
            // .catch(error => {
            //     if (error.response) {
            //         return Promise.reject(error.response.data)
            //     }
            // })
            .catch(error => {
                if (error?.response?.status === 401) {
                    authNetflix.logout()
                    return Promise.reject({
                        message: 'Authentification incorrecte',
                    })
                }
                if (error.response) {
                    return Promise.reject(error.response.data)
                } else {
                    return Promise.reject(error)
                }
            })
    )
}

export {clientApi, clientAuth, clientNetflix}
