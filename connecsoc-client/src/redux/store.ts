import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Action } from '@reduxjs/toolkit'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import thunk from 'redux-thunk'

import userReducer from './reducers/userReducers'
import dataReducer from './reducers/dataReducers'
import uiReducer from './reducers/uiReducer'

import { UserType } from './reducers/userReducers'
import { DataType } from './reducers/dataReducers'
import { UiType } from './reducers/uiReducer'

export type ReduxState = {
    user: UserType,
    data: DataType,
    UI: UiType
}

const initialState = {}

const reducers = combineReducers<ReduxState>({
    user: userReducer,
    data: dataReducer,
    UI: uiReducer
})

const middleware = [thunk]

export type RootState = ReturnType<typeof store.getState>;
export type AppThunkAction = ThunkAction<any, RootState, any, Action<any>>;
export type AppThunk = ThunkDispatch<ReduxState, void, Action>;

const store = createStore(
    reducers,
    initialState,
    compose(applyMiddleware(...middleware),
        (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__())
)

export default store