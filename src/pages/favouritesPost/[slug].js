import React, { useState } from 'react';

import { client } from '~/lib/client';
import { Footer, Header, Section } from '@/components';
import Head from 'next/head';
import CardPostInfo from '@/components/CardPostInfo';
const FavouritesPostInfo = ({ post }) => {
  const [posts, setPosts] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [visiblePopularsPosts, setVisiblePopularsPosts] = useState(true);
  const [visibleSearchResult, setVisibleSearchResult] = useState(false);

  return (
    <Section>
      <Head>
        <title>My blog</title>
      </Head>
      <Header
        setPosts={setPosts}
        setTotalPosts={setTotalPosts}
        setModalVisible={setModalVisible}
        setVisiblePopularsPosts={setVisiblePopularsPosts}
        setVisibleSearchResult={setVisibleSearchResult}
      />
      <CardPostInfo post={post} />
      <Footer />
    </Section>
  );
};

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
      slug: post.slug.current,
    },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params: { slug } }) {
  const query = `*[_type == "favouritesPosts" && slug.current == '${slug}'][0]`;

  const post = await client.fetch(query);

  return {
    props: {
      post,
    },
  };
}
