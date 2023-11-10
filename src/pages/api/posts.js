// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { client } from '~/lib/client';
export default async function posts(req, res) {
  const { start, end } = req.query;

  if (isNaN(Number(start)) || isNaN(Number(end))) {
    return res.status(400).json({
      error: 'Data invalid',
    });
  }

  const { posts, total } = await loadPosts(start, end);

  res.status(200).json({
    posts,
    total,
  });
}

export async function loadAllPosts(start, end) {
  const query = `{
    "posts": *[_type == "post" && !(_id match "drafts*")] | order(publishedAt desc) [${start}...${end}] {_id, title, slug, description, displayTypes, mainImage, additionalImage, thirdImage, categories, "tags": tags->{title}, "author": author->{name, image}},
    "total": count(*[_type == "post" && !(_id match "drafts*")]),
    "favouritesPosts": *[_type == "post" && favourite == true && !(_id match "drafts*")] | order(publishedAt desc) [0...6] {_id, popular, slug, title, description, mainImage, "tags": tags->{title}},
    "sideBarPosts": *[_type == "post" && sidebar == true && !(_id match "drafts*")] | order(publishedAt desc) [0...6] {_id, title, slug, description, displayTypes, mainImage, categories, "tags": tags->{title}},
    "popularPosts": *[_type == "post" && popular == true && !(_id match "drafts*")] | order(publishedAt desc) [0...6] {_id, popular, title, slug, description, displayTypes, mainImage, categories, "tags": tags->{title}},
    "popularPostsCount": *[_type == "post" && popular == false && !(_id match "drafts*")] | order(popularity desc) [0...6] {_id, popular, title, slug, description, displayTypes, mainImage, categories, "tags": tags->{title}}
  }`;
  const { posts, total, favouritesPosts, sideBarPosts, popularPosts, popularPostsCount } = await client.fetch(query);

  let count = 0;
  for (let i = popularPosts.length; i < 6; i++) {
    popularPosts.push(popularPostsCount[count]);
    count++;
  }

  return {
    posts,
    total,
    favouritesPosts,
    sideBarPosts,
    popularPosts,
  };
}

export async function loadPosts(start, end) {
  const query = `{
    "posts": *[_type == "post" && !(_id match "drafts*")] | order(publishedAt desc) [${start}...${end}] {_id, publishedAt, title, slug, description, displayTypes, mainImage, additionalImage, thirdImage, categories, "tags": tags->{title}, "author": author->{name, image}},
    "total": count(*[_type == "post" && !(_id match "drafts*")])
  }`;
  const { posts, total } = await client.fetch(query);

  return {
    posts,
    total,
  };
}

export async function loadFavouritesPosts() {
  const query = `{
    "favouritesPosts": *[_type == "post" && favourite == true && !(_id match "drafts*")] | order(publishedAt desc) [0...6] {_id, popular, publishedAt, title, body, slug, description, displayTypes, mainImage, categories, "tags": tags->{title}}
  }`;
  const { favouritesPosts } = await client.fetch(query);

  return {
    favouritesPosts,
  };
}

export async function loadPopularPosts() {
  const query = `{
    "popularPosts": *[_type == "post" && popular == true && !(_id match "drafts*")] | order(publishedAt desc) [0...6] {_id, popular, publishedAt, title, slug, description, displayTypes, mainImage, categories, "tags": tags->{title}}
  }`;
  const queryCount = `{
    "popularPostsCount": *[_type == "post" && popular == false && !(_id match "drafts*")] | order(popularity desc) [0...6] {_id, popular, publishedAt, title, slug, description, displayTypes, mainImage, categories, "tags": tags->{title}}
  }`;
  const { popularPosts } = await client.fetch(query);
  const { popularPostsCount } = await client.fetch(queryCount);
  let count = 0;
  for (let i = popularPosts.length; i < 6; i++) {
    popularPosts.push(popularPostsCount[count]);
    count++;
  }
  return {
    popularPosts,
  };
}

export async function loadCulturePosts(start, end, categories) {
  const query = `{
    "posts": *[_type == "post" && !(_id match "drafts*") && (categories match "${categories}")] | order(publishedAt desc) [${start}...${end}] {_id, publishedAt, title, slug, description, displayTypes, mainImage, additionalImage, thirdImage, categories, "tags": tags->{title}, comments, "author": author->{name, image}},
    "total": count(*[_type == "post" && !(_id match "drafts*") && (categories match "${categories}")])
  }`;
  const { posts, total } = await client.fetch(query);

  return {
    posts,
    total,
  };
}

export async function loadTagPosts(tag) {
  const query = `{
    "posts": *[_type == "post" && !(_id match "drafts*") && ("${tag}" match tags->title)] | order(publishedAt desc) {_id, publishedAt, title, slug, description, displayTypes, mainImage, additionalImage, thirdImage, categories, "tags": tags->{title}, comments, "author": author->{name, image}}
  }`;
  const { posts } = await client.fetch(query);

  return {
    posts,
  };
}

export async function loadSideBarPosts() {
  const query = `{
    "sideBarPosts": *[_type == "post" && sidebar == true && !(_id match "drafts*")] | order(publishedAt desc) [0...6] {_id, publishedAt, title, slug, description, displayTypes, mainImage, categories, "tags": tags->{title}}
  }`;
  const { sideBarPosts } = await client.fetch(query);

  return {
    sideBarPosts,
  };
}

export async function loadAboutPage() {
  const query = `{
    "aboutInfo": *[_type == "about"] | order(publishedDate desc) [0] {_id, title, description, image }
  }`;
  const { aboutInfo } = await client.fetch(query);

  return {
    aboutInfo,
  };
}
