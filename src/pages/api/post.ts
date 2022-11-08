import { Deta } from 'deta';
import dayjs, { Dayjs } from 'dayjs';
import type { NextApiRequest, NextApiResponse } from 'next';

const deta = Deta(process.env.DETA_PJ_KEY);
const post_db = deta.Base('post');

export type Post = {
  key: string;
  title: string;
  subTitle: string;
  body: string;
  publishedAt: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Post[] | string>
) {
  if (req.method === 'POST') {
    await post_db.insert(
      {
        title: 'タイトル',
        subTitle: 'サブタイトル',
        body: '内容',
        publishedAt: dayjs().add(9, 'h').toISOString(),
      } as Post,
      'INIT__KEY'
    );
    return res.status(201).send('Created');
  }
  if (req.method === 'GET') {
    const posts = (
      await post_db.fetch({
        'publishedAt?lte': dayjs().add(9, 'h').toISOString(),
        'publishedAt?contains': 'T',
      })
    ).items as unknown as Post[];
    return res
      .status(200)
      .json(posts.sort((a, b) => Number(a.publishedAt < b.publishedAt)));
  }
}

