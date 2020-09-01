import React, {useState} from 'react'
import {useQuery} from "@apollo/client"
import { ALL_BOOKS, ME } from "../queries"

const Recommended = ({show, favorite}) => {

    const allBooks = useQuery(ALL_BOOKS)

    if(!show || !favorite){
        return null
    }

    if(allBooks.loading){
        return <div>Loading books...</div>
    }

    const books = allBooks.data.allBooks
    const recommended = books.filter((book) => {
        return book.genres.includes(favorite)
    })

    return(
        <div>
            <h1>Recommendation list</h1>
            <h2>Books in your favourite genre: {favorite}</h2>
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
                {recommended.map(b =>
                    <tr key={b.title}>
                        <td>{b.title}</td>
                        <td>{b.author.name}</td>
                        <td>{b.published}</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    )
}

export default Recommended