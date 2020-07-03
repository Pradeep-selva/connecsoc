import {
    SET_AUTHENTICATED,
    SET_UNAUTHENTICATED,
    SET_USER,
    LOADING_USER,
    LIKE_POST,
    UNLIKE_POST
} from '../types'

const initialState = {
    authenticated: false,
    loading: false,
    credentials: {},
    likes: [],
    notifications: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true,
            }
        case SET_UNAUTHENTICATED:
            return initialState
        case SET_USER:
            return {
                ...action.payload,
                authenticated: true,
            }
        case LOADING_USER:
            return {
                ...state,
                loading: true
            }
        case LIKE_POST:
            return {
                ...state,
                likes: [
                    ...state.likes,
                    {
                        userHandle: state.credentials.handle,
                        postId: action.payload.postId
                    }
                ]
            }
        case UNLIKE_POST:
            let filteredLikes = state.likes.filter(
                like => like.postId === action.payload.postId
            )
            return {
                ...state,
                likes: [
                    ...filteredLikes
                ]
            }
        default:
            return state
    }
}