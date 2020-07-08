import axios from 'axios'
import {
    LOADING_POSTS,
    SET_POSTS,
    LIKE_POST,
    UNLIKE_POST,
    DELETE_POST
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
            dispatch({
                type: UNLIKE_POST,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
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