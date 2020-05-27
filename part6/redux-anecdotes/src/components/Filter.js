import React from "react"
import {useDispatch} from "react-redux"
import { filterChange } from '../reducers/filterReducer'

const Filter = () => {
    const dispatch = useDispatch()

    const filterAnecdote = (event) =>{
        event.preventDefault()
        const filterValue = event.target.value
        dispatch(filterChange(filterValue))
    }

    const style = {
        marginBottom: 10
    }

    return(
        <div style={style}>
            Filter anecdotes:
            <input
                name="filter"
                onChange={filterAnecdote}
            />
        </div>
    )

}

export default Filter