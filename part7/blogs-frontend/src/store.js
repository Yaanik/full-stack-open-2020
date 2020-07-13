import notificationReducer from "./reducers/notificationReducer"
import blogReducer from "./reducers/blogReducer"
import usersReducer from "./reducers/usersReducer"
import loginReducer from "./reducers/loginReducer"

import thunk from 'redux-thunk'

import {applyMiddleware, combineReducers, createStore} from "redux"
import {composeWithDevTools} from 'redux-devtools-extension'



//TODO: add users and user reducer
const reducer = combineReducers({
    blogs: blogReducer,
    notification: notificationReducer,
    users: usersReducer,
    login: loginReducer,
})

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

console.log(store.getState())

export default store