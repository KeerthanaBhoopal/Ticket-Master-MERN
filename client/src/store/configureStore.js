import {createStore, CombineReducers, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import userReducer from '../reducers/userReducer'

const configureStore = () => {
    const store=createStore(combineReducers({
        user:userReducer
    }), applyMiddleware(thunk))
    return store
}

export default configureStore