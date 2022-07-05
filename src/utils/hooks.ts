import React, {useReducer, useCallback} from 'react'

type ACTIONTYPE =
    | {type: 'fetching'}
    | {type: 'done', payload: any}
    | {type: 'fail', error: any}

interface IState {
    data: null
    error: null
    status: string
}

// interface IAction {
//     type?: string
//     payload?: any
//     error?: string
// }

const reducer = (state: any, action: ACTIONTYPE) => {
    switch (action.type) {
        case 'fetching':
            return {status: 'fetching', data: null, error: null}
        case 'done':
            return {status: 'done', data: action.payload, error: null}
        case 'fail':
            return {status: 'error', data: null, error: action.error}
        default:
            throw new Error('Action non supporté')
    }
}
const initialState: IState = {
    data: null,
    error: null,
    status: 'idle',
}
function useFetchData() {
    const [state, dispatch] = useReducer(reducer, initialState)
    const {data, error, status} = state

    const execute = useCallback((promise: Promise<any>) => {
        dispatch({type: 'fetching'})
        promise
            .then(marvel => dispatch({type: 'done', payload: marvel}))
            .catch(error => dispatch({type: 'fail', error}))
    }, [])

    const setData = useCallback(
        (data: any) => dispatch({type: 'done', payload: data}),
        [dispatch],
    )

    // return {data, error, status, execute, setData}
    return {data, error, status, execute}
}

export {useFetchData}
