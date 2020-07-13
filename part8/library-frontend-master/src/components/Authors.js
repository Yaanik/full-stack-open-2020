import React, {useState, useEffect} from 'react'
import {useLazyQuery, useMutation} from '@apollo/client'
import {EDIT_BORN, FIND_AUTHOR} from "../queries"


const BornForm = ({authors}) => {
    const [name, setName] = useState('')
    const [born, setBorn] = useState(Number(''))

    const [changeBorn, result] = useMutation(EDIT_BORN)

    useEffect(() => {
        if(result.data && !result.data.editAuthor) {
            alert('Name not found')
        }
    }, [result.data])

    const submit = async (event) => {
        event.preventDefault()
        await changeBorn({variables: {name, born}})
        setName('')
        setBorn(Number(''))
    }


    return(
        <div>
            <h2>Edit author born</h2>
            <form onSubmit={submit}>
                <select onChange={({target}) => setName(target.value)}>
                    {authors.map(a=> <option value={a.name} >{a.name}</option>)}
                </select>
                {/*<div>*/}
                {/*    Name:*/}
                {/*    <input value={name} onChange={({target}) => setName(target.value)}/>*/}
                {/*</div>*/}
                <div>
                    Born:
                    <input value={born} onChange={({target}) => setBorn(Number(target.value))}/>
                </div>
                <button type='submit'>Change born</button>
            </form>
        </div>
    )
}


const Authors = ({authors, show}) => {
    const [author, setAuthor] = useState(null)
    if (!show) {
        return null
    }

    return (
        <div>
            <h2>authors</h2>
            <table>
                <tbody>
                <tr>
                    <th></th>
                    <th>
                        born
                    </th>
                    <th>
                        books
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
