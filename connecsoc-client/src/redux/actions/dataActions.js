import axios from 'axios'
import {
    LOADING_POSTS,
    SET_POSTS,
    LIKE_POST,
    UNLIKE_POST,
    DELETE_POST,
    LOADING_UI,
    ADD_POST,
    SET_ERRORS,
    CLEAR_ERRORS,
    SET_POST,
    STOP_LOADING
} from '../types'


export const getPosts = () => (dispatch) => {
    dispatch({
        type: LOADING_POSTS
    })
    axios.get('/posts')
        .then(res => {
            dispatch({
                type: SET_POSTS,
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err)
            dispatch({
                type: SET_POSTS,
                payload: []
            })
        })
}

export const likePost = (postId) => (dispatch) => {
    axios.get(`/post/${postId}/like`)
        .then(res => {
            res.data = changeUserKey(res.data)

            dispatch({
                type: LIKE_POST,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}

export const unlikePost = (postId) => (dispatch) => {
    axios.get(`/post/${postId}/unlike`)
        .then(res => {
            res.data = changeUserKey(res.data)

            dispatch({
                type: UNLIKE_POST,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}

export const addPost = (postData) => (dispatch) => {
    dispatch({
        type: LOADING_UI
    })

    axios.post('/post', postData)
        .then(res => {
            let post = res.data

            post = changeUserKey(post)

            dispatch({
                type: ADD_POST,
                payload: post
            })

            dispatch({
                type: CLEAR_ERRORS
            })
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
}

export const deletePost = (postId) => (dispatch) => {

    axios.delete(`/post/${postId}`)
        .then(res => {
            console.log(res)
            dispatch({
                type: DELETE_POST,
                payload: postId
            })
        })
        .catch(err => console.log(err))
}

export const getPost = (postId) => (dispatch) => {
    dispatch({
        type: LOADING_UI
    })

    axios.get(`/post/${postId}`)
        .then(res => {
            res.data['id'] = postId
            res.data = changeUserKey(res.data)

            dispatch({
                type: SET_POST,
                payload: res.data
            })

            dispatch({
                type: STOP_LOADING
            })
        })
        .catch(err => console.log(err))
}

const changeUserKey = (data) => {
    Object.defineProperty(data, 'handle',
        Object.getOwnPropertyDescriptor(data, 'userHandle'))
    delete data['userHandle']

    return data
}