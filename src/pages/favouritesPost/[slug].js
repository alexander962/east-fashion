import React from 'react'

import { client } from '~/lib/client'
import { Footer, Header } from "@/components";
import {format} from "date-fns";
import Head from "next/head";
import CardPostInfo from '@/components/CardPostInfo';
const FavouritesPostInfo = ({ className, post }) => {
  const date = format(new Date(post.publishedAt), 'dd MMM yyyy')

  return (
    <>
      <Head>
        <title>My blog</title>
      </Head>
      <Header />
      <CardPostInfo post={post} />
      <Footer />
    </>
  )
}

export default FavouritesPostInfo;

export async function getStaticPaths() {
  const query = `*[type == "favouritesPosts"] {
    slug {
      current
    }
  }`;

  const posts = await client.fetch(query);
  const paths = posts.map(post => ({
    params: {
      slug: post.slug.current
    }
  }));

  return {
    paths,
    fallback: 'blocking'
  }
}

export async function getStaticProps({ params: {slug} }) {
  const query = `*[_type == "favouritesPosts" && slug.current == '${slug}'][0]`;

  const post = await client.fetch(query);

  return {
    props: {
      post
    }
  }
}
