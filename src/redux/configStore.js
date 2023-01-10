import { combineReducers, applyMiddleware, createStore } from "redux"
import thunk from "redux-thunk"
import * as reducers from './reducers'

const rootReducer = combineReducers({
    //state ứng dụng
    ...reducers,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))