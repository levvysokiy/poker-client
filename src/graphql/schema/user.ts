import { gql } from 'apollo-server';

export default gql`
  type User {
    id: ID!
    userName: String!
    password: String!
    chipCount: Int!
    token: String
  }

  input UserInput {
    userName: String!
    password: String!
  }

  type Query {
    userById(id: String!): User
  }

  type Mutation {
    createUser(userInput: UserInput): User
  }
`;
