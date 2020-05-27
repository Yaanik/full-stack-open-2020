import anecdoteService from "../services/anecdotes"


const anecdoteReducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT_ANECDOTES':
            return action.data
        case 'ADD_VOTE':
            const id = action.data.id
            const anecdoteToVote = state.find(a => a.id === id)
            const changedAnecdote = {
                ...anecdoteToVote,
                votes: anecdoteToVote.votes + 1
            }
            return state
                .map(anecdote =>
                    anecdote.id !== id ? anecdote : changedAnecdote)
                .sort((a, b) => b.votes - a.votes)
        case 'NEW_ANECDOTE':
            return [...state, action.data]
        default:
            return state

    }
}

export const initializeAnecdotes = () =>{
    return async dispatch =>{
        const anecdotes = await anecdoteService.getAll()
        anecdotes.sort((a,b) => b.votes - a.votes)
        dispatch({
            type:'INIT_ANECDOTES',
            data: anecdotes
        })
    }

}

export const createAnecdote = (data) => {
    return async dispatch => {
        const newAnecdote = await anecdoteService.createNew(data)
        dispatch({
            type: 'NEW_ANECDOTE',
            data: newAnecdote
        })
    }
}

export const addVote = (anecdote) => {
    return async dispatch =>{
        const updatedAnecdote = await anecdoteService.updateVote(anecdote)
        dispatch({
            type: 'ADD_VOTE',
            data: updatedAnecdote
        })
    }
}

export default anecdoteReducer