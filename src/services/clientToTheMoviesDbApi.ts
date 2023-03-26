import axios from 'axios'
import {API_KEY_THEMOVIEDB, LANG, API_URL_THEMOVIEDB} from '../const'

export const clientSendsRequestsToTheMovieDB = async (endpoint: string) => {
    const page = 1
    const startChar = endpoint.includes('?') ? `&` : `?`
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
     * TODO : une fois toutes les types créés, voir pour typer la réponse axios !
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
