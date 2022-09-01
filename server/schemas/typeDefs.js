const {gql} = require('apollo-server-express');

const typeDefs = gql`
type Book {
    bookId: String
    authors: [String]
    description: String
    image: String
    link: String
    title: String
}
type User {
    _id: ID!
    username: String
    email: String 
    bookCount: Int
    savedBooks: [Book]
}
input book {
    description: String
    authors: [String]
    title: String
    bookId: String
    image: String
    link: String
}
type Auth {
    token: ID!
    user: User
}
type Query {
    me: User
}
type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(input: book!): User
    removeBook(bookId: ID!): User
}
`;

module.exports = typeDefs;