import { ApolloServer } from 'apollo-server-micro';
import { schema } from '../modules/graphql/schema';
import { prisma } from './prisma';

export const apolloServer = new ApolloServer({
  schema,
  context: (req) => ({ req, prisma }),
});
