import React, {useState} from 'react'
import { useQuery } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import {LOAD_DATA} from "./queries"


const App = () => {
    const [page, setPage] = useState('authors')
    const result = useQuery(LOAD_DATA)

    if (result.loading){
        return <div>Loading data...</div>
    }

    console.log(result)

    return (
        <div>
            <div>
                <button onClick={() => setPage('authors')}>authors</button>
                <button onClick={() => setPage('books')}>books</button>
                <button onClick={() => setPage('add')}>add book</button>
            </div>

            <Authors authors={result.data.allAuthors}
                show={page === 'authors'}
            />

            <Books books={result.data.allBooks}
                show={page === 'books'}
            />

            <NewBook
                show={page === 'add'}
            />

        </div>
    )
}

export default App