import React, {useEffect, useState} from 'react'
import {useMutation} from "@apollo/client"
import {ALL_AUTHORS, CREATE_BOOK, ALL_BOOKS, EDIT_BORN} from "../queries"

const NewBook = ({show}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState(Number(''))
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [ addBook ] = useMutation(CREATE_BOOK, {
    refetchQueries: [  {query: ALL_BOOKS}, {query: ALL_AUTHORS} ],
    onError: (error) => {
      console.log(error.graphQLErrors[0].message, 'Error creating a book')
    }
  })

  if (!show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    await addBook({variables: {title, author, published, genres}})

    setTitle('')
    setPublished(Number(''))
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(Number(target.value))}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook