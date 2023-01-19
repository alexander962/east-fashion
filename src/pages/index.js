import React, { useState } from 'react';
import Head from 'next/head';
import { Footer, Header, Section } from "@/components";

import { loadFavouritesPosts, loadPopularPosts, loadPosts } from './api/posts';
import MainPage from '@/components/MainPage';
import ModalMenu from '@/components/ModalMenu';

const LOAD_MORE_STEP = 4;
export default function Home({ initialPosts, total, favouritesPosts, popularPosts }) {
  const [posts, setPosts] = useState(initialPosts);
  const [totalPosts, setTotalPosts] = useState(total);
  const [modalVisible, setModalVisible] = useState(false);
  const [visiblePopularsPosts, setVisiblePopularsPosts] = useState(true);

  return (
    <Section>
      <Head>
        <title>Kirill Kazak</title>
        {/*<meta name="description" content="Generated by create next app" />*/}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ModalMenu setModalVisible={setModalVisible} modalVisible={modalVisible} />
      <Header setPosts={setPosts} setTotalPosts={setTotalPosts} setModalVisible={setModalVisible} setVisiblePopularsPosts={setVisiblePopularsPosts} />
      <MainPage posts={posts} setPosts={setPosts} total={totalPosts} favouritesPosts={favouritesPosts} popularPosts={popularPosts} visiblePopularsPosts={visiblePopularsPosts} />
      <Footer />
    </Section>
  );
}

export const getServerSideProps = async () => {
  const { posts, total } = await loadPosts(0, LOAD_MORE_STEP);
  const { favouritesPosts } = await loadFavouritesPosts();
  const { popularPosts } = await loadPopularPosts();

  return {
    props: {
      initialPosts: posts,
      total,
      favouritesPosts,
      popularPosts
    }
  }
}
