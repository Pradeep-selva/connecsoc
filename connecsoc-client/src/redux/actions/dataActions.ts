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
import { AppThunk, AppThunkAction } from '../store'



const changeObjKey = (data: any, newKey: string, oldKey: string) => {
    const oldValue = Object.getOwnPropertyDescriptor(data, oldKey);
    if (!oldValue) {
        return;
    }
    Object.defineProperty(data, newKey, oldValue)
    delete data[oldKey]

    return data
}


export const getPosts = (): AppThunkAction => (dispatch: AppThunk) => {
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

export const likePost = (postId: string): AppThunkAction => (dispatch: AppThunk) => {
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

export const unlikePost = (postId: string): AppThunkAction => (dispatch: AppThunk) => {
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

export const addPost = (postData: { body: string }): AppThunkAction => (dispatch: AppThunk) => {
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

export const deletePost = (postId: string): AppThunkAction => (dispatch: AppThunk) => {

    axios.delete(`/post/${postId}`)
        .then(res => {
            dispatch({
                type: DELETE_POST,
                payload: postId
            })
        })
        .catch(err => console.log(err))
}

export const getPost = (postId: string): AppThunkAction => (dispatch: AppThunk) => {
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

export const commentOnPost = (postId: string, commentData: { body: string }): AppThunkAction => (dispatch: AppThunk) => {

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

export const getUserPosts = (handle: string): AppThunkAction => (dispatch: AppThunk) => {
    dispatch({
        type: LOADING_POSTS
    })

    axios.get(`/user/${handle}`)
        .then(res => {
            let posts = res.data.posts
            posts.forEach((post: any) => {
                changeObjKey(post, 'handle', 'userHandle')
                changeObjKey(post, 'id', 'postId')
            })

            posts = posts.map((post: any) => {
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
        })
}