import {
    SET_POSTS,
    SET_POST,
    LOADING_POSTS,
    LIKE_POST,
    UNLIKE_POST,
    DELETE_POST,
    ADD_POST,
    ADD_COMMENT
} from '../types'

const initialState = {
    posts: [],
    post: {},
    loading: false,
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

        case SET_POST:
            return {
                ...state,
                post: action.payload
            }

        case LOADING_POSTS:
            return {
                ...state,
                loading: true
            }

        case ADD_POST:
            return {
                ...state,
                posts: [
                    action.payload,
                    ...state.posts
                ]
            }

        case ADD_COMMENT:
            return {
                ...state,
                post: {
                    ...state.post,
                    comments: [
                        action.payload,
                        ...state.post.comments
                    ]
                }
            }

        case LIKE_POST:
        case UNLIKE_POST:
            let index = state.posts.findIndex(
                post => post.id === action.payload.id
            )

            let newPosts = state.posts
            newPosts[index] = action.payload
            let newPost = state.posts

            if (state.post.id === action.payload.id)
                newPost = {
                    ...action.payload,
                    comments: state.post.comments
                }

            return {
                ...state,
                posts: [
                    ...newPosts
                ],
                post: newPost
            }

        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter((post) => post.id !== action.payload)
            };

        default:
            return state
    }
}