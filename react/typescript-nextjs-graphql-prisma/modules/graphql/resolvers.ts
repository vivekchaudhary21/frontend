import { PrismaClient } from '@prisma/client';

export const resolvers = {
  Query: {
    users: async (_: any, __: any, { prisma }: { prisma: PrismaClient }) => {
      return await prisma.user.findMany();
    },
  },
};
