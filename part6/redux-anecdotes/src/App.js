import React, {useEffect} from 'react'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from "./components/Notification"
import Filter from "./components/Filter"
import {useDispatch} from "react-redux"
import anecdoteService from "./services/anecdotes"
import {initializeAnecdotes} from "./reducers/anecdoteReducer"

const App = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initializeAnecdotes())
    }, [dispatch])

    return (
        <div>
            <h2>Anecdotes</h2>
            <Filter/>
            <Notification/>
            <AnecdoteList/>
            <AnecdoteForm/>
        </div>
    )
}

export default App

