const { ApolloServer, gql, UserInputError } = require('apollo-server')

const {v1: uuid} = require('uuid')

let authors = [
    {
        name: 'Robert Martin',
        id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
        born: 1952,
    },
    {
        name: 'Martin Fowler',
        id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
        born: 1963
    },
    {
        name: 'Fyodor Dostoevsky',
        id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
        born: 1821
    },
    {
        name: 'Joshua Kerievsky', // birthyear not known
        id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
    },
    {
        name: 'Sandi Metz', // birthyear not known
        id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
    },
]

/*
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
*/

let books = [
    {
        title: 'Clean Code',
        published: 2008,
        author: 'Robert Martin',
        id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring']
    },
    {
        title: 'Agile software development',
        published: 2002,
        author: 'Robert Martin',
        id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
        genres: ['agile', 'patterns', 'design']
    },
    {
        title: 'Refactoring, edition 2',
        published: 2018,
        author: 'Martin Fowler',
        id: "afa5de00-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring']
    },
    {
        title: 'Refactoring to patterns',
        published: 2008,
        author: 'Joshua Kerievsky',
        id: "afa5de01-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring', 'patterns']
    },
    {
        title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
        published: 2012,
        author: 'Sandi Metz',
        id: "afa5de02-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring', 'design']
    },
    {
        title: 'Crime and punishment',
        published: 1866,
        author: 'Fyodor Dostoevsky',
        id: "afa5de03-344d-11e9-a414-719c6709cf3e",
        genres: ['classic', 'crime']
    },
    {
        title: 'The Demon ',
        published: 1872,
        author: 'Fyodor Dostoevsky',
        id: "afa5de04-344d-11e9-a414-719c6709cf3e",
        genres: ['classic', 'revolution']
    },
]

const typeDefs = gql`
    type Author{
        name: String!
        bookCount: Int
        id: ID!
        born: Int
    }
    
    type Book{
        title: String!
        published: Int!
        author: String!
        id: ID!
        genres: [String!]!
    }
    
    type Query {
        allBooks(author: String, genre: String): [Book!]!
        bookCount: Int!
        authorCount: Int!
        allAuthors(name: String): [Author!]!
    }

    type Mutation {
        addBook(
            title: String!
            author: String!
            published: Int!
            genres: [String!]!
        ): Book
        editAuthor(name: String!, setBornTo: Int!): Author
    }
`

const resolvers = {
    Query: {
        bookCount: () => books.length,
        authorCount: () => authors.length,
        allBooks: (root, {author, genre}) =>{
            if(genre)
                return books.filter(b => b.genres.includes(genre))
            else if(author)
                return books.filter(b => b.author === author)
            else if(author && genre){
                return books.filter(b => b.author === author).filter(b => b.genres.includes(genre))
            }
            else{
                return books
            }
        },
        allAuthors: () => authors
    },
    Author: {
            bookCount: (root) => {
                return books.filter(b => b.author === root.name).length
            }
    },
    Mutation: {
        addBook: (root, {title, author, published, genres}) => {
            const book = {title, author, published, genres}
            if(books.find(b => b.title === title)){
                throw new UserInputError('The book is already added', {
                    invalidArgs: title
                })
            }
            books = books.concat(book)
            return book
        },
        editAuthor: (root, args) =>{
            return authors.map(a =>
                a.name === args.name
                    ? {...a, born: args.setBornTo}
                    : a
            ).find(a =>
                a.name === args.name)
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})