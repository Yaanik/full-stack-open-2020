import {gql} from '@apollo/client'

export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            name
            born
            id
        }
    }
`

export const ALL_BOOKS = gql`
    query {
        allBooks{
            title
            author
            published
        }
    }
`

export const LOAD_DATA = gql`
    query {
        allBooks{
            title
            author
            published
        },
        allAuthors {
            name
            born
            id
        }
    }
`

export const FIND_AUTHOR = gql`
    query findAuthorByNmae($nameToSearch: String!){
        findAuthor(name: $nameToSearch){
            name
            born
            id
            bookCount
            }
        }
`

export const CREATE_BOOK = gql`
    mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!){
        addBook(
            title: $title,
            author: $author,
            published: $published
            genres: $genres
        ){
            title
            author
            published
            genres
        }
    }
`

export const EDIT_BORN = gql`
    mutation editBorn($name: String!, $born: Int!){
        editAuthor(
            name: $name,
            born: $born
        ){
            name
            born
            id
            bookCount
        }
    }
`
// export const CREATE_AUTHOR = gql`
//     mutation createAuthor($name: String!, born)
// `