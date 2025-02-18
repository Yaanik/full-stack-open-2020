import React, {useEffect} from 'react'
import {useDispatch} from "react-redux"
import Notes from "./components/Notes"
import VisibilityFilter from "./components/VisibilityFilter"
import NewNote from "./components/NewNote"
import {initializeNotes} from "./reducers/noteReducer"


const App = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeNotes())
    },[dispatch])

    return (
        <div>
            <NewNote />
            <VisibilityFilter />
            <Notes />
        </div>
    )
}

export default App