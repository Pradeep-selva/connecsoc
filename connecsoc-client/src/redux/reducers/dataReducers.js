import {
    SET_POSTS,
    LOADING_POSTS,
    LIKE_POST,
    UNLIKE_POST
} from '../types'

const initialState = {
    posts: [],
    post: {},
    loading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_POSTS:
            console.log(action.payload)
            return {
                ...state,
                posts: action.payload,
                loading: false
            }
        case LOADING_POSTS:
            return {
                ...state,
                loading: true
            }
        case LIKE_POST:
        case UNLIKE_POST:
            let index = state.posts.findIndex(
                post => post.id === action.payload.id
            )
            state.posts[index] = action.payload
            return {
                ...state
            }
        default:
            return state
    }
}