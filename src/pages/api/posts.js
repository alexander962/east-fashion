// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { client } from '~/lib/client'
export default async function posts(req, res) {
  const {start, end} = req.query;

  if(isNaN(Number(start)) || isNaN(Number(end))) {
    return res.status(400).json({
      error: 'Data invalid'
    })
  }

  const {posts, total} = await loadPosts(start, end);

  res.status(200).json({
    posts,
    total
  })
}

export async function loadPosts(start, end) {
  const query = `{
    "posts": *[_type == "post"] | order(publishedDate desc) [${start}...${end}] {_id, publishedAt, title, slug, description, mainImage, "categories": categories[]->{title}},
    "total": count(*[_type == "post"])
  }`;
  const { posts, total } = await client.fetch(query);

  return {
    posts,
    total
  };
}

export async function loadCulturePosts(start, end, categories) {
  const query = `{
    "posts": *[_type == "post" && "${categories}" in categories[]->title] | order(publishedDate desc) [${start}...${end}] {_id, publishedAt, title, slug, description, mainImage, "categories": categories[]->{title}},
    "total": count(*[_type == "post" && "${categories}" in categories[]->title])
  }`;
  const { posts, total } = await client.fetch(query);

  return {
    posts,
    total
  };
}
