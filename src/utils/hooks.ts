// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {useReducer, useCallback} from 'react'
// import {sleep} from './helper'

type ACTIONTYPE =
    | {type: 'fetching'}
    | {type: 'done'; payload: any}
    | {type: 'fail'; error: any}

interface IState {
    data: null
    error: null
    status: string
}

interface ReturnUseFetchData {
    data: any
    error: any
    status: string
    execute: (promise: Promise<any>) => void
    setData: (data: any) => void
}

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
function useFetchData(): ReturnUseFetchData {
// function useFetchData(): any {
    const [state, dispatch] = useReducer(reducer, initialState)
    const {data, error, status} = state

    const execute = useCallback((promise: Promise<any>) => {
        dispatch({type: 'fetching'})
        // sleep(4000)
        promise
            .then(marvel => dispatch({type: 'done', payload: marvel}))
            .catch(error => dispatch({type: 'fail', error}))
    }, [])

    const setData = useCallback(
        (data: any) => dispatch({type: 'done', payload: data}),
        [dispatch],
    )

    return {data, error, status, execute, setData}
}

export {useFetchData}
