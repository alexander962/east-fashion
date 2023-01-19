import React, { useState } from 'react';
import Head from 'next/head';

import { loadCulturePosts } from './api/posts';
import Category from '@/components/Category';
import { Footer, Header, Section } from '@/components';
import ModalMenu from '@/components/ModalMenu';

const LOAD_MORE_STEP = 4;
export default function Interviews({ initialPosts, total }) {
  const [posts, setPosts] = useState(initialPosts);
  const [totalPosts, setTotalPosts] = useState(total);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <Section>
      <Head>
        <title>Culture</title>
        {/*<meta name="description" content="Generated by create next app" />*/}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ModalMenu setModalVisible={setModalVisible} modalVisible={modalVisible} />
      <Header setPosts={setPosts} setTotalPosts={setTotalPosts} setModalVisible={setModalVisible} />
      <Category posts={posts} setPosts={setPosts} total={totalPosts} category='culture' />
      <Footer />
    </Section>
  );
}

export const getServerSideProps = async () => {
  const categories = "culture";
  const { posts, total } = await loadCulturePosts(0, LOAD_MORE_STEP, categories);

  return {
    props: {
      initialPosts: posts,
      total,
    }
  }
}
