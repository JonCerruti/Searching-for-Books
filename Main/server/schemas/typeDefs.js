const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Book {
      bookId: String
      authors: [String]
      title: String
      description: String
      image: String
      link: String
    }

    type User {
        _id: ID
        username: String!
        email: String!
        password: String
        bookCount: Int
        savedBooks: [Book]
  }

    type Auth {
        token: ID!
        user: User
  }

     input SavedBookInput {
      bookId: String
      authors: [String]
      title: String
      description: String
      image: String
      link: String
  }

    type Query {
        me: User
        users: [User]
        user(username: String!): User
        userById(_id: ID!): User
  }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(input: SavedBookInput): User
        removeBook(bookId: String!): User
  }
`;

module.exports = typeDefs;