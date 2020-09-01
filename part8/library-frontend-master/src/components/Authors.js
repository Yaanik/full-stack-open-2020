import React, {useState, useEffect} from 'react'
import {useLazyQuery, useMutation, useQuery} from '@apollo/client'
import {ALL_AUTHORS, ALL_BOOKS, EDIT_BORN, FIND_AUTHOR} from "../queries"


const BornForm = () => {
    const [name, setName] = useState('')
    const [born, setBorn] = useState(Number(''))

    const authors = useQuery(ALL_AUTHORS).data.allAuthors

    const [changeBorn, result] = useMutation(EDIT_BORN)

    useEffect(() => {
        if(result.data && !result.data.editAuthor) {
            alert('Name not found')
        }
    }, [result.data])

    const submit = async (event) => {
        event.preventDefault()
        await changeBorn({variables: {name, born}})
        setBorn(Number(''))
    }

    return(
        <div>
            <h2>Edit author birth year</h2>
            <form onSubmit={submit}>
                <select onChange={({target}) => setName(target.value)}>
                    {authors.map(a=> <option value={a.name} >{a.name}</option>)}
                </select>
                <div>
                    Born:
                    <input value={born} onChange={({target}) => setBorn(Number(target.value))}/>
                </div>
                <button type='submit'>Change born</button>
            </form>
        </div>
    )
}


const Authors = ({show}) => {
    const [author, setAuthor] = useState(null)

    const authors = useQuery(ALL_AUTHORS).data.allAuthors

    if (!show) {
        return null
    }

    console.log(show, 'show')
    return (
        <div>
            <h2>Authors</h2>
            <table>
                <tbody>
                <tr>
                    <th>
                        Name
                    </th>
                    <th>
                        Born
                    </th>
                    <th>
                        Books
                    </th>
                </tr>
                {authors.map(a =>
                    <tr key={a.name}>
                        <td>{a.name}</td>
                        <td>{a.born}</td>
                        <td>{a.bookCount}</td>
                    </tr>
                )}
                </tbody>
            </table>
        <BornForm authors={authors}/>
        </div>
    )
}

export default Authors
