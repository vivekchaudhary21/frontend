import { ApolloServer, gql } from 'apollo-server';
import { makeExecutableSchema } from '@graphql-tools/schema';

import { typeDefs, resolvers } from './graphql';
import { prisma } from './lib/prisma';

const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer({
  schema,
  context: () => ({
    prisma,
  }),
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
