import React from 'react'
import {useDispatch} from 'react-redux'
import {createAnecdote} from "../reducers/anecdoteReducer"
import {setNotification} from "../reducers/notificationReducer"

const AnecdoteForm = () =>{
    const dispatch = useDispatch()

    const addAnecdote = async (event) =>{
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
        dispatch(setNotification(`NEW! You added '${content}'`, 5))

    }

    return(
        <div>
            <h2>Create new anecdote</h2>
            <form onSubmit={addAnecdote}>
                <input name="anecdote" />
                <button type="submit">Add new anecdote</button>
            </form>
        </div>

    )
}

export default AnecdoteForm