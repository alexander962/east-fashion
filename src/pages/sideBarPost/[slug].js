import React, { useState } from 'react';

import { client } from '~/lib/client';
import { Footer, Header, Section } from '@/components';
import Head from 'next/head';
import CardPostInfo from '@/components/CardPostInfo';
import ModalMenu from '@/components/ModalMenu';
import { loadPopularPosts, loadSideBarPosts } from '@/pages/api/posts';
import logo from '@/assets/images/logo.jpeg';
const SideBarPost = ({ post, sideBarPosts }) => {
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
      <CardPostInfo post={post} sideBarPosts={sideBarPosts} />
      <Footer />
    </Section>
  );
};

export default SideBarPost;

export async function getStaticPaths() {
  const query = `*[type == "post"]{_id, publishedAt, body, title, slug, description, displayTypes, mainImage, additionalImage, thirdImage, meta_title, "categories": categories->{title}, comments, sliderImages, "author": author->{name, image}}`;

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
  const query = `*[_type == "post" && slug.current == '${slug}']{_id, publishedAt, body, title, slug, description, displayTypes, mainImage, additionalImage, thirdImage, meta_title, "categories": categories->{title}, comments, sliderImages, "author": author->{name, image}}[0]`;

  const post = await client.fetch(query);
  const { sideBarPosts } = await loadSideBarPosts();

  return {
    props: {
      post,
      sideBarPosts,
    },
  };
}
