import React, {useState, useEffect} from 'react'
import {useLazyQuery, useQuery} from "@apollo/client"
import {ALL_BOOKS, FILTER_GENRES} from "../queries"

const GenreFilter = ({ genres, setFilter}) => {
    return (
        <div>
            {genres.map((genre) => {
                return (
                    <button key={genre} onClick={() => setFilter(genre)}>
                        {genre}
                    </button>
                )
            })}
            <button onClick={() => setFilter("all")}>All</button>
        </div>
    )
}

const Books = ({show}) => {
    const books = useQuery(ALL_BOOKS).data.allBooks
    const [filter, setFilter] = useState('all')

    const getGenres = () => {
        let genres = []

        books.map((book) => {
            const genre = book.genres.map((g) => g)
            return (genres = [...genres, ...genre])
        })

        return [...new Set(genres)]
    }

    if (!show) {
        return null
    }

    if(books.loading){
        return <div>Loading books...</div>
    }

    let filteredBooks = books

    if(filter !== 'all'){
        filteredBooks = books.filter((book) => book.genres.includes(filter))
    }

    return (
        <div>
            <h2>books</h2>

            <table>
                <tbody>
                <tr>
                    <th>
                        Title
                    </th>
                    <th>
                        Author
                    </th>
                    <th>
                        Published
                    </th>
                </tr>
                {filteredBooks.map(b =>
                    <tr key={b.title}>
                        <td>{b.title}</td>
                        <td>{b.author.name}</td>
                        <td>{b.published}</td>
                    </tr>
                )}
                </tbody>
            </table>
            <GenreFilter genres={getGenres()} setFilter={setFilter}/>
        </div>
    )
}

export default Books