import { PrismaClient } from '@prisma/client';

const resolvers = {
  Query: {
    users: (_: any, __: any, { prisma }: { prisma: PrismaClient }) => {
      return prisma.user.findMany();
    },
  },
};

export { resolvers };
