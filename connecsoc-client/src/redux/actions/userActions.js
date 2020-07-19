import {
    SET_USER,
    SET_ERRORS,
    CLEAR_ERRORS,
    LOADING_UI,
    SET_UNAUTHENTICATED,
    LOADING_USER,
    MARK_NOTIFICATIONS_READ
} from '../types'
import axios from 'axios'

export const loginUser = (userData, history) => (dispatch) => {
    dispatch({
        type: LOADING_UI
    })

    axios.post('/login', userData)
        .then(res => {
            console.log(res.data)
            setToken(res.data.token)
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

export const signupUser = (userData, history) => (dispatch) => {
    dispatch({
        type: LOADING_UI
    })

    axios.post('/signup', userData)
        .then(res => {
            console.log(res.data)
            setToken(res.data.token)
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

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('AuthToken')
    delete axios.defaults.headers.common['Authorization']

    dispatch({
        type: SET_UNAUTHENTICATED
    })
}

export const uploadImage = (formData) => (dispatch) => {
    dispatch({
        type: LOADING_USER
    })
    axios.post('/user/image', formData)
        .then(() => {
            dispatch(getUser())
        })
        .catch(err => console.log(err.response.data))
}

export const editUser = (userDetails) => (dispatch) => {
    dispatch({
        type: LOADING_USER
    })
    axios.post('/user', userDetails)
        .then(() => {
            dispatch(getUser())
        })
        .catch(err => console.log(err.response.data))
}

export const getUser = () => (dispatch) => {
    dispatch({
        type: LOADING_USER
    })

    axios.get('/user')
        .then(res => {
            dispatch({
                type: SET_USER,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}

export const markNotificationsRead = (notificationList) => (dispatch) => {
    axios.post('/notifications', notificationList)
        .then(res => {
            dispatch({
                type: MARK_NOTIFICATIONS_READ,
            })
        })
        .catch(err => console.log(err))
}

const setToken = (token) => {
    const Authentication = `Bearer ${token}`
    localStorage.setItem('AuthToken', Authentication)
    axios.defaults.headers.common["Authorization"] = Authentication
}