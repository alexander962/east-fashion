import React, { useState } from 'react';

import { client } from '~/lib/client';
import { Footer, Header, Section } from '@/components';
import Head from 'next/head';
import CardPostInfo from '@/components/CardPostInfo';
import ModalMenu from '@/components/ModalMenu';
import { loadPopularPosts } from '@/pages/api/posts';
import logo from '@/assets/images/logo.jpeg';
const FavouritesPostInfo = ({ post, popularPosts }) => {
  const [posts, setPosts] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [visiblePopularsPosts, setVisiblePopularsPosts] = useState(true);
  const [visibleSearchResult, setVisibleSearchResult] = useState(false);

  return (
    <Section>
      <Head>
        <title>My blog</title>

        <meta property="og:image" content={logo.src} />
        <meta name="twitter:image" content={logo.src} />
      </Head>
      <ModalMenu setModalVisible={setModalVisible} modalVisible={modalVisible} />
      <Header
        setPosts={setPosts}
        setTotalPosts={setTotalPosts}
        setModalVisible={setModalVisible}
        setVisiblePopularsPosts={setVisiblePopularsPosts}
        setVisibleSearchResult={setVisibleSearchResult}
        searchVisible={false}
      />
      <CardPostInfo post={post} popularPosts={popularPosts} />
      <Footer subscribe={false} />
    </Section>
  );
};

export default FavouritesPostInfo;

export async function getStaticPaths() {
  const query = `*[type == "post"] {
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
  const query = `*[_type == "post" && slug.current == '${slug}'][0]`;

  const post = await client.fetch(query);
  const { popularPosts } = await loadPopularPosts();

  return {
    props: {
      post,
      popularPosts,
    },
  };
}
