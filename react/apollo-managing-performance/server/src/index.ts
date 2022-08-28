import { ApolloServer } from 'apollo-server';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { upperDirectiveTransformer } from './graphql/directives';
import { typeDefs, resolvers } from './graphql';

// Create the base executable schema
let schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// Transform the schema by applying directive logic
schema = upperDirectiveTransformer(schema, 'upper');

// Provide the schema to the ApolloServer constructor
const server = new ApolloServer({ schema });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
