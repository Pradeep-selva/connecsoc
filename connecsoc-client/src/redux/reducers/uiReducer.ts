import {
    SET_ERRORS,
    CLEAR_ERRORS,
    LOADING_UI,
    STOP_LOADING
} from '../types'

export interface UiType {
    loading: boolean,
    errors: any
}

const initialState: UiType = {
    loading: false,
    errors: {}
}

export default function (state = initialState, action: any) {
    switch (action.type) {
        case SET_ERRORS:
            return {
                loading: false,
                errors: action.payload
            }

        case CLEAR_ERRORS:
            return {
                loading: false,
                errors: {}
            }

        case LOADING_UI:
            return {
                ...state,
                loading: true
            }

        case STOP_LOADING:
            return {
                ...state,
                loading: false
            }

        default:
            return state
    }
}