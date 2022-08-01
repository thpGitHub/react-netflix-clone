const clientApiNetflix = async (
    endPoint: string,
    data: {userName: string; password: string},
) => {
    // fetch('https://auth.service.mock.com/register', {
    fetch(`https://auth.service.mock.com/${endPoint}`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'},
    }).then(async response => {
        console.log('response before', response)
        const data = await response.json()
        console.log('data after', data)
        if (response.ok) {
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
    return clientApiNetflix('register', {
        userName,
        password,
    })
}

export {register}
