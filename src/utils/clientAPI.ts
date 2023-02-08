import axios from 'axios'
// ** Constants **
import {API_KEY_THEMOVIEDB, LANG, API_URL_THEMOVIEDB} from '../const'
// ** Utils **
import * as authNetflix from '../../src/utils/authNetflixProvider'
// import {sleep} from './helper'

/*
 * fetch on : https://api.themoviedb.org/3
 * endpoint exemple : 'tv/71446'
 * https://api.themoviedb.org/3/tv/71446?api_key=<<key_api>>&language=fr-fr&page=1
 */
const clientUseApiTheMovieDB = async (endpoint: string) => {
    const page = 1
    const startChar = endpoint.includes('?') ? `&` : `?`
    // await sleep(4000)
    const keyLang = `${startChar}api_key=${API_KEY_THEMOVIEDB}&language=${LANG}&page=${page}`

   /* On catch ici l'erreur retourné par tmdb afin de personaliser le
   * message dans errorBoundary
   * retour tmdb quand mauvais id :
   * status_code:34
   * status_message: "The resource you requested could not be found."
   * success: false  
   */ 
   
   /*
   * Pour le moment les datas de la réponse axios est sur any
   * <AxiosResponse<any, any>
   * Les composants qui reçoivent en props une des réponses devront la typer !
   * TODO : une fois toutes les interfaces créés, voir pour typer la réponse axios !
   */
    return axios
        .get(`${API_URL_THEMOVIEDB}/${endpoint}${keyLang}`)
        .catch(error => {
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
        data: {data, movie},
        headers: {
            Authorization: data.token ? `Bearer ${data.token}` : undefined,
        },
    }
    return axios(config)
        .then(response => {
            // console.log('response data ', response?.data)
            // console.log('movie ', movie)
            return response.data
        })
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
}

export {clientUseApiTheMovieDB, clientAuth, clientNetflix}
