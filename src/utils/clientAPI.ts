import axios from 'axios'
import {API_KEY, LANG, API_URL} from '../const'

const clientApi = (endpoint: string) => {
  const page = 1
  const startChar = endpoint.includes('?') ? `&` : `?`
  const keyLang = `${startChar}api_key=${API_KEY}&language=${LANG}&page=${page}`
  return axios.get(`${API_URL}/${endpoint}${keyLang}`)
}
// const clientApi = async (endpoint: string) => {
//   const page = 1
//   // const startChar = endpoint.includes('?') ? `&` : `?`
//   // const keyLang = `${startChar}api_key=${API_KEY}&language=${LANG}&page=${page}`
//   const keyLang = `?api_key=${API_KEY}&language=${LANG}&page=${page}`
//   return axios.get(`${API_URL}/${endpoint}${keyLang}`)
// }

export {clientApi}

// const fetchComic = async id => {
//   try {
//       const response = await axios.get(
//           `https://thierry-api-marvel.herokuapp.com/comic/${id}`,
//       )
//       return await response.data
//   } catch (error) {
//       console.log(error)
//   }
// }
