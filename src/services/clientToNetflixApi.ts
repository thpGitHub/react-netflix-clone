type LoginData = {
    userName: string
    password: string
}

const clientSendsRequestsToTheNetflixApi = async (
    endPoint: 'login' | 'register',
    // data: {userName: string; password: string},
    data: LoginData,
): Promise<any> => {
    return fetch(`/netflixAPI/${endPoint}`, {
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
