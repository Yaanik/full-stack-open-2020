const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const SECRET = 'KAPPA123'

const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

mongoose.set('useFindAndModify', false)

const MONGODB_URI = 'mongodb+srv://root:root@backend-project-frz1s.gcp.mongodb.net/library-app?retryWrites=true&w=majority'

console.log('Connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, {useNewUrlParser: true})
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch((error) => {
        console.log('Error connecting to MongoDB:', error.message)
    })

const typeDefs = gql`
    type User {
        username: String!
        favoriteGenre: String!
        id: ID!
    }

    type Token {
        value: String!
    }

    type Author{
        name: String!
        bookCount: Int
        id: ID!
        born: Int
    }

    type Book {
        title: String!
        published: Int!
        author: Author!
        genres: [String!]!
        id: ID!
    }

    type Query {
        allBooks(author: String, genre: String): [Book!]!
        bookCount: Int!
        authorCount: Int!
        allAuthors(name: String): [Author!]!
        me: User
    }

    type Mutation {
        addBook(
            title: String!
            author: String!
            published: Int!
            genres: [String!]!
        ): Book
        editAuthor(name: String!, born: Int!): Author
        createUser(
            username: String!
            favoriteGenre: String!
        ): User
        
        login(
            username: String!
            password: String!
        ): Token
    }
`

const createOrFindAuthor = async (name) => {
    const author = await Author.findOne({name})
    if(!author) {
        return await new Author({name}).save()
    }
    return author
}

const resolvers = {
    Query: {
        bookCount: () => Book.collection.countDocuments(),
        authorCount: () => Author.collection.countDocuments(),
        allBooks: async (root, {author, genre}) =>{
            const q = {}
            if(author){
                const bAuthor = await Author.findOne({name: author});
                q.author = bAuthor.id
            }
            if(genre){
                q.genres= {$in: [genre]}
            }
            return Book.find(q).populate("author")
        },
        allAuthors: async () => {
            return Author.find({}).populate("author")
        },
        me: (root, args, {currentUser}) => currentUser
    },


    Author: {
        bookCount: async (root) => {
            console.log()
            const books = await Book.find({author: root.id})
            return books.length
        }
    },


    Mutation: {
        addBook: async (root, {title, author, published, genres}, {currentUser}) => {
            if(!currentUser) {
                throw new AuthenticationError('NotAuthorized')
            }
            const book = new Book({title, published, genres})
            try{
                book.author = await createOrFindAuthor(author)
                return await book
                    .save()
                    .then((book) => book.populate("author").execPopulate())
            } catch (error) {
                throw new UserInputError(error.message, {error})
            }
        },

        editAuthor: async (root, args, {currentUser}) =>{
            if (!currentUser) {
                throw new AuthenticationError("Not Authorized");
            }
            const author = await Author.findOne({name: args.name})
            author.born = args.born
            try{
                return author.save()
            }catch(error){
                throw new UserInputError(error.message, {error})
            }
        },

        createUser: async (root, args) => {
            try{
                return await new User(args).save()
            } catch (error) {
                throw new UserInputError(error.message, { error });
            }
        },


        login: async (root, args) => {
            const user = await User.findOne({username: args.username})

            if(!user || args.password !== 'password'){
                throw new UserInputError('Invalid login credentials')
            }
            return{
                value: jwt.sign({username: user.username, id: user._id}, SECRET)
            }
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        // const currentUser = 'admin'
        // return { currentUser }
        const auth = req ? req.headers.authorization : null
        if (auth && auth.toLowerCase().startsWith('bearer ')) {
            const decodedToken = jwt.verify(
                auth.substring(7), SECRET
            )
            const currentUser = await User.findById(decodedToken.id)
            return { currentUser }
        }
    }
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})