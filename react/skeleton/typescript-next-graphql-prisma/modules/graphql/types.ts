import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  type Query {
    users: [User]!
  }

  type User {
    id: ID!
    email: String!
    firstName: String
  }
`;
