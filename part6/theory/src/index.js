import React, {useEffect} from 'react'
import ReactDOM from 'react-dom'
import {createStore, combineReducers, compose} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { Provider } from 'react-redux'
import noteService from './services/notes'
import App from './App'

import noteReducer, {initializeNotes} from './reducers/noteReducer'
import filterReducer from "./reducers/filterReducer"

const reducer = combineReducers({
    notes: noteReducer,
    filter: filterReducer
})

const store = createStore(
    reducer,
    composeWithDevTools()
)

noteService.getAll().then(notes =>
    store.dispatch(initializeNotes(notes))
)

console.log(store.getState())

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)