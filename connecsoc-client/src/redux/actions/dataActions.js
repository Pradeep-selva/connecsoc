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
    STOP_LOADING,
    ADD_COMMENT
} from '../types'


const changeObjKey = (data, newKey, oldKey) => {
    Object.defineProperty(data, newKey,
        Object.getOwnPropertyDescriptor(data, oldKey))
    delete data[oldKey]

    return data
}


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
            res.data = changeObjKey(res.data, 'handle', 'userHandle')

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
            res.data = changeObjKey(res.data, 'handle', 'userHandle')

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

            post = changeObjKey(post, 'handle', 'userHandle')

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
            res.data = changeObjKey(res.data, 'handle', 'userHandle')

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

export const commentOnPost = (postId, commentData) => (dispatch) => {

    axios.post(`/post/${postId}/comment`, commentData)
        .then(res => {
            dispatch({
                type: ADD_COMMENT,
                payload: res.data
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

export const getUserPosts = (handle) => (dispatch) => {
    dispatch({
        type: LOADING_POSTS
    })
    console.log('userpost')
    axios.get(`/user/${handle}`)
        .then(res => {
            let posts = res.data.posts
            posts.forEach(post => {
                changeObjKey(post, 'handle', 'userHandle')
                changeObjKey(post, 'id', 'postId')
            })

            posts = posts.map(post => {
                var modPost = Object.assign({}, post);
                modPost.userImg = res.data.user.imgUrl
                return modPost;
            })


            dispatch({
                type: SET_POSTS,
                payload: posts
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