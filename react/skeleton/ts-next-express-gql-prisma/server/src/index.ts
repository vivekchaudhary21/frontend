import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { makeExecutableSchema } from '@graphql-tools/schema';

import { typeDefs, resolvers } from './graphql';
import { prisma } from './lib/prisma';

async function startApolloSever() {
  const app = express();
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const apolloServer = new ApolloServer({
    schema,
    context: () => ({
      prisma,
    }),
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  app.listen({ port: 5000 }, () => {
    console.log(`🚀  Server ready at ${5000}`);
  });
}

startApolloSever();
