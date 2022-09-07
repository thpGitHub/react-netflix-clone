import axios from 'axios'
import {API_KEY, LANG, API_URL} from '../const'
import {sleep} from './helper'

const clientApi = async (endpoint: string) => {
    const page = 1
    const startChar = endpoint.includes('?') ? `&` : `?`
    // await sleep(4000)
    const keyLang = `${startChar}api_key=${API_KEY}&language=${LANG}&page=${page}`
    return axios.get(`${API_URL}/${endpoint}${keyLang}`)
}

const clientAuth = (endPoint: string, token: string) => {
    const config: any = {
      Headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
        // Authorization: `Bearer ${token}`
      }
    }
    return axios.get(`https://auth.service.mock.com/${endPoint}`, config)
}

export {clientApi}
