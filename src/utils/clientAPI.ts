import axios from 'axios'
import {API_KEY, LANG, API_URL} from '../const'

const clientApi = (endpoint: string) => {
  const page = 1
  const startChar = endpoint.includes('?') ? `&` : `?`
  const keyLang = `${startChar}api_key=${API_KEY}&language=${LANG}&page=${page}`
  return axios.get(`${API_URL}/${endpoint}${keyLang}`)
}

export {clientApi}
