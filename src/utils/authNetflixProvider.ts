const clientApiNetflix = async (
    endPoint: string,
    data: {userName: string; password: string},
    // ): Promise<any> => {
) => {
    // fetch('https://auth.service.mock.com/register', {
    return fetch(`https://auth.service.mock.com/${endPoint}`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'},
    }).then(async response => {
        console.log('response before', response)
        const data = await response.json()
        console.log('data after', data)
        if (response.ok) {
            console.log('**** IN response.ok ****', data)

            return data
        } else {
            return Promise.reject(data)
        }
    })
}

const register = async ({
    userName,
    password,
}: {
    userName: string
    password: string
}) => {
    return await clientApiNetflix('register', {
        userName,
        password,
    })
}

const login = async ({
    userName,
    password,
}: {
    userName: string
    password: string
}) => {
    return await clientApiNetflix('login', {userName, password})
}

export {register, login}
