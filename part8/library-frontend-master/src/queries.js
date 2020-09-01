import {gql} from '@apollo/client'


export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            name
            born
            id
            bookCount
        }
    }
`

export const ALL_BOOKS = gql`
    query {
        allBooks{
            id
            title
            author{
                name
            }
            genres
            published
        }
    }
`

export const LOAD_DATA = gql`
    query {
        allBooks{
            id
            title
            author{
                name
            }
            genres
            published
        }
        allAuthors {
            name
            bookCount
            born
            id
        }
    }
`

export const FIND_AUTHOR = gql`
    query findAuthorByName($nameToSearch: String!){
        findAuthor(name: $nameToSearch){
            name
            born
            id
            bookCount
            }
        }
`

export const CREATE_BOOK = gql`
    mutation createBook(
        $title: String!, 
        $author: String!, 
        $published: Int!,
        $genres: [String!]!
    ){
        addBook(
            title: $title,
            author: $author,
            published: $published
            genres: $genres
        ){
            id
            title
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

export const CREATE_USER = gql`
    mutation createUser(
        $username: String!, 
        $favoriteGenre: String!
    ){
        createUser(
            username: $username
            favoriteGenre: $favoriteGenre
        ){
            username
            favoriteGenre
            id
        }        
    }
`

export const LOGIN = gql`
    mutation login(
        $username: String!
        $password: String!
    ){
        login(
            username: $username
            password: $password
        ){
            value
        }
    }
`

export const ME = gql`
    query {
        me {
            favoriteGenre
        }
    }
`

export const FILTER_GENRES = gql`
    query allBooks($genre: String!){
        allBooks(genre: $genre){
            id
            title
            author{
                name
            }
            genres
            published
        }
    }
`
// export const CREATE_AUTHOR = gql`
//     mutation createAuthor($name:  String!, born)
// `