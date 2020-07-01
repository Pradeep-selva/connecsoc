import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI } from '../types'
import axios from 'axios'

export const loginUser = (userData, history) => (dispatch) => {
    dispatch({
        type: LOADING_UI
    })

    axios.post('/login', userData)
        .then(res => {
            console.log(res.data)
            const Authentication = `Bearer ${res.data.token}`
            localStorage.setItem('AuthToken', Authentication)
            axios.defaults.headers.common["Authorization"] = Authentication
            dispatch(getUser())
            dispatch({
                type: CLEAR_ERRORS
            })
            history.push('/')
        })
        .catch(err => {
            console.log(err.response.data)
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
}

export const getUser = () => (dispatch) => {
    axios.get('/user')
        .then(res => {
            dispatch({
                type: SET_USER,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}