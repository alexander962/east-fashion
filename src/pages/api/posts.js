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
    "posts": *[_type == "post"] && !(_id match "drafts*") | order(publishedAt desc) [${start}...${end}] {_id, publishedAt, title, slug, description, mainImage, additionalImage, "categories": categories[]->{title}, "tags": tags[]->{title}, comments, sliderImages},
    "total": count(*[_type == "post"] && !(_id match "drafts*"))
  }`;
  const { posts, total } = await client.fetch(query);

  return {
    posts,
    total
  };
}

export async function loadFavouritesPosts() {
  const query = `{
    "favouritesPosts": *[_type == "favouritesPosts"] && !(_id match "drafts*") | order(publishedAt desc) [0...6] {_id, publishedAt, title, slug, description, mainImage, "categories": categories[]->{title}, "tags": tags[]->{title}, comments}
  }`;
  const { favouritesPosts } = await client.fetch(query);

  return {
    favouritesPosts,
  };
}

export async function loadPopularPosts() {
  const query = `{
    "popularPosts": *[_type == "post" && popular == true && !(_id match "drafts*")] | order(publishedAt desc) [0...6] {_id, popular, publishedAt, title, slug, description, mainImage, "categories": categories[]->{title}, "tags": tags[]->{title}, comments}
  }`;
  const { popularPosts } = await client.fetch(query);

  return {
    popularPosts,
  };
}

export async function loadCulturePosts(start, end, categories) {
  const query = `{
    "posts": *[_type == "post" && !(_id match "drafts*") && "${categories}" in categories[]->title] | order(publishedAt desc) [${start}...${end}] {_id, publishedAt, title, slug, description, mainImage, "categories": categories[]->{title}, "tags": tags[]->{title}, comments},
    "total": count(*[_type == "post" && "${categories}" in categories[]->title] && !(_id match "drafts*"))
  }`;
  const { posts, total } = await client.fetch(query);

  return {
    posts,
    total
  };
}

export async function loadTagPosts(tag) {
  const query = `{
    "posts": *[_type == "post" && !(_id match "drafts*") && "${tag}" in tags[]->title] | order(publishedAt desc) {_id, publishedAt, title, slug, description, mainImage, "categories": categories[]->{title}, "tags": tags[]->{title}, comments}
  }`;
  const { posts } = await client.fetch(query);

  return {
    posts,
  };
}

export async function loadAboutPage() {
  const query = `{
    "aboutInfo": *[_type == "about"] | order(publishedDate desc) [0] {_id, title, subtitle, description, image }
  }`;
  const { aboutInfo } = await client.fetch(query);

  return {
    aboutInfo,
  };
}
