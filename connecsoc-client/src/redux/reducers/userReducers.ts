import {
    SET_AUTHENTICATED,
    SET_UNAUTHENTICATED,
    SET_USER,
    LOADING_USER,
    LIKE_POST,
    UNLIKE_POST,
    MARK_NOTIFICATIONS_READ
} from '../types'

export type CredentialsType = {
    location?: string,
    website?: string,
    bio?: string,
    imgUrl: string,
    uid: string,
    email: string,
    createdAt: string,
    handle: string
}

type LikesType = {
    postId: string,
    userHandle: string
}

type NotificationsType = {
    notificationId: string,
    read: boolean,
    postId: string,
    createdAt: string,
    recipient: string,
    sender: string,
    type: string
}

export interface UserType {
    authenticated: boolean,
    loading: boolean,
    credentials: CredentialsType | any,
    likes: Array<LikesType>,
    notifications: Array<NotificationsType>
}

const initialState: UserType = {
    authenticated: false,
    loading: false,
    credentials: {},
    likes: [],
    notifications: []
}

export default function (state = initialState, action: any) {
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
                        postId: action.payload.id
                    }
                ]
            }

        case UNLIKE_POST:
            return {
                ...state,
                likes: state.likes.filter(
                    like => like.postId !== action.payload.id
                )
            }

        case MARK_NOTIFICATIONS_READ:
            let notifs = state.notifications
            notifs.forEach(not => not.read = true)

            return {
                ...state,
                notifications: notifs
            }

        default:
            return state
    }
}