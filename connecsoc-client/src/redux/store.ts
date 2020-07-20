import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import userReducer from './reducers/userReducers'
import dataReducer from './reducers/dataReducers'
import uiReducer from './reducers/uiReducer'

import { UserType } from './reducers/userReducers'
import { DataType } from './reducers/dataReducers'
import { UiType } from './reducers/uiReducer'

const initialState = {}

const reducers = combineReducers({
    user: userReducer,
    data: dataReducer,
    UI: uiReducer
})

const middleware = [thunk]

const store = createStore(
    reducers,
    initialState,
    compose(applyMiddleware(...middleware),
        (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__())
)

export type ReduxState = {
    user: UserType,
    data: DataType,
    UI: UiType
}

export default store