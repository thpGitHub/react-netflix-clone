import axios from 'axios'

type LoginData = {
    userName?: string
    password?: string
}

const clientSendsRequestsToTheNetflixApi = async (
    endPoint: 'login' | 'register' | 'logout',
    // data: {userName: string; password: string},
    data: LoginData,
): Promise<any> => {
    return fetch(`/server.mock/netflix/${endPoint}`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'},
    }).then(async response => {
        const data = await response.json()
        if (response.ok) {
            return data
        } else {
            return Promise.reject(data)
            /*
             * or same result
             * throw new Error(data.message)
             */
        }
    })
}

// const clientSendsRequestsToTheNetflixApi = async (
//     endPoint: 'login' | 'register',
//     data: LoginData,
//   ): Promise<any> => {
//     try {
//       const response = await fetch(`/netflixAPI/${endPoint}`, {
//         method: 'POST',
//         body: JSON.stringify(data),
//         headers: { 'Content-Type': 'application/json' },
//       });
//       const responseData = await response.json();

//       if (response.ok) {
//         return responseData;
//       } else {
//         throw responseData;
//         /*
//          * or same result
//          * throw new Error(responseData.message)
//          */
//       }
//     } catch (error) {
//       throw error;
//       /*
//        * or same result
//        * throw new Error(error.message)
//        */
//     }
//   }
export const login = async ({userName, password}: LoginData) => {
    return await clientSendsRequestsToTheNetflixApi('login', {
        userName,
        password,
    })
}

export const register = async ({userName, password}: LoginData) => {
    return await clientSendsRequestsToTheNetflixApi('register', {
        userName,
        password,
    })
}

export const logout = () => {
    clientSendsRequestsToTheNetflixApi('logout', {})
}

// export const clientNetflix = (
export const clientAddOrDeleteBookmark = (
    endpoint: string,
    // endpoint: 'bookmark/movie' | 'bookmark/tv',
    {userAuthenticated:data, method = 'get', movie}: any,
) => {
    const config: any = {
        method,
        // url: `https://auth.service.mock.com/${endpoint}`,
        url: `/server.mock/netflix/${endpoint}`,
        data: {data, movie},
        headers: {
            Authorization: data?.token ? `Bearer ${data.token}` : undefined,
            // 'Content-Type': 'application/json',
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
                // authNetflixProvider.logout()
                logout()
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

