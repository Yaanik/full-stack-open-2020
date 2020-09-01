import React, {useState, useEffect} from 'react'
import { useQuery, useApolloClient,} from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommended from "./components/Recommended"

import {LOAD_DATA} from "./queries"


const App = () => {
    const [page, setPage] = useState('authors')
    const [token, setToken] = useState(null)
    const [favorite, setFavorite] = useState(null)
    const result = useQuery(LOAD_DATA)
    const client = useApolloClient()

    useEffect(() => {
        const userToken = localStorage.getItem("user");
        if (userToken) {
            setToken(userToken);
        }

        const favoriteGenre = localStorage.getItem('favoriteGenre')
        if(favoriteGenre){
            setFavorite(favoriteGenre)
        }
        console.log(favoriteGenre, 'favGen')
        console.log(favorite, 'favState')
    }, [])

    if (result.loading){
        return <div>Loading data...</div>
    }

    const logout = () => {
        setToken(null)
        localStorage.clear()
        client.resetStore()
        setPage('authors')
    }

    return (
        <div>
            <div>
                <button onClick={() => setPage('authors')}>Authors</button>
                <button onClick={() => setPage('books')}>Books</button>
            {
                token
                    ? (
                        <>
                            <button onClick={() => setPage('add')}>Add book</button>
                            <button onClick={() => setPage('recommended')}>Recommendations</button>
                            <button onClick={() => logout()}>Logout</button>
                        </>
                      )
                    : (
                        <button onClick={() => setPage('login')}>Login</button>

                    )
            }
            </div>
            <Authors
                authors={result.data.allAuthors}
                show={page === 'authors'}
            />

            <Books books={result.data.allBooks}
                show={page === 'books'}
            />

            <NewBook
                show={page === 'add'}
            />

            <Recommended
                favorite={favorite}
                show={page === 'recommended'}
            />
            <Login
                {...{setToken, setPage, setFavorite}}
                setToken={setToken}
                show={page === 'login'}
            />
        </div>
    )
}

export default App