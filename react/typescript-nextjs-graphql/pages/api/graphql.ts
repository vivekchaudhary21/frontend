// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { apolloServer } from '../../lib/apolloServer';
import { cors } from '../../modules/middleware/cors';

const serverStart = apolloServer.start();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await cors(req, res);

  await serverStart;
  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res);
  return;
}

export const config = {
  api: {
    bodyParser: false,
  },
};
