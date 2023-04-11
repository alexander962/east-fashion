import React, { useState } from 'react';
import Head from 'next/head';

import { loadCulturePosts, loadSideBarPosts } from './api/posts';
import Category from '@/components/Category';
import { Footer, Header, Section } from '@/components';
import ModalMenu from '@/components/ModalMenu';
import logo from '@/assets/images/logo.jpeg';

const LOAD_MORE_STEP = 4;
export default function SoinsDeBeaute({ initialPosts, total, sideBarPosts }) {
  const [posts, setPosts] = useState(initialPosts);
  const [totalPosts, setTotalPosts] = useState(total);
  const [modalVisible, setModalVisible] = useState(false);
  const [visiblePopularsPosts, setVisiblePopularsPosts] = useState(true);
  const [visibleSearchResult, setVisibleSearchResult] = useState(false);

  return (
    <Section>
      <Head>
        <title>Soins de Beauté</title>
        {/*<meta name="description" content="Generated by create next app" />*/}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

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
        category="skin-care"
      />
      <Category
        posts={posts}
        setPosts={setPosts}
        total={totalPosts}
        category="skin-care"
        visibleSearchResult={visibleSearchResult}
        sideBarPosts={sideBarPosts}
      />
      <Footer subscribe={false} />
    </Section>
  );
}

export const getServerSideProps = async () => {
  const categories = 'skin-care';
  const { posts, total } = await loadCulturePosts(0, LOAD_MORE_STEP, categories);
  const { sideBarPosts } = await loadSideBarPosts();

  return {
    props: {
      initialPosts: posts,
      total,
      sideBarPosts,
    },
  };
};