import { NextApiRequest, NextApiResponse } from 'next';
import client from '@/app/libs/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' }); // 405 for Method Not Allowed
  }

  const { query } = req.query;

  if (typeof query !== 'string') {
    return res.status(400).json({ error: 'Invalid query parameter' });
  }

  try {
    const users = await client.user.findMany({
      where: {
        name: {
          contains: query,
          mode: 'insensitive', // case-insensitive search
        },
      },
    });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
}
