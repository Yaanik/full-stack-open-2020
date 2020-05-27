import React from 'react'
import {useDispatch, useSelector, connect} from "react-redux"
import {addVote} from "../reducers/anecdoteReducer"
import {setNotification} from "../reducers/notificationReducer"

const Anecdote = ({anecdote, handleClick}) =>{
    return(
        <li>
            <p>{anecdote.content}</p>
            <p>Has {anecdote.votes} votes <button onClick={handleClick}>Vote</button></p>
        </li>
    )
}

const AnecdoteList = (props) => {
    const dispatch = useDispatch()

    const anecdotes = useSelector(state =>{
        if (state.filter !== '') {
            return state.anecdotes.filter(
                a => a.content.toLowerCase().includes(state.filter.toLowerCase())
            )
        } else {
            return state.anecdotes
        }
    })

    const handleVote = (anecdote) =>{
        dispatch(addVote(anecdote))
        dispatch(setNotification(`You voted for '${anecdote.content}'`, 5))
    }

    return(
        <ul>
            {anecdotes.map(anecdote =>
                <Anecdote
                    key={anecdote.id}
                    anecdote={anecdote}
                    handleClick={() =>{
                        handleVote(anecdote)
                    }}
                />
            )}
        </ul>
    )
}

const mapStateToProps = (state) => {
    // sometimes it is useful to console log from mapStateToProps
    console.log(state)
    return {
        anecdotes: state.anecdotes,
        filter: state.filter
    }
}

export default AnecdoteList