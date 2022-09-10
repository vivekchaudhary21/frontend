import { PrismaClient } from '@prisma/client';

const resolvers = {
  Query: {
    users: (_: any, __: any, { prisma }: { prisma: PrismaClient }) => {
      return [
        {
          id: 1,
          email: 'a@b.com',
          firstName: 'vivek',
        },
      ];
    },
  },
};

export { resolvers };
