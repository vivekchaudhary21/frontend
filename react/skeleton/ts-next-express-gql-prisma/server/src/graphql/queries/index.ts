import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Query {
    users: [User]
  }

  type User {
    id: ID!
    email: String!
    firstName: String
  }
`;

export { typeDefs };
